import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartStore } from "../../../Redux/CartState";
import { companyStore, fetchCouponsAction } from "../../../Redux/CompanyState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        authService.logout();
        notificationService.success("Bye Bye!");
        localStorage.clear();
        navigate("/home");
        companyStore.dispatch(fetchCouponsAction([]));
        cartStore.getState().cartList = [];

    }, [])

    return null;
}

export default Logout;
