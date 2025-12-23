import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaSpinner, FaPlus, FaMinus, FaExclamationTriangle } from 'react-icons/fa';
import { productService, Product } from '../services/productService';
import { useCartStore } from '../context/cartStore';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCartStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (err: any) {
                console.error('Failed to fetch product:', err);
                setError(err.message || 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity,
        });

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Electronic': return '🔌';
            case 'Plush': return '🧸';
            case 'BoardGame': return '🎲';
            default: return '🎁';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-light py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col justify-center items-center h-96">
                        <FaSpinner className="text-4xl text-primary animate-spin mb-4" />
                        <p className="text-gray-600">Loading product...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-light py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto card text-center py-12">
                        <FaExclamationTriangle className="text-5xl text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                        <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
                        <Link to="/products" className="btn btn-primary">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light py-12">
            <div className="container mx-auto px-4">
                <Link
                    to="/products"
                    className="flex items-center gap-2 text-primary font-semibold mb-8 hover:gap-3 transition"
                >
                    <FaArrowLeft /> Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="card p-0 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    {/* Product Details */}
                    <div>
                        <div className="mb-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                                {getCategoryIcon(product.category)} {product.category}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                        <p className="text-xl text-gray-600 mb-4">{product.brand}</p>

                        <p className="text-3xl font-bold text-primary mb-6">
                            PKR {product.price.toLocaleString('en-PK', { maximumFractionDigits: 0 })}
                        </p>

                        <p className="text-gray-600 mb-6">{product.description}</p>

                        {/* Category-specific attributes */}
                        {product.categoryAttributes && (
                            <div className="mb-6 p-4 bg-light rounded-lg">
                                <h3 className="font-bold mb-3">Specifications</h3>
                                <ul className="space-y-2 text-sm">
                                    {Object.entries(product.categoryAttributes).map(([key, value]) => (
                                        <li key={key} className="flex justify-between">
                                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <span className="font-semibold">{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className="mb-6">
                            {product.quantity > 0 ? (
                                <span className="text-green-600 font-semibold">
                                    ✓ In Stock ({product.quantity} available)
                                </span>
                            ) : (
                                <span className="text-red-500 font-semibold">✗ Out of Stock</span>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        {product.quantity > 0 && (
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-semibold">Quantity:</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 border border-gray-300 rounded hover:bg-light transition"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                        className="p-2 border border-gray-300 rounded hover:bg-light transition"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.quantity === 0 || addedToCart}
                            className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition ${addedToCart
                                    ? 'bg-green-500 text-white'
                                    : product.quantity > 0
                                        ? 'btn btn-primary'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {addedToCart ? (
                                '✓ Added to Cart!'
                            ) : (
                                <>
                                    <FaShoppingCart /> Add to Cart
                                </>
                            )}
                        </button>

                        {addedToCart && (
                            <button
                                onClick={() => navigate('/cart')}
                                className="w-full mt-4 btn btn-outline py-3"
                            >
                                View Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
