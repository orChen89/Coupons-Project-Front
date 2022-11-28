import { createStore } from "redux";
import CouponModel from "../Models/CouponModel"

export class CouponState {

    public coupons: CouponModel[] = [];

}

export enum CouponActionType {

    FetchAllCoupons = "FetchAllCoupons",
    AddCoupon = "AddCoupon",
    DeleteCoupon = "DeleteCoupon",
    UpdateCoupon = "UpdateCoupon"

}

export interface CouponAction {

    type: CouponActionType;
    payload: any;

}

export function fetchAllCouponsAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponActionType.FetchAllCoupons, payload: coupons };
}

export function addNewCouponAction(coupon: CouponModel): CouponAction {
    return { type: CouponActionType.AddCoupon, payload: coupon };
}

export function deleteFromAllCouponAction(couponId: number): CouponAction {
    return { type: CouponActionType.DeleteCoupon, payload: couponId };
}

export function updateFromAllCouponAction(coupon: CouponModel): CouponAction {
    return { type: CouponActionType.UpdateCoupon, payload: coupon };
}


export function couponsReducer(currentState = new CouponState(), action: CouponAction): CouponState {
    const newState = { ...currentState };

    switch (action.type) {

        case CouponActionType.FetchAllCoupons:

            newState.coupons = action.payload;

            break;

        case CouponActionType.AddCoupon:

            newState.coupons.push(action.payload);

            break;

        case CouponActionType.DeleteCoupon:

            const indexToDelete = newState.coupons.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) newState.coupons.splice(indexToDelete, 1)

            break;

        case CouponActionType.UpdateCoupon:

            const indexToUpdate = newState.coupons.findIndex(c => c.id === action.payload.id)
            if (indexToUpdate >= 0) newState.coupons[indexToUpdate] = action.payload;

            break;
    }

    return newState;
}

export const couponStore = createStore(couponsReducer);