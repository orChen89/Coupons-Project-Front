import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Role from "../../../Models/Role";
import { BaseUserModel, CompanyModel, CustomerModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { LogIn } from "../../LayoutArea/NavBar/LogIn/LogIn";
import "./AuthMenu.css";
import { BsCart4 } from 'react-icons/bs';

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<BaseUserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);

        });

        return () => {
            unsubscribe();
        }
    }, []);

    function getDetails(): string {

        switch (user.role) {

            case Role.Customer:
                const customer = user as CustomerModel;
                return customer.name;

            case Role.Company:
                const company = user as CompanyModel;
                return company.name;

            default:
                return "Admin";
        }
    }

    return (
        <div className="AuthMenu">

            {
                !user && <>
                    <span className="beforeLoggin">Hello Guest ! &nbsp;</span>
                    <NavLink to="/login"><LogIn /></NavLink>
                </>

            }

            {
                user && user.role === Role.Customer && <>

                    <NavLink className="userCart" to={"customer/purchase-cart"}><BsCart4 /></NavLink>

                </>
            }

            {
                user && <>
                    <span className="loggedIn">Hello {getDetails()} ! &nbsp;</span>
                    <NavLink to="/logout">
                        <button className='logout'>Log Out </button>
                    </NavLink>

                </>
            }

        </div>
    );
}

export default AuthMenu;
