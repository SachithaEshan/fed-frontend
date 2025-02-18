import { useUser, useAuth } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";

function AdminProductCreatePage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        categoryId: "",
        image: "",
        inventory: ""
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = await getToken();
            const response = await fetch('https://fed-storefront-backend-sachitha.onrender.com/Api/categories', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            toast.error('Failed to load categories');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const token = await getToken();
            const response = await fetch('https://fed-storefront-backend-sachitha.onrender.com/Api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                throw new Error('Failed to create product');
            }

            toast.success('Product created successfully!');
            navigate('/admin');
        } catch (error) {
            toast.error(error.message || 'Failed to create product');
            console.error('Error creating product:', error);
        } finally {
            setIsSubmitting(false);
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
            <h1 className="mb-8 text-4xl font-bold">Create Product</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                        required
                        step="0.01"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="mt-8 mb-8">
                    <Link 
                         to="/admin/categories"
                         className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                              Manage Categories
                    </Link>
                    </div>

                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="inventory" className="block text-sm font-medium text-gray-700">Inventory</label>
                    <input
                        type="number"
                        id="inventory"
                        name="inventory"
                        value={formData.inventory}
                        onChange={handleChange}
                        className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                        required
                        min="0"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-4 py-2 text-white rounded-md transition-colors
                            ${isSubmitting 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Product'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin')}
                        className="px-4 py-2 text-white bg-gray-500 rounded-md transition-colors hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}

export default AdminProductCreatePage;