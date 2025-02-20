import { Link } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";

function AdminNav() {
    const { user } = useUser();
    
    if (user?.publicMetadata?.role !== "admin") {
        return null;
    }

    return (
        <div className="p-4 mb-4 bg-gray-100 rounded-lg">
            <h2 className="mb-2 text-lg font-semibold">Admin Controls</h2>
            <div className="space-x-4">
                <Link 
                    to="/admin/products/create" 
                    className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700"
                >
                    Create Product
                </Link>
               
            </div>
        </div>
    );
}

export default AdminNav; 