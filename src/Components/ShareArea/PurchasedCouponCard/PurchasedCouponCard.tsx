import CouponModel from "../../../Models/CouponModel";
import "./PurchasedCouponCard.css";
import couponImage from "..//..//..//Assets/Image/coupons-icon-png.png"

interface CouponCardProps {

  coupon: CouponModel;

 }

function PurchasedCouponCard(props: CouponCardProps): JSX.Element {

  return (

    <div className="PurchasedCouponCard">
      <div className="containerPurchased">
        <div className="cardPurchased">
          <div className="imgBxPurchased">
            <img src={props.coupon.imageUrl} />
          </div>
          <img className="PurchasedCouponLogo" src={couponImage}></img>
          <div className="contentBxPurchased">
            <h2 className="titlePurchased">{props.coupon.title}</h2>  <br />
            <div className="priceBasic"><h3>${props.coupon.price}</h3></div>
            <div className="datesPurchased">
              <h3></h3>
              <span>{props.coupon.startDate}</span>
              <span>{props.coupon.endDate}</span>
            </div>
            <div className="otherPurchased">
              <div ><h3>{props.coupon.description}</h3> </div> <br />   <br />
            </div>
            <div className="amountPurchased"><h3>Amount: {props.coupon.amount}</h3></div>  <br />
            <h2 className="categoryPurchased">Category: {props.coupon.category}</h2>
          </div>
        </div>
      </div>
    </div>

  );
}


export default PurchasedCouponCard;

