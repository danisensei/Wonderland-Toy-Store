"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
Order Routes - Create, view, and manage orders
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid
from datetime import datetime

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from schemas.order import OrderCreate, OrderResponse
from db_models.order import Order, OrderItem, OrderStatus
from db_models.product import DBProduct
from db_models.user import User
from utils.deps import get_db, get_current_user


router = APIRouter(prefix="/api/orders", tags=["Orders"])


def generate_order_number() -> str:
    """Generate a unique order number."""
    timestamp = datetime.utcnow().strftime("%Y%m%d")
    unique_id = str(uuid.uuid4())[:8].upper()
    return f"ORD-{timestamp}-{unique_id}"


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
async def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    """Create a new order."""
    if not order_data.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order must have at least one item"
        )
    
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
=======
=======
>>>>>>> Stashed changes
    """
    Create a new order.
    
    Args:
        order_data: Order data with items and delivery address
        db: Database session
        current_user: Authenticated user
        
    Returns:
        Created order
    """
    total_amount = 0.0
    order_items = []
    
    # Validate and process each order item
    for item_data in order_data.items:
        product = db.query(DBProduct).filter(
            DBProduct.id == int(item_data.productId)
        ).first()
        
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with ID {item_data.productId} not found"
            )
        
        if product.quantity < item_data.quantity:
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient stock for {product.name}. Available: {product.quantity}"
            )
        
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        order_items_data.append({
            "product": product,
            "quantity": item.quantity,
            "price": product.price
        })
        total_amount += product.price * item.quantity
    
    new_order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        status="pending",
=======
=======
>>>>>>> Stashed changes
        # Calculate item total
        item_total = product.price * item_data.quantity
        total_amount += item_total
        
        # Prepare order item
        order_items.append({
            "product": product,
            "quantity": item_data.quantity,
            "price": product.price,
            "product_name": product.name
        })
    
    # Create the order
    new_order = Order(
        order_number=generate_order_number(),
        user_id=current_user.id,
        total_amount=total_amount,
        status=OrderStatus.PENDING.value,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        delivery_address=order_data.deliveryAddress,
        city=order_data.city,
        postal_code=order_data.postalCode
    )
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    db.add(new_order)
    db.flush()
    
    for item_data in order_items_data:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item_data["product"].id,
            quantity=item_data["quantity"],
            price_at_time=item_data["price"]
        )
        db.add(order_item)
        item_data["product"].quantity -= item_data["quantity"]
=======
=======
>>>>>>> Stashed changes
    
    db.add(new_order)
    db.flush()  # Get the order ID without committing
    
    # Create order items and update product quantities
    for item_info in order_items:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item_info["product"].id,
            quantity=item_info["quantity"],
            price=item_info["price"],
            product_name=item_info["product_name"]
        )
        db.add(order_item)
        
        # Reduce product stock
        item_info["product"].quantity -= item_info["quantity"]
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    
    db.commit()
    db.refresh(new_order)
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
    return new_order.to_dict()


@router.get("/my-orders", response_model=List[dict])
async def get_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all orders for the current authenticated user.
    
    Args:
        db: Database session
        current_user: Authenticated user
        
    Returns:
        List of user's orders
    """
    orders = db.query(Order).filter(
        Order.user_id == current_user.id
    ).order_by(Order.created_at.desc()).all()
    
    return [order.to_dict() for order in orders]


@router.get("/{order_id}", response_model=dict)
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
async def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    """Get a specific order by ID."""
    order = db.query(Order).filter(Order.id == order_id).first()
=======
=======
>>>>>>> Stashed changes
    """
    Get a specific order by ID.
    
    Args:
        order_id: The order ID
        db: Database session
        current_user: Authenticated user
        
    Returns:
        Order details
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    # Check if user owns the order or is admin
>>>>>>> Stashed changes
=======
    # Check if user owns the order or is admin
>>>>>>> Stashed changes
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this order"
        )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
    return order.to_dict()


@router.put("/{order_id}/cancel", response_model=dict)
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
async def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    """Cancel an order and restore stock."""
    order = db.query(Order).filter(Order.id == order_id).first()
=======
=======
>>>>>>> Stashed changes
    """
    Cancel an order.
    
    Args:
        order_id: The order ID
        db: Database session
        current_user: Authenticated user
        
    Returns:
        Updated order
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    # Check if user owns the order or is admin
>>>>>>> Stashed changes
=======
    # Check if user owns the order or is admin
>>>>>>> Stashed changes
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to cancel this order"
        )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    if order.status not in ["pending", "processing"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot cancel order with status '{order.status}'"
        )
    
=======
=======
>>>>>>> Stashed changes
    # Check if order can be cancelled
    if order.status in [OrderStatus.SHIPPED.value, OrderStatus.DELIVERED.value]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot cancel order that has been shipped or delivered"
        )
    
    if order.status == OrderStatus.CANCELLED.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order is already cancelled"
        )
    
    # Restore product quantities
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    for item in order.items:
        product = db.query(DBProduct).filter(DBProduct.id == item.product_id).first()
        if product:
            product.quantity += item.quantity
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
    # Cancel the order
    order.status = OrderStatus.CANCELLED.value
    
    db.commit()
    db.refresh(order)
    
    return order.to_dict()
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
