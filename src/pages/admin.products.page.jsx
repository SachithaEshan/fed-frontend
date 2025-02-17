import { useUser } from "@clerk/clerk-react";
import { Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

function AdminProductsPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('YOUR_API_ENDPOINT/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            toast.error('Failed to load products');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`YOUR_API_ENDPOINT/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.getToken()}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete product');
            
            toast.success('Product deleted successfully');
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            toast.error('Failed to delete product');
            console.error(error);
        }
    };

    if (!isLoaded) {
        return <main className="px-8">Loading...</main>;
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" />;
    }

    if (user.publicMetadata?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return (
        <main className="px-8 py-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Manage Products</h1>
                <Link 
                    to="/admin/products/create"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700"
                >
                    Add New Product
                </Link>
            </div>

            {isLoading ? (
                <p>Loading products...</p>
            ) : (
                <div className="grid gap-6">
                    {products.map(product => (
                        <div 
                            key={product._id} 
                            className="flex justify-between items-center p-6 bg-white rounded-lg border shadow-sm"
                        >
                            <div className="flex items-center space-x-4">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="object-cover w-16 h-16 rounded"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold">{product.name}</h2>
                                    <p className="text-gray-600">${product.price}</p>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <Link
                                    to={`/admin/products/edit/${product._id}`}
                                    className="px-4 py-2 text-white bg-yellow-500 rounded-md transition-colors hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="px-4 py-2 text-white bg-red-500 rounded-md transition-colors hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default AdminProductsPage; 