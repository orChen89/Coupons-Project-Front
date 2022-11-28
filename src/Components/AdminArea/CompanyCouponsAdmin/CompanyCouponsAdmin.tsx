import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { companyStore } from "../../../Redux/CompanyState";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import CompanyCouponCard from "../../ShareArea/CompanyCouponCard/CompanyCouponCard";
import "./CompanyCouponsAdmin.css";

function CompanyCouponsAdmin(): JSX.Element {

  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  const params = useParams();
  const companyId = +params.companyId;

  useEffect(() => {
    companiesService.fetchCompaniesCouponsBack(companyId).then(coupons => setCoupons(coupons)).
      catch(err => notificationService.error(err));

  }, []);

  useEffect(() => {

    setCoupons(companyStore.getState().coupons);
    const unSubscribe = companyStore.subscribe(() => {
      const duplicatedCoupons = [...companyStore.getState().coupons];
      setCoupons(duplicatedCoupons);

    });

    return () => {
      unSubscribe();
    }

  }, []);

  return (
    <div className="CompanyCouponsAdmin">

      <div>

        {coupons.map(c => <CompanyCouponCard key={c.id} coupon={c} />)}

      </div>

    </div>
  );
}

export default CompanyCouponsAdmin;
