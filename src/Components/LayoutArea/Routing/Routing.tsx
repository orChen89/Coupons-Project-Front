import { Navigate, Route, Routes } from "react-router-dom";
import AboutUs from "../../AboutUs/AboutUs";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import CompaniesManagement from "../../AdminArea/CompaniesManagement/CompaniesManagement";
import CompanyCouponsAdmin from "../../AdminArea/CompanyCouponsAdmin/CompanyCouponsAdmin";
import CustomerCouponsAdmin from "../../AdminArea/CustomerCouponsAdmin/CustomerCouponsAdmin";
import CustomerssManagement from "../../AdminArea/CustomerssManagement/CustomerssManagement";
import EditCompany from "../../AdminArea/EditCompany/EditCompany";
import EditCustomer from "../../AdminArea/EditCustomer/EditCustomer";
import CompanyRegistration from "../../AuthArea/CompanyRegistration/CompanyRegistration";
import CustomerRegistration from "../../AuthArea/CustomerRegistration/CustomerRegistration";
import EntityRegistration from "../../AuthArea/EntityRegistration/EntityRegistration";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import AddCoupon from "../../CompaniesArea/AddCoupon/AddCoupon";
import ComapnyCard from "../../CompaniesArea/ComapnyCard/ComapnyCard";
import CompanyCoupons from "../../CompaniesArea/CompanyCoupons/CompanyCoupons";
import EditCoupon from "../../CompaniesArea/EditCoupon/EditCoupon";
import AllCoupons from "../../CouponsArea/AllCoupons/AllCoupons";
import CustomerCard from "../../CustomersArea/CustomerCard/CustomerCard";
import CustomerCart from "../../CustomersArea/CustomerCart/CustomerCart";
import CustomerCoupons from "../../CustomersArea/CustomerCoupons/CustomerCoupons";
import Home from "../../HomeArea/Home/Home";
import ContactUs from "../ContactUs/ContactUs";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/logout" element={<Logout />} />

                <Route path="/registration" element={<EntityRegistration />} />

                <Route path="/coupons" element={<AllCoupons />} />

                <Route path="/company-form" element={<CompanyRegistration />} />

                <Route path="/customer-form" element={<CustomerRegistration />} />

                <Route path="/home" element={<Home />} />

                <Route path="/customers/my-coupons" element={<CustomerCoupons />} />

                <Route path="/companies/company-coupons" element={<CompanyCoupons />} />

                <Route path="/customer/purchase-cart" element={<CustomerCart />} />

                <Route path="/create-coupon" element={<AddCoupon />} />

                <Route path="admin/create-comapny" element={<AddCompany />} />

                <Route path="/company-coupons-admin/:companyId" element={<CompanyCouponsAdmin />} />

                <Route path="/customers/my-coupons/admin/:customerId" element={<CustomerCouponsAdmin />} />

                <Route path="/admin/create-customer" element={<AddCustomer />} />

                <Route path="/company-profile" element={<ComapnyCard />} />

                <Route path="/customer-profile" element={<CustomerCard />} />

                <Route path="/admin/customers" element={<CustomerssManagement />} />

                <Route path="/admin/companies" element={<CompaniesManagement />} />

                <Route path="/edit-coupon/:couponId" element={<EditCoupon />} />

                <Route path="/edit-company/:companyId" element={<EditCompany />} />

                <Route path="/edit-customer/:customerId" element={<EditCustomer />} />

                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="/contact-us" element={<ContactUs />} />

                <Route path="/about-us" element={<AboutUs />} />

                <Route path="*" element={<PageNotFound />} />

            </Routes>

        </div>
    );
}

export default Routing;
