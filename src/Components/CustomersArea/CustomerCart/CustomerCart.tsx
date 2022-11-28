import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { cartStore } from "../../../Redux/CartState";
import CartCard from "../CartCard/CartCard";
import "./CustomerCart.css";

function CustomerCart(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {

        setCoupons(cartStore.getState().cartList);
        const unSubscribe = cartStore.subscribe(() => {
            const duplicatedCartCoupons = [...cartStore.getState().cartList];
            setCoupons(duplicatedCartCoupons);

        });

        return () => {
            unSubscribe();
        }

    }, []);


    return (
        <div className="CustomerCart">

            <h1>My Cart</h1>

            <div>

                {coupons.map(c => <CartCard key={c.id} coupon={c} />)}

            </div>

        </div>
    );
}

export default CustomerCart;
