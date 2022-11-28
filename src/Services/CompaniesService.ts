import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CouponsWrapper from "../Models/CouponsWrapper";
import { CompanyModel } from "../Models/UserModel";
import { addCouponAction, companyStore, deleteCouponAction, fetchCompanyAction, fetchCouponsAction, updateCouponAction } from "../Redux/CompanyState";
import { addNewCouponAction, couponStore, deleteFromAllCouponAction, updateFromAllCouponAction } from "../Redux/CouponState";

import appConfig from "../Utils/Config";

class CompaniesService {

    public async fetchCompaniesCoupons(companyId: number): Promise<CouponModel[]> {

        let coupons = companyStore.getState().coupons;
        if (coupons.length === 0) {
            const response = await axios.get<CouponsWrapper>(appConfig.companyCouponsUrl + companyId);
            coupons = response.data.couponDtoList;
            companyStore.dispatch(fetchCouponsAction(coupons));
        }
        return coupons;
    }

    public async fetchCompaniesCouponsBack(companyId: number): Promise<CouponModel[]> {

        const response = await axios.get<CouponsWrapper>(appConfig.companyCouponsUrl + companyId);
        const coupons = response.data.couponDtoList;
        companyStore.dispatch(fetchCouponsAction(coupons));

        return coupons;
    }

    public async fetchOneCoupon(id: number): Promise<CouponModel> {

        const oneCoupon = companyStore.getState().coupons.find(c => c.id === id);

        return oneCoupon;
    }

    public async addCoupon(coupon: CouponModel): Promise<void> {

        const formData = new FormData();

        formData.append("title", coupon.title);
        formData.append("companyId", coupon.companyId.toString());
        formData.append("category", coupon.category);
        formData.append("description", coupon.description);
        formData.append("startDate", coupon.startDate);
        formData.append("endDate", coupon.endDate);
        formData.append("amount", coupon.amount.toString());
        formData.append("price", coupon.price.toString());
        formData.append("imageUrl", coupon.imageUrl);

        const response = await axios.post<CouponModel>(appConfig.createCouponUrl, coupon)
        const addedCoupon = response.data;
        companyStore.dispatch(addCouponAction(addedCoupon));
        couponStore.dispatch(addNewCouponAction(addedCoupon));
    }

    public async deleteCoupon(id: number): Promise<void> {
        await axios.delete<CouponModel>(appConfig.couponDeletionUrl + id);
        companyStore.dispatch(deleteCouponAction(id));
        couponStore.dispatch(deleteFromAllCouponAction(id))
    }

    public async updateCoupon(coupon: CouponModel): Promise<void> {

        const formData = new FormData();

        formData.append("title", coupon.title);
        formData.append("companyId", coupon.companyId.toString());
        formData.append("category", coupon.category);
        formData.append("description", coupon.description);
        formData.append("startDate", coupon.startDate);
        formData.append("endDate", coupon.endDate);
        formData.append("amount", coupon.amount.toString());
        formData.append("price", coupon.price.toString());
        formData.append("imageUrl", coupon.imageUrl);

        await axios.put<CouponModel>(appConfig.createCouponUrl, coupon)

        companyStore.dispatch(updateCouponAction(coupon));
        couponStore.dispatch(updateFromAllCouponAction(coupon));
    }

    public async fetchCompanyProfile(companyId: number): Promise<CompanyModel> {
        let companyProfile = companyStore.getState().company;
        if (!companyProfile) {
            const response = await axios.get<CompanyModel>(appConfig.getCompanyrUrl + companyId);
            companyProfile = response.data;

            companyStore.dispatch(fetchCompanyAction(companyProfile));
        }

        return companyProfile;
    }
}
const companiesService = new CompaniesService();

export default companiesService;