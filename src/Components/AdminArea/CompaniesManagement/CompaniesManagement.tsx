import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CompanyModel } from "../../../Models/UserModel";
import { adminStore } from "../../../Redux/AdminState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyrCardByAdmin from "../CompanyrCardByAdmin/CompanyrCardByAdmin";
import "./CompaniesManagement.css";

function CompaniesManagement(): JSX.Element {

  const [companies, setCompanies] = useState<CompanyModel[]>([]);

  useEffect(() => {

    adminService.fetchAllCompanies().then(companies => setCompanies(companies)).
      catch(err => notificationService.error(err));

  }, []);

  useEffect(() => {

    setCompanies(adminStore.getState().companies);
    const unSubscribe = adminStore.subscribe(() => {
      const duplicatedCompanies = [...adminStore.getState().companies];
      setCompanies(duplicatedCompanies);

    });

    return () => {
      unSubscribe();
    }

  }, []);

  return (
    <div className="CompaniesManagement">

      <NavLink className="addCompany" to={'/admin/create-comapny'}>Add Company</NavLink>

      <section>

        {companies.map(c => <CompanyrCardByAdmin key={c.id} company={c} />)}

      </section>

    </div>
  );
}

export default CompaniesManagement;
