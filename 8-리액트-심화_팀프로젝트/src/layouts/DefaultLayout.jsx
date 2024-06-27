import Header from "../components/header/Header";
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <div id="default-layout">
            <Header />
            <Outlet />
        </div>
    )
}

export default DefaultLayout