import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { customerStore } from "../../../Redux/CustomersState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import PurchasedCouponCard from "../../ShareArea/PurchasedCouponCard/PurchasedCouponCard";
import "./CustomerCouponsAdmin.css";

function CustomerCouponsAdmin(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    const params = useParams();
    const customerId = +params.customerId;

    useEffect(() => {
        customerService.fetchCustomersBack(customerId).then(coupons => setCoupons(coupons)).
            catch(err => notificationService.error(err));

    }, []);

    useEffect(() => {

        setCoupons(customerStore.getState().coupons);
        const unSubscribe = customerStore.subscribe(() => {
            const duplicatedCoupons = [...customerStore.getState().coupons];
            setCoupons(duplicatedCoupons);

        });

        return () => {
            unSubscribe();
        }

    }, []);

    return (
        <div className="CustomerCouponsAdmin">

            <div>

                {coupons.map(c => <PurchasedCouponCard key={c.id} coupon={c} />)}

            </div>

        </div>
    );
}

export default CustomerCouponsAdmin;
