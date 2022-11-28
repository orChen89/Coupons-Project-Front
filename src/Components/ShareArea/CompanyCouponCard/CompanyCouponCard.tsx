import CouponModel from "../../../Models/CouponModel";
import "./CompanyCouponCard.css";
import couponImage from "..//..//..//Assets/Image/coupons-icon-png.png"
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import { NavLink } from "react-router-dom";

interface CouponCardProps {

  coupon: CouponModel;

}

function CompanyCouponCard(props: CouponCardProps): JSX.Element {

  const couponId = props.coupon.id;

  async function deleteCoupon() {

    try {
      const ok = window.confirm("Are you sure you wish to delete " + "'" + props.coupon.title + "'" + "?");
      if (!ok) return;
      await companiesService.deleteCoupon(couponId);
      notificationService.success(props.coupon.title + " has been deleted!");


    }
    catch (err: any) {
      notificationService.error(err);
    }

  }

  return (

    <div className="CompanyCouponCard">
      <div className="containerCompany">
        <div className="cardCompany">
          <div className="imgBxCompany">
            <img src={props.coupon.imageUrl} />
          </div>
          <img className="CompanyCouponLogo" src={couponImage}></img>
          <div className="contentBxCompany">
            <h2 className="titleCompany">{props.coupon.title}</h2>  <br />
            <div className="priceCompany"><h3>${props.coupon.price}</h3></div>
            <div className="datesCompany">
              <h3></h3>
              <span>{props.coupon.startDate}</span>
              <span>{props.coupon.endDate}</span>
            </div>
            <div className="otherCompany">
              <NavLink className="updateCoupon" to={"/edit-coupon/" + couponId}><AiFillEdit /></NavLink>
              <h3>{props.coupon.description}</h3>  <br />   <br />
              <button className="deleteCoupon" onClick={deleteCoupon}><MdDeleteForever /></button>
            </div>
            <div className="amountCompany"><h3>Amount: {props.coupon.amount}</h3></div>  <br />
            <h2 className="categoryCompany">Category: {props.coupon.category}</h2>
          </div>
        </div>
      </div>
    </div>

  );
}

export default CompanyCouponCard;

