import CouponModel from "../../../Models/CouponModel";
import "./CouponCard.css";
import couponImage from "..//..//..//Assets/Image/coupons-icon-png.png"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import { addToCartAction, cartStore } from "../../../Redux/CartState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import Role from "../../../Models/Role";

interface CouponCardProps {

  coupon: CouponModel;

}

function CouponCard(props: CouponCardProps): JSX.Element {

  const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    if (authStore.getState().token && authStore.getState().user.role === Role.Customer) {
      customerService.fetchMyCoupons(authStore.getState().user.id).then(c => setCustomerCoupons(c)).
        catch(err => notificationService.error(err));
    }
  }, []);


  async function addToCart() {

    const cartList = cartStore.getState().cartList;

    const customerCouponsResult = (await customerCoupons).some(element => {
      if (element.id === props.coupon.id) {
        return true;
      } else {
        return false;
      }
    });

    const cartResult = cartList.some(coupon => {
      if (coupon.id === props.coupon.id) {
        return true;
      }
      return false;
    });


    if (customerCouponsResult) {
      notificationService.error("You have already purchased this coupon!");

    } else if (props.coupon.amount === 0) {
      notificationService.error("'" + props.coupon.title + "'" + " is out of stock!");
    }

    else if (!cartResult) {
      notificationService.success("'" + props.coupon.title + "'" + " has been added to your cart!");
      cartStore.dispatch(addToCartAction(props.coupon));
    }

    else {
      notificationService.error("You have already added  " + "'" + props.coupon.title + "'" + " to your cart!");
    }
  }

  return (

    <div className="CouponCard">
      <div className="container">
        <div className="card">
          <div className="imgBx">
            <img src={props.coupon.imageUrl} />
          </div>
          <img className="cardCouponLogo" src={couponImage}></img>
          <div className="contentBx">

            <h2 className="titleBasic">{props.coupon.title}</h2>  <br />
            <div className="priceBasic"><h3>${props.coupon.price}</h3></div>

            <div className="datesBasic">
              <h3></h3>
              <span>{props.coupon.startDate}</span>
              <span>{props.coupon.endDate}</span>
            </div>
            <div className="otherBasic">
              <h3>{props.coupon.description}</h3> <br /> <br />
            </div>
            <div className="amountBasic"><h3>Amount: {props.coupon.amount}</h3></div>
            {authStore.getState().token && authStore.getState().user.role === Role.Customer && <>
              <NavLink onClick={addToCart} to="/coupons" className="addtoCart">Add to cart</NavLink>
            </>}
            {!(authStore.getState().token) && <>
              <NavLink to={"/login"} className="addtoCart">Add To Cart</NavLink>
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponCard;

