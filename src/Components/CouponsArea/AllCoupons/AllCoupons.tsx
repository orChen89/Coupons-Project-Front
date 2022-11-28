import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { couponStore } from "../../../Redux/CouponState";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../ShareArea/CouponCard/CouponCard";
import "./AllCoupons.css";

function AllCoupons(): JSX.Element {

    let [coupons, setCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {

        couponService.fetchAllCoupons().then(coupons => setCoupons(coupons)).
            catch(err => notificationService.error(err));


    }, []);

    useEffect(() => {

        setCoupons(couponStore.getState().coupons);
        const unSubscribe = couponStore.subscribe(() => {
            const duplicatedCoupons = [...couponStore.getState().coupons];
            setCoupons(duplicatedCoupons);

        });

        return () => {
            unSubscribe();
        }

    }, []);

    return (
        <div className="AllCoupons">

            <section>

                {coupons.map(c => <CouponCard key={c.id} coupon={c} />)}

            </section>

        </div>
    );
}

export default AllCoupons;
