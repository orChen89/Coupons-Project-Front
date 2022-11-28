import { createStore } from "redux";
import CouponModel from "../Models/CouponModel"
import { CustomerModel } from "../Models/UserModel";

export class CustomersState {

    public coupons: CouponModel[] = [];
    public customer: CustomerModel;

    public constructor() {

        const customerProfile = JSON.parse(localStorage.getItem("customer"));

        if (customerProfile) {
            this.customer = customerProfile;
        }
    }

}

export enum CustomerActionType {

    FetchCoupons = "FetchCoupons",
    BuyCoupon = "BuyCoupon",
    AddToCart = "AddToCart",
    FetchCustomerProfile = "FetchCustomerProfile"

}

export interface CustomerAction {

    type: CustomerActionType;
    payload: any;

}

export function fetchCouponsAction(coupons: CouponModel[]): CustomerAction {
    return { type: CustomerActionType.FetchCoupons, payload: coupons };
}

export function buyCouponsAction(coupon: CouponModel): CustomerAction {
    return { type: CustomerActionType.BuyCoupon, payload: coupon };
}

export function fetchCustomerAction(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.FetchCustomerProfile, payload: customer };
}

export function customerReducer(currentState = new CustomersState(), action: CustomerAction): CustomersState {
    const newState = { ...currentState };

    switch (action.type) {

        case CustomerActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;

        case CustomerActionType.BuyCoupon:
            newState.coupons.push(action.payload);
            break;


        case CustomerActionType.FetchCustomerProfile:
            newState.customer = action.payload;
            localStorage.setItem("customer", JSON.stringify(newState.customer));
            break;

    }

    return newState;
}


export const customerStore = createStore(customerReducer);


