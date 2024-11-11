import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default Layout;

/*
The Outlet component serves as a placeholder for rendering different content inside 
a shared layout. It dynamically loads the content of a child route within a parent 
route’s layout.
 */

/*
In React Router, routes can be nested. When routes are nested, we can have a parent 
route (e.g., /dashboard) and child routes (e.g., /dashboard/stats, /dashboard/profile).
The child routes should be rendered inside the parent route layout, and this is where 
Outlet becomes crucial.
 */