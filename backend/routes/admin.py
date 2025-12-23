"""
Admin routes for order, user, and statistics management.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

from database import get_db
from db_models import User, DBProduct, Order, OrderItem
from schemas.order import OrderResponse, OrderItemResponse
from schemas.user import UserResponse
from utils.deps import get_current_admin_user

router = APIRouter(prefix="/admin", tags=["Admin"])


class DashboardStats(BaseModel):
    total_products: int
    low_stock_products: int
    total_orders: int
    pending_orders: int
    total_revenue: float
    total_users: int


@router.get("/orders", response_model=List[OrderResponse])
async def get_all_orders(
    order_status: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get all orders (admin only)"""
    query = db.query(Order)
    
    if order_status:
        query = query.filter(Order.status == order_status)
    
    orders = query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()
    
    result = []
    for order in orders:
        items = []
        for item in order.items:
            product = db.query(DBProduct).filter(DBProduct.id == item.product_id).first()
            items.append(OrderItemResponse(
                id=str(item.id),
                productId=str(item.product_id),
                name=product.name if product else "Unknown Product",
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


@router.put("/orders/{order_id}/status")
async def update_order_status(
    order_id: int,
    new_status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update order status (admin only)"""
    valid_statuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if new_status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Handle stock restoration if cancelling
    if new_status == "cancelled" and order.status != "cancelled":
        for item in order.items:
            product = db.query(DBProduct).filter(DBProduct.id == item.product_id).first()
            if product:
                product.quantity += item.quantity
    
    order.status = new_status
    order.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": f"Order status updated to {new_status}"}


@router.get("/users", response_model=List[UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get all users (admin only)"""
    users = db.query(User).offset(skip).limit(limit).all()
    
    return [
        UserResponse(
            id=str(user.id),
            email=user.email,
            name=user.name,
            role=user.role,
            createdAt=user.created_at.isoformat() if user.created_at else ""
        )
        for user in users
    ]


@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get dashboard statistics (admin only)"""
    total_products = db.query(DBProduct).count()
    low_stock_products = db.query(DBProduct).filter(DBProduct.quantity < 10).count()
    total_orders = db.query(Order).count()
    pending_orders = db.query(Order).filter(Order.status == "pending").count()
    
    revenue_result = db.query(func.sum(Order.total_amount)).filter(
        Order.status == "delivered"
    ).scalar()
    total_revenue = float(revenue_result) if revenue_result else 0.0
    
    total_users = db.query(User).filter(User.role == "customer").count()
    
    return DashboardStats(
        total_products=total_products,
        low_stock_products=low_stock_products,
        total_orders=total_orders,
        pending_orders=pending_orders,
        total_revenue=total_revenue,
        total_users=total_users
    )
