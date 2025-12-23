-- Wonderland Toy Store Database Schema
-- PostgreSQL Database Creation Script

-- Create Database
CREATE DATABASE wonderland_toy_store
    WITH
    ENCODING 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE = template0;

-- Connect to the new database
\c wonderland_toy_store;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==================== USERS TABLE ====================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- ==================== PRODUCTS TABLE ====================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    quantity INT DEFAULT 0 CHECK (quantity >= 0),
    category VARCHAR(50) NOT NULL CHECK (category IN ('Electronic', 'Plush', 'BoardGame')),
    image_url VARCHAR(500),
    rating FLOAT DEFAULT NULL CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_category (category),
    INDEX idx_name (name),
    INDEX idx_brand (brand),
    INDEX idx_price (price)
);

-- ==================== ELECTRONIC TOYS TABLE ====================
CREATE TABLE electronic_toys (
    product_id INT PRIMARY KEY,
    battery_type VARCHAR(255) NOT NULL,
    voltage VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ==================== PLUSH TOYS TABLE ====================
CREATE TABLE plush_toys (
    product_id INT PRIMARY KEY,
    material VARCHAR(255) NOT NULL,
    size VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ==================== BOARD GAMES TABLE ====================
CREATE TABLE board_games (
    product_id INT PRIMARY KEY,
    age_range VARCHAR(100) NOT NULL,
    number_of_players VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ==================== ORDERS TABLE ====================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')),
    shipping_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_order_number (order_number),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- ==================== ORDER ITEMS TABLE ====================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);

-- ==================== FAVORITES TABLE ====================
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- ==================== REVIEWS TABLE ====================
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_user_id (user_id)
);

-- ==================== INVENTORY LOGS TABLE ====================
CREATE TABLE inventory_logs (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    quantity_before INT NOT NULL,
    quantity_after INT NOT NULL,
    change_type VARCHAR(50) NOT NULL CHECK (change_type IN ('Sale', 'Restock', 'Adjustment', 'Return')),
    reference_id INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_created_at (created_at),
    INDEX idx_change_type (change_type)
);

-- ==================== SAMPLE DATA ====================

-- Insert Sample Users
INSERT INTO users (name, email, password, phone, address, city, country, postal_code) VALUES
('Ali Khan', 'ali@example.com', 'hashed_password_1', '03001234567', '123 Main Street', 'Karachi', 'Pakistan', '74000'),
('Fatima Ahmed', 'fatima@example.com', 'hashed_password_2', '03119876543', '456 Defense Road', 'Lahore', 'Pakistan', '54000'),
('Hassan Admin', 'admin@wonderland.com', 'hashed_password_admin', '03335551234', '789 Mall Road', 'Islamabad', 'Pakistan', '44000');

-- Insert Sample Electronic Toys
INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating) VALUES
('Smart Robot', 'TechToys', 'Interactive robot with voice commands and LED display', 4999, 15, 'Electronic', 'https://via.placeholder.com/300?text=Smart+Robot', 4.5);
INSERT INTO electronic_toys (product_id, battery_type, voltage) VALUES (1, 'AA', '3V');

INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating) VALUES
('LED Robot Car', 'FutureBot', 'Remote control robot car with LED lights', 3499, 20, 'Electronic', 'https://via.placeholder.com/300?text=Robot+Car', 4.2);
INSERT INTO electronic_toys (product_id, battery_type, voltage) VALUES (2, 'AAA', '1.5V');

INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating) VALUES
('Electronic Learning Tablet', 'SmartKids', 'Educational tablet for kids with 50+ activities', 5999, 8, 'Electronic', 'https://via.placeholder.com/300?text=Tablet', 4.8);
INSERT INTO electronic_toys (product_id, battery_type, voltage) VALUES (3, 'Rechargeable', '5V');

-- Insert Sample Plush Toys
INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating) VALUES
('Cuddly Teddy Bear', 'SoftCare', 'Super soft teddy bear perfect for hugs', 2499, 30, 'Plush', 'https://via.placeholder.com/300?text=Teddy+Bear', 4.7);
INSERT INTO plush_toys (product_id, material, size) VALUES (4, 'Plush', 'Large');

INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating) VALUES
('Fluffy Bunny', 'CuddlePets', 'Adorable fluffy bunny with soft ears', 1999, 25, 'Plush', 'https://via.placeholder.com/300?text=Bunny', 4.6);
INSERT INTO plush_toys (product_id, material, size) VALUES (5, 'Cotton', 'Medium');

INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating) VALUES
('Dinosaur Plush Toy', 'JungleKids', 'Colorful dinosaur plush with embroidered details', 1799, 18, 'Plush', 'https://via.placeholder.com/300?text=Dinosaur', 4.4);
INSERT INTO plush_toys (product_id, material, size) VALUES (6, 'Polyester', 'Small');

-- Insert Sample Board Games
INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating) VALUES
('Advanced Chess Set', 'GameMaster', 'Professional chess set with premium wooden pieces', 3499, 10, 'BoardGame', 'https://via.placeholder.com/300?text=Chess', 4.9);
INSERT INTO board_games (product_id, age_range, number_of_players) VALUES (7, '10+', '2');

INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating) VALUES
('Ludo Board Game', 'FamilyFun', 'Classic ludo game for family entertainment', 1499, 22, 'BoardGame', 'https://via.placeholder.com/300?text=Ludo', 4.3);
INSERT INTO board_games (product_id, age_range, number_of_players) VALUES (8, '5+', '2-4');

INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating) VALUES
('Monopoly Pakistan Edition', 'BoardKing', 'Classic monopoly game with Pakistan theme', 4499, 5, 'BoardGame', 'https://via.placeholder.com/300?text=Monopoly', 4.8);
INSERT INTO board_games (product_id, age_range, number_of_players) VALUES (9, '8+', '2-8');

-- ==================== CREATE VIEWS ====================

-- View: Product with Category Details
CREATE VIEW vw_products_with_details AS
SELECT
    p.id,
    p.name,
    p.brand,
    p.price,
    p.quantity,
    p.category,
    p.rating,
    p.created_at,
    CASE
        WHEN p.category = 'Electronic' THEN (SELECT battery_type FROM electronic_toys WHERE product_id = p.id)
        WHEN p.category = 'Plush' THEN (SELECT material FROM plush_toys WHERE product_id = p.id)
        WHEN p.category = 'BoardGame' THEN (SELECT age_range FROM board_games WHERE product_id = p.id)
    END as category_detail
FROM products p
WHERE p.is_active = TRUE;

-- View: Low Stock Products
CREATE VIEW vw_low_stock_products AS
SELECT
    id,
    name,
    brand,
    price,
    quantity,
    category
FROM products
WHERE quantity < 10 AND is_active = TRUE
ORDER BY quantity ASC;

-- View: Revenue by Product
CREATE VIEW vw_revenue_by_product AS
SELECT
    p.id,
    p.name,
    SUM(oi.quantity) as total_sold,
    SUM(oi.price * oi.quantity) as total_revenue,
    p.price
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.price
ORDER BY total_revenue DESC;

-- ==================== CREATE FUNCTIONS ====================

-- Function: Update Product Timestamp
CREATE OR REPLACE FUNCTION update_product_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update product timestamp on modification
CREATE TRIGGER trg_update_product_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_product_timestamp();

-- Function: Generate Order Number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS VARCHAR AS $$
BEGIN
    RETURN 'ORD-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || '-' || LPAD((SELECT COUNT(*) + 1)::TEXT, 5, '0');
END;
$$ LANGUAGE plpgsql;

-- Function: Log Inventory Changes
CREATE OR REPLACE FUNCTION log_inventory_change()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity != OLD.quantity THEN
        INSERT INTO inventory_logs (product_id, quantity_before, quantity_after, change_type, notes)
        VALUES (NEW.id, OLD.quantity, NEW.quantity, 'Adjustment', 'Manual quantity update');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Log inventory changes
CREATE TRIGGER trg_log_inventory_change
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION log_inventory_change();

-- ==================== GRANT PERMISSIONS ====================
-- Create app user with limited permissions (optional)
-- CREATE USER wonderland_app WITH PASSWORD 'your_secure_password';
-- GRANT CONNECT ON DATABASE wonderland_toy_store TO wonderland_app;
-- GRANT USAGE ON SCHEMA public TO wonderland_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO wonderland_app;
-- GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO wonderland_app;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO wonderland_app;

-- ==================== DATABASE INFO ====================
-- Database: wonderland_toy_store
-- Tables: 11 (users, products, electronic_toys, plush_toys, board_games, orders, order_items, favorites, reviews, inventory_logs)
-- Views: 3 (vw_products_with_details, vw_low_stock_products, vw_revenue_by_product)
-- Functions: 2 (update_product_timestamp, generate_order_number, log_inventory_change)
-- Sample Data: 9 Products, 3 Users

