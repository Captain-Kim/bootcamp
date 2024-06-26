import styled from "styled-components";
import Header from "./Header";
import { useLocation } from "react-router-dom";

const StyleDiv = styled.div`
    max-width: 1280px;
    margin: 100px auto;
`

function Layout({ children }) {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <>
            {!isLoginPage && <Header />}
            <StyleDiv>{children}</StyleDiv>
        </>
    );
}

export default Layout;