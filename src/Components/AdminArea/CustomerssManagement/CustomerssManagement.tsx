import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CustomerModel } from "../../../Models/UserModel";
import { adminStore } from "../../../Redux/AdminState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CustomerCardByAdmin from "../CustomerCardByAdmin/CustomerCardByAdmin";
import "./CustomerssManagement.css";

function CustomerssManagement(): JSX.Element {

  const [customers, setCustomers] = useState<CustomerModel[]>([]);

  useEffect(() => {

    adminService.fetchAllCustomers().then(customers => setCustomers(customers)).
      catch(err => notificationService.error(err));

  }, []);

  useEffect(() => {

    setCustomers(adminStore.getState().customers);
    const unSubscribe = adminStore.subscribe(() => {
      const duplicatedCustomers = [...adminStore.getState().customers];
      setCustomers(duplicatedCustomers);

    });

    return () => {
      unSubscribe();
    }

  }, []);

  return (
    <div className="CustomerssManagement">

      <NavLink className="addCustomer" to={'/admin/create-customer'}>Add Customer</NavLink>

      <section>

        {customers.map(c => <CustomerCardByAdmin key={c.id} customer={c} />)}

      </section>

    </div>
  );
}

export default CustomerssManagement;
