import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import "./ComapnyCard.css";


function ComapnyCard(): JSX.Element {

  const companyId = authStore.getState().user.id;

  const [company, setCompany] = useState<CompanyModel>();


  useEffect(() => {

    getCompany().then(company => setCompany(company)).catch(err => notificationService.error(err));


  }, []);


  async function getCompany() {

    const com = (await companiesService.fetchCompanyProfile(companyId));

    return com;
  }


  return (
    <div className="ComapnyCard">

      <div className="containerComapny">
        <div className="cardComapny">
          <div className="slideComapny slide1">
            <div className="contentComapny">
              <div className="iconComapny">
                <i className="user-circleCompany" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div className="slideComapny slide2">
            <div className="contentComapny">
              <span>Company Name: {company && company.name}</span> <br /> <br />
              <span>Email: {company && company.email}</span>  <br /> <br />
              <span>Company ID: {company && company.id}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ComapnyCard;
