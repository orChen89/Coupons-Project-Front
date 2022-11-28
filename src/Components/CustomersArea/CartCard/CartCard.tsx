import CouponModel from "../../../Models/CouponModel";
import "./CartCard.css";
import cartImage from "..//..//..//Assets/Image/shopping-cart.jpg"
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import { authStore } from "../../../Redux/AuthState";
import { cartStore, RemoveFromCartAction } from "../../../Redux/CartState";
import { useNavigate } from "react-router-dom";

interface CouponCardProps {

    coupon: CouponModel;

}

function CartCard(props: CouponCardProps): JSX.Element {

    const navigate = useNavigate();

    const customerId = authStore.getState().user.id;
    const couponId = props.coupon.id;


    function removeFromCart() {
        cartStore.dispatch(RemoveFromCartAction(props.coupon.id));
    }

    async function buyCoupon() {

        try {
            await customerService.buyCoupon(customerId, couponId);
            notificationService.success(props.coupon.title + " has been purchased");
            removeFromCart();            

        } catch (err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="CartCard">

            <div className="item">
                <img src={props.coupon.imageUrl} />
                <h2 >{props.coupon.title}</h2>
                <p>Price: <em>${props.coupon.price}</em>
                </p>
                <button className="purchase" type="button" onClick={buyCoupon}>Purchase</button>
                <button className="remove" type="button" onClick={removeFromCart}>Remove</button>
            </div>
            <div>
                <img className="cartImg" src={cartImage} />
            </div>
        </div>
    );
}

export default CartCard;
