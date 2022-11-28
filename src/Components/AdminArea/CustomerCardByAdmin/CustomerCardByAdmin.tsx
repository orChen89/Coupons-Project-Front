import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerCardByAdmin.css";

interface CustomerCardProps {

  customer: CustomerModel;

}

function CustomerCardByAdmin(props: CustomerCardProps): JSX.Element {

  const customerId = props.customer.id;

  async function deleteCustomer() {

    try {
      const ok = window.confirm("Are you sure you wish to delete " + "'" + props.customer.firstName + "'" + "?");
      if (!ok) return;
      await adminService.deleteCustomer(customerId);
      notificationService.success(props.customer.firstName + " has been deleted!");
      window.location.reload();

    }
    catch (err: any) {
      notificationService.error(err);
    }
  }

  return (
    <div className="CustomerCardByAdmin">
      <div className="containerCustomerByAdmin">
        <div className="cardCustomerByAdmin">
          <div className="slideCustomerByAdmin slide1">
            <div className="contentCustomerByAdmin">
              <div className="iconCustomerByAdmin">
                <i className="user-circleByAdmin" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div className="slideCustomerByAdmin slide2">
            <div className="contentCustomerByAdmin">
              <span>Full Name: {props.customer.firstName} {props.customer.lastName}</span> <br /> <br />
              <span> Email: {props.customer.email}</span>  <br /> <br />
              <span>Customer ID: {props.customer.id}</span>
              <div>
                <NavLink className="showCustomerCoupons" to={'/customers/my-coupons/admin/' + props.customer.id}>Coupons</NavLink>
                <NavLink className="updateCustomer" to={"/edit-customer/" + customerId}><AiFillEdit /></NavLink>
                <button className="deleteCustomer" onClick={deleteCustomer}><MdDeleteForever /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default CustomerCardByAdmin;
