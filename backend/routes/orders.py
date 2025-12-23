"""
Order routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from utils.deps import get_db, get_current_user
from schemas.order import OrderCreate, OrderResponse, OrderItemResponse
from db_models import Order, OrderItem, DBProduct, User

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=OrderResponse)
async def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new order."""
    if not order_data.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order must have at least one item"
        )
    
    # Validate products and calculate total
    total_amount = 0
    order_items_data = []
    
    for item in order_data.items:
        product = db.query(DBProduct).filter(DBProduct.id == int(item.productId)).first()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with ID {item.productId} not found"
            )
        if product.quantity < item.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient stock for {product.name}. Available: {product.quantity}"
            )
        
        order_items_data.append({
            "product": product,
            "quantity": item.quantity,
            "price": product.price
        })
        total_amount += product.price * item.quantity
    
    # Create order
    new_order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        status="pending",
        delivery_address=order_data.deliveryAddress,
        city=order_data.city,
        postal_code=order_data.postalCode
    )
    db.add(new_order)
    db.flush()
    
    # Create order items and update stock
    for item_data in order_items_data:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item_data["product"].id,
            quantity=item_data["quantity"],
            price_at_time=item_data["price"]
        )
        db.add(order_item)
        
        # Decrease stock
        item_data["product"].quantity -= item_data["quantity"]
    
    db.commit()
    db.refresh(new_order)
    
    # Build response
    items = []
    for item in new_order.items:
        product = db.query(DBProduct).filter(DBProduct.id == item.product_id).first()
        items.append(OrderItemResponse(
            id=str(item.id),
            productId=str(item.product_id),
            name=product.name if product else "Unknown",
            quantity=item.quantity,
            price=item.price_at_time
        ))
    
    return OrderResponse(
        id=str(new_order.id),
        orderNumber=new_order.order_number,
        userId=str(new_order.user_id),
        items=items,
        totalAmount=new_order.total_amount,
        status=new_order.status,
        deliveryAddress=new_order.delivery_address or "",
        city=new_order.city,
        postalCode=new_order.postal_code,
        createdAt=new_order.created_at.isoformat() if new_order.created_at else "",
        updatedAt=new_order.updated_at.isoformat() if new_order.updated_at else ""
    )


@router.get("/my-orders", response_model=List[OrderResponse])
async def get_user_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all orders for the current user."""
    orders = db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()
    
    result = []
    for order in orders:
        items = []
        for item in order.items:
            product = db.query(DBProduct).filter(DBProduct.id == item.product_id).first()
            items.append(OrderItemResponse(
                id=str(item.id),
                productId=str(item.product_id),
                name=product.name if product else "Unknown",
                quantity=item.quantity,
                price=item.price_at_time
            ))
        
        result.append(OrderResponse(
            id=str(order.id),
            orderNumber=order.order_number,
            userId=str(order.user_id),
            items=items,
            totalAmount=order.total_amount,
            status=order.status,
            deliveryAddress=order.delivery_address or "",
            city=order.city,
            postalCode=order.postal_code,
            createdAt=order.created_at.isoformat() if order.created_at else "",
            updatedAt=order.updated_at.isoformat() if order.updated_at else ""
        ))
    
    return result


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific order by ID."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Check ownership (unless admin)
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this order"
        )
    
    items = []
    for item in order.items:
        product = db.query(DBProduct).filter(DBProduct.id == item.product_id).first()
        items.append(OrderItemResponse(
            id=str(item.id),
            productId=str(item.product_id),
            name=product.name if product else "Unknown",
            quantity=item.quantity,
            price=item.price_at_time
        ))
    
    return OrderResponse(
        id=str(order.id),
        orderNumber=order.order_number,
        userId=str(order.user_id),
        items=items,
        totalAmount=order.total_amount,
        status=order.status,
        deliveryAddress=order.delivery_address or "",
        city=order.city,
        postalCode=order.postal_code,
        createdAt=order.created_at.isoformat() if order.created_at else "",
        updatedAt=order.updated_at.isoformat() if order.updated_at else ""
    )


@router.put("/{order_id}/cancel", response_model=OrderResponse)
async def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cancel an order and restore stock."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Check ownership (unless admin)
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to cancel this order"
        )
    
    if order.status not in ["pending", "processing"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot cancel order with status '{order.status}'"
        )
    
    # Restore stock
    for item in order.items:
        product = db.query(DBProduct).filter(DBProduct.id == item.product_id).first()
        if product:
            product.quantity += item.quantity
    
    order.status = "cancelled"
    order.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(order)
    
    items = []
    for item in order.items:
        product = db.query(DBProduct).filter(DBProduct.id == item.product_id).first()
        items.append(OrderItemResponse(
            id=str(item.id),
            productId=str(item.product_id),
            name=product.name if product else "Unknown",
            quantity=item.quantity,
            price=item.price_at_time
        ))
    
    return OrderResponse(
        id=str(order.id),
        orderNumber=order.order_number,
        userId=str(order.user_id),
        items=items,
        totalAmount=order.total_amount,
        status=order.status,
        deliveryAddress=order.delivery_address or "",
        city=order.city,
        postalCode=order.postal_code,
        createdAt=order.created_at.isoformat() if order.created_at else "",
        updatedAt=order.updated_at.isoformat() if order.updated_at else ""
    )
