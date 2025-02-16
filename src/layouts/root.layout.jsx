import { Outlet } from "react-router-dom";
import Navbar from "@/Navbar";
import { Toaster } from "@/components/ui/sonner"

function RootLayout() {
    return(
        <>
        <Navbar/>
        <Outlet/>
        <Toaster/>
        </>
    );
}

export default RootLayout;