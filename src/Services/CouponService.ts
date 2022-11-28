import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CouponsWrapper from "../Models/CouponsWrapper";
import { couponStore, fetchAllCouponsAction } from "../Redux/CouponState";
import appConfig from "../Utils/Config";

class CouponService {

    public async fetchAllCoupons(): Promise<CouponModel[]> {


        if (couponStore.getState().coupons.length === 0) {

            const response = await axios.get<CouponsWrapper>(appConfig.allCouponsUrl);
            let coupons = response.data.couponDtoList;

            couponStore.dispatch(fetchAllCouponsAction(coupons));

            return coupons;
        }
        return couponStore.getState().coupons;
    }
}

const couponService = new CouponService();

export default couponService;