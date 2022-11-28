import { NavLink } from "react-router-dom";
import "./EntityRegistration.css";

function EntityRegistration(): JSX.Element {
    return (
        <div className="EntityRegistration">


            <NavLink to="/company-form">

                <button className='companyReg'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>  Register as a Company </button>  <br /> <br /> <br />

            </NavLink>

            <NavLink to="/customer-form">

                <button className='customerReg'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>  Register as a Customer </button>

            </NavLink>

        </div>
    );
}

export default EntityRegistration;
