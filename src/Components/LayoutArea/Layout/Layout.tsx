import Routing from "../Routing/Routing";
import "./Layout.css";
import Navbar from "../NavBar/NavBar";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { authStore } from "../../../Redux/AuthState";
import jwtDecode from "jwt-decode";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { companyStore, fetchCouponsAction } from "../../../Redux/CompanyState";
import { cartStore } from "../../../Redux/CartState";

function Layout(): JSX.Element {

    const nav = useNavigate();

    useEffect(() => {

        setInterval(() => {
            if (authStore.getState().token) {
                const { exp } = jwtDecode(authStore.getState().token) as {
                    exp: number
                };

                const expInSeconds = exp;

                if (expInSeconds < Math.floor(Date.now() / 1000)) {
                    authService.logout();
                    companyStore.dispatch(fetchCouponsAction([]));
                    cartStore.getState().cartList = [];
                    localStorage.clear();
                    notificationService.error("Session expired, Please perform login to our system!");
                    nav("/login");
                }
            }
        }, 120000);

    }, []);

    return (

        <div className="Layout">

            <AuthMenu />

            <Navbar />

            <Routing />

        </div>
    );
}

export default Layout;
