import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";
import { CompanyModel } from "../Models/UserModel";

export class CompanyState {

    public coupons: CouponModel[] = [];
    public company: CompanyModel;

    public constructor() {

        const companyProfile = JSON.parse(localStorage.getItem("company"));

        if (companyProfile) {
            this.company = companyProfile;
        }
    }

}

export enum CompanyActionType {

    FetchCoupons = "FetchCoupons",
    AddCoupon = "AddCoupon",
    UpdateCoupon = "UpdateProduct",
    DeleteCoupon = "DeleteProduct",
    FetchCompanyProfile = "FetchCompanyProfile"

}

export interface CompanyAction {

    type: CompanyActionType;
    payload: any;

}

export function fetchCouponsAction(coupons: CouponModel[]): CompanyAction {
    return { type: CompanyActionType.FetchCoupons, payload: coupons };
}

export function addCouponAction(coupon: CouponModel): CompanyAction {
    return { type: CompanyActionType.AddCoupon, payload: coupon };
}

export function updateCouponAction(product: CouponModel): CompanyAction {
    return { type: CompanyActionType.UpdateCoupon, payload: product };
}

export function deleteCouponAction(id: number): CompanyAction {
    return { type: CompanyActionType.DeleteCoupon, payload: id };
}

export function fetchCompanyAction(company: CompanyModel): CompanyAction {
    return { type: CompanyActionType.FetchCompanyProfile, payload: company };
}


export function companyReducer(currentState = new CompanyState(), action: CompanyAction): CompanyState {
    const newState = { ...currentState };

    switch (action.type) {
        case CompanyActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;

        case CompanyActionType.AddCoupon:

            newState.coupons.push(action.payload);
            break;

        case CompanyActionType.UpdateCoupon:

            const indexToUpdate = newState.coupons.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) newState.coupons[indexToUpdate] = action.payload;
            break;

        case CompanyActionType.DeleteCoupon:
            const indexToDelete = newState.coupons.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) newState.coupons.splice(indexToDelete, 1);

            break;

        case CompanyActionType.FetchCompanyProfile:
            newState.company = action.payload;
            localStorage.setItem("company", JSON.stringify(newState.company));
            break;


    }

    return newState;
}

export const companyStore = createStore(companyReducer);