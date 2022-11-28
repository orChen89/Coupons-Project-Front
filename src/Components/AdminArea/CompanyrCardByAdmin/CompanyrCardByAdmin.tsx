import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { CompanyModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyrCardByAdmin.css";

interface CompanyCardProps {

  company: CompanyModel;

}

function CompanyrCardByAdmin(props: CompanyCardProps): JSX.Element {

  const companyId = props.company.id;

  async function deleteCompany() {

    try {
      const ok = window.confirm("Are you sure you wish to delete " + "'" + props.company.name + "'" + "?");
      if (!ok) return;
      await adminService.deleteCompany(companyId);
      notificationService.success(props.company.name + " has been deleted!");

    }
    catch (err: any) {
      notificationService.error(err);
    }
  }

  return (

    <div className="CompanyrCardByAdmin">
      <div className="containerCompanyByAdmin">
        <div className="cardCompanyByAdmin">
          <div className="slideCompanyByAdmin slide1">
            <div className="contentCompanyByAdmin">
              <div className="iconCompanyByAdmin">
                <i className="user-circleCompanyByAdmin" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div className="slideCompanyByAdmin slide2">
            <div className="contentCompanyByAdmin">
              <span>Name: {props.company.name} </span> <br /> <br />
              <span>Email: {props.company.email}</span>  <br /> <br />
              <span>Company ID: {props.company.id}</span>
              <div>
                <NavLink className="showCompanyCoupons" to={'/company-coupons-admin/' + props.company.id}>Coupons</NavLink>
                <NavLink className="updateCompany" to={"/edit-company/" + companyId}><AiFillEdit /></NavLink>
                <button className="deleteCompany" onClick={deleteCompany}><MdDeleteForever /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyrCardByAdmin;
