import { SyntheticEvent, useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import { customerStore } from "../../../Redux/CustomersState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import PurchasedCouponCard from "../../ShareArea/PurchasedCouponCard/PurchasedCouponCard";
import "./CustomerCoupons.css";

function CustomerCoupons(): JSX.Element {

    const [originalcoupons, setOriginalCoupons] = useState<CouponModel[]>([]);
    const [coupons, setCoupons] = useState<CouponModel[]>([]);


    useEffect(() => {
        const customerId = authStore.getState().user.id;
        customerService.fetchMyCoupons(customerId).
            then(coupons => {
                setOriginalCoupons([...coupons]);
                setCoupons([...coupons]);

            })
            .catch(err => notificationService.error(err));

    }, [])

    useEffect(() => {

        setCoupons(customerStore.getState().coupons);
        const unSubscribe = customerStore.subscribe(() => {
            const duplicatedCartCoupons = [...customerStore.getState().coupons];
            setCoupons(duplicatedCartCoupons);

        });

        return () => {
            unSubscribe();
        }

    }, []);

    function filterByPrice(args: SyntheticEvent) {

        const input = args.target as HTMLInputElement;
        const maxPrice = +input.value;
        if (input.value === "") {
            setCoupons(originalcoupons);
            const filteredCoupons = coupons.filter(c => c.price <= maxPrice);
            setCoupons(filteredCoupons);
        } else {

            const filteredCoupons = originalcoupons.filter(c => c.price <= maxPrice);
            setCoupons(filteredCoupons);
        }
    }

    function filterByCategory(args: SyntheticEvent) {
        const select = args.target as HTMLSelectElement;
        const category = select.value;
        const filteredCoupons = originalcoupons.filter(c => c.category === category);

        setCoupons(filteredCoupons);

    }

    return (

        <div className="CustomerCoupons">

            <br /> <br />

            <div className="filter">

                <label className="filterPrice">Filter by Price: <input type="number" onChange={filterByPrice} /></label>

                <label className="filterCategory">Filter by Category: &nbsp;
                    <select className="categories" defaultValue="" onChange={filterByCategory}>

                        <option disabled value="">Select Category</option>
                        <option>FOOD</option>
                        <option>ELECTRICITY</option>
                        <option>VACATION</option>
                        <option>FASHION</option>
                        <option>FURNITURE</option>
                        <option>COMPUTERS</option>
                        <option>MEDICINE</option>

                    </select></label>
            </div>

            <br /> <br />

            <div >

                {coupons.map(c => <PurchasedCouponCard key={c.id} coupon={c} />)}

            </div>

        </div>
    );
}

export default CustomerCoupons;



