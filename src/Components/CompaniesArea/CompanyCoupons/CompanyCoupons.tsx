import { SyntheticEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import { companyStore } from "../../../Redux/CompanyState";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import CompanyCouponCard from "../../ShareArea/CompanyCouponCard/CompanyCouponCard";
import "./CompanyCoupons.css";


function CompanyCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [originalcoupons, setOriginalCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {
        const companyId = authStore.getState().user.id;
        companiesService.fetchCompaniesCoupons(companyId).then(coupons => setCoupons(coupons)).
            catch(err => notificationService.error(err));

    }, []);


    useEffect(() => {
        const companyId = authStore.getState().user.id;
        companiesService.fetchCompaniesCoupons(companyId).
            then(coupons => {
                setOriginalCoupons([...coupons]);
                setCoupons([...coupons]);

            })
            .catch(err => notificationService.error(err));

    }, [])

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

        <div className="CompanyCoupons">

            <br /> <br />

            <div className="filterCompany">

                <label className="filterPriceCompany">Filter by Price: <input type="number" onChange={filterByPrice} /></label>

                <label className="filterCategoryCompany">Filter by Category: &nbsp;
                    <select className="categoriesCompany" defaultValue="" onChange={filterByCategory}>

                        <option disabled value="">Select Category</option>
                        <option>FOOD</option>
                        <option>ELECTRICITY</option>
                        <option>VACATION</option>
                        <option>FASHION</option>
                        <option>FURNITURE</option>
                        <option>COMPUTERS</option>
                        <option>MEDICINE</option>

                    </select></label>

                <NavLink className="add" to={'/create-coupon'}>Add Coupon</NavLink>
            </div>

            <br /> <br />

            <div>

                {coupons.map(c => <CompanyCouponCard key={c.id} coupon={c} />)}

            </div>

        </div>
    );
}

export default CompanyCoupons;
