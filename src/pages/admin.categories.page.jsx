import { useUser, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

function AdminCategoriesPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { getToken } = useAuth();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

            if (!response.ok) throw new Error('Failed to fetch categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            toast.error('Failed to load categories');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = await getToken();
            const response = await fetch('https://fed-storefront-backend-sachitha.onrender.com/Api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCategory)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors?.[0] || 'Failed to create category');
            }

            const data = await response.json();
            setCategories([...categories, data]);
            setNewCategory({ name: '', description: '' });
            toast.success('Category created successfully!');
        } catch (error) {
            toast.error(error.message);
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
            <h1 className="mb-8 text-4xl font-bold">Manage Categories</h1>

            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-2xl font-semibold">Add New Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                className="block px-3 py-2 mt-1 w-full rounded-md border border-gray-300"
                                rows="3"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 text-white rounded-md ${
                                isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Category'}
                        </button>
                    </form>
                </div>

                <div>
                    <h2 className="mb-4 text-2xl font-semibold">Existing Categories</h2>
                    <div className="space-y-4">
                        {categories.map(category => (
                            <div key={category._id} className="p-4 rounded-lg border">
                                <h3 className="font-medium">{category.name}</h3>
                                <p className="mt-1 text-sm text-gray-600">{category.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminCategoriesPage; 