import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CouponsWrapper from "../Models/CouponsWrapper";
import { CustomerModel } from "../Models/UserModel";
import { couponStore, updateFromAllCouponAction } from "../Redux/CouponState";
import { buyCouponsAction, customerStore, fetchCouponsAction, fetchCustomerAction } from "../Redux/CustomersState";
import appConfig from "../Utils/Config";

class CustomerService {

    public async fetchMyCoupons(customerId: number): Promise<CouponModel[]> {
        let coupons = customerStore.getState().coupons;
        if (coupons.length === 0) {
            const response = await axios.get<CouponsWrapper>(appConfig.customersMyCouponsUrl + customerId);
            coupons = response.data.couponDtoList;
            customerStore.dispatch(fetchCouponsAction(coupons));
        }
        return coupons;
    }

    public async buyCoupon(customerId: number, couponId: number): Promise<CouponModel> {

        const response = await axios.post<CouponModel>(appConfig.customersBuyCouponUrl + customerId + "/" + couponId);
        const coupon = response.data;
        customerStore.dispatch(buyCouponsAction(coupon));
        couponStore.dispatch(updateFromAllCouponAction(coupon));
        return coupon;
    }

    public async fetchCustomerProfile(customerId: number): Promise<CustomerModel> {
        let customerProfile = customerStore.getState().customer;
        if (!customerProfile) {
            const response = await axios.get<CustomerModel>(appConfig.getCustomerUrl + customerId);
            customerProfile = response.data;
            customerStore.dispatch(fetchCustomerAction(customerProfile));
        }

        return customerProfile;
    }

    public async fetchCustomersBack(customerId: number): Promise<CouponModel[]> {

        const response = await axios.get<CouponsWrapper>(appConfig.customersMyCouponsUrl + customerId);
        const coupons = response.data.couponDtoList;
        customerStore.dispatch(fetchCouponsAction(coupons));
        return coupons;
    }
}

const customerService = new CustomerService();

export default customerService;