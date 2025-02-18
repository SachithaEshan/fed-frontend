import { useUser, useAuth } from "@clerk/clerk-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

function AdminProductEditPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
        inventory: ""
    });

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`https://fed-storefront-backend-sachitha.onrender.com/Api/products/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                throw new Error('Failed to fetch product');
            }

            const data = await response.json();
            setFormData(data);
        } catch (error) {
            toast.error('Failed to load product');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

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

    const handleAddNewCategory = async () => {
        if (!newCategory.trim()) return;

        try {
            const token = await getToken();
            const response = await fetch('https://fed-storefront-backend-sachitha.onrender.com/Api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: newCategory.trim() })
            });

            if (!response.ok) {
                throw new Error('Failed to add category');
            }

            const addedCategory = await response.json();
            setCategories(prev => [...prev, addedCategory]);
            setFormData(prev => ({ ...prev, category: addedCategory.name }));
            setNewCategory("");
            setShowNewCategoryInput(false);
            toast.success('Category added successfully!');
        } catch (error) {
            toast.error('Failed to add category');
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
            const response = await fetch(`https://fed-storefront-backend-sachitha.onrender.com/Api/products/${id}`, {
                method: 'PUT',
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
                throw new Error('Failed to update product');
            }

            toast.success('Product updated successfully!');
            navigate('/admin'); // Navigate to admin dashboard
        } catch (error) {
            toast.error(error.message || 'Failed to update product');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded || isLoading) {
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
            <h1 className="mb-8 text-4xl font-bold">Edit Product</h1>
            
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
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <div className="flex gap-2">
                        {!showNewCategoryInput ? (
                            <>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => setShowNewCategoryInput(true)}
                                    className="px-4 py-2 mt-1 text-white bg-green-600 rounded-md hover:bg-green-700"
                                >
                                    Add New
                                </button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                                    placeholder="Enter new category"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddNewCategory}
                                    className="px-4 py-2 mt-1 text-white bg-green-600 rounded-md hover:bg-green-700"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowNewCategoryInput(false);
                                        setNewCategory("");
                                    }}
                                    className="px-4 py-2 mt-1 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
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
                        {isSubmitting ? 'Updating...' : 'Update Product'}
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

export default AdminProductEditPage; 