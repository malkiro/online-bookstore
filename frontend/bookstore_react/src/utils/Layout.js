import { Outlet } from "react-router-dom"
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            {/*  Displaying Child elements */}
            <Footer />
        </>
    )
}

export default Layout;