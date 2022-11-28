import { useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerCard.css";

function CustomerCard(): JSX.Element {

  const customerId = authStore.getState().user.id;

  const [customer, setCustomer] = useState<CustomerModel>();


  useEffect(() => {

    getCustomer().then(customer => setCustomer(customer)).catch(err => notificationService.error(err));


  }, []);


  async function getCustomer() {

    const cus = (await customerService.fetchCustomerProfile(customerId));

    return cus;
  }

  return (

    <div className="CustomerCard">
      <div className="containerCustomer">
        <div className="cardCustomer">
          <div className="slideCustomer slide1">
            <div className="contentCustomer">
              <div className="iconCustomer">
                <i className="user-circle" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div className="slideCustomer slide2">
            <div className="contentCustomer">
              <span>Full Name: {customer && customer.firstName + " " + customer.lastName}</span> <br /> <br />
              <span>Email: {customer && customer.email}</span>  <br /> <br />
              <span>Customer ID: {customer && customer.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}


export default CustomerCard;
