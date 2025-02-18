import {useAuth, useUser} from "@clerk/clerk-react";
// import Navbar from "@/Navbar";
import {Navigate} from "react-router-dom";
import {UserCircle} from "lucide-react";

function AccountPage() {

    const { isLoaded, isSignedIn, user} = useUser();

    if (!isLoaded) {
        return (
            <main className="p-8 min-h-screen bg-gray-50">
                <div className="mx-auto max-w-3xl">
                    <h1 className="mb-6 text-3xl font-bold">My Account</h1>
                    <div className="animate-pulse">
                        <div className="mb-4 h-32 bg-gray-200 rounded-lg"></div>
                        <div className="mb-4 h-20 bg-gray-200 rounded-lg"></div>
                        <div className="h-20 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </main>
        )
    }

    if (!isSignedIn){
        return <Navigate to="/sign-in"/>
    }

    return(
        <main className="p-8 min-h-screen bg-gray-50">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-8 text-3xl font-bold">My Account</h1>

                {/* Profile Card */}
                <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-4">
                        {user.imageUrl ? (
                            <img
                                src={user.imageUrl}
                                alt={user.fullName}
                                className="object-cover w-20 h-20 rounded-full"
                            />
                        ) : (
                            <UserCircle className="w-20 h-20 text-gray-400" />
                        )}
                        <div>
                            <h2 className="text-2xl font-semibold">{user.fullName}</h2>
                            <p className="text-gray-600">{user.emailAddresses[0].emailAddress}</p>
                        </div>
                    </div>
                </div>

                {/* Account Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Personal Information */}
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold">Personal Information</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-gray-500">Full Name</label>
                                <p className="font-medium">{user.fullName}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p className="font-medium">{user.emailAddresses[0].emailAddress}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Member Since</label>
                                <p className="font-medium">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold">Account Settings</h3>
                        <div className="space-y-4">
                            {/* <button
                                onClick={() => user.update({})}
                                className="px-4 py-2 w-full text-sm font-medium text-gray-700 bg-gray-100 rounded-md transition-colors hover:bg-gray-200"
                            >
                                Update Profile
                            </button> */}
                            <button
                                onClick={() => window.location.href = '/orders'}
                                className="px-4 py-2 w-full text-sm font-medium text-gray-700 bg-gray-100 rounded-md transition-colors hover:bg-gray-200"
                            >
                                View Orders
                            </button>
                            <button
                                onClick={() => window.location.href = '/saved'}
                                className="px-4 py-2 w-full text-sm font-medium text-gray-700 bg-gray-100 rounded-md transition-colors hover:bg-gray-200"
                            >
                                Saved Items
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AccountPage;