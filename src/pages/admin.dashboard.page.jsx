import { useUser, useAuth } from "@clerk/clerk-react";
import { Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

function AdminDashboardPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { getToken } = useAuth();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = await getToken();
            const response = await fetch('https://fed-storefront-backend-sachitha.onrender.com/Api/products', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                throw new Error(`Failed to fetch products: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('API did not return JSON');
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('API did not return an array of products');
            }

            setProducts(data);
        } catch (error) {
            toast.error('Failed to load products: ' + error.message);
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const token = await getToken();
            const response = await fetch(`https://fed-storefront-backend-sachitha.onrender.com/Api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
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
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                    <Link 
                        to="/admin/products/create"
                        className="px-4 py-2 text-white bg-green-600 rounded-md transition-colors hover:bg-green-700"
                    >
                        + Add New Product
                    </Link>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Product Management</h2>
                    {isLoading ? (
                        <div className="py-4 text-center">
                            <p>Loading products...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Product</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Price</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Inventory</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img 
                                                            className="object-cover w-10 h-10 rounded-full" 
                                                            src={product.image} 
                                                            alt={product.name}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">${product.price}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.category}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.inventory}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className="flex space-x-3">
                                                    <Link
                                                        to={`/admin/products/edit/${product._id}`}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default AdminDashboardPage; 