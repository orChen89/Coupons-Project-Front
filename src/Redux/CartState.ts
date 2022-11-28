import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CartsState {

    public cartList: CouponModel[] = [];

    public constructor() {

        const cart = JSON.parse(localStorage.getItem("cart"));

        if (cart) {
            this.cartList = cart;
        }
    }
}


export enum CartActionType {

    AddToCart = "AddToCart",
    RemoveFromCart = "RemoveFromCart",
    
}

export interface CartAction {

    type: CartActionType;
    payload: any;

}

export function addToCartAction(coupon: CouponModel): CartAction {
    return { type: CartActionType.AddToCart, payload: coupon };
}

export function RemoveFromCartAction(couponId: number): CartAction {
    return { type: CartActionType.RemoveFromCart, payload: couponId };
}

export function CartReducer(currentState = new CartsState(), action: CartAction): CartsState {
    const newState = { ...currentState };

    switch (action.type) {


        case CartActionType.AddToCart:

            newState.cartList.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(newState.cartList));
            break;

        case CartActionType.RemoveFromCart:
            const indexToDelete = newState.cartList.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) newState.cartList.splice(indexToDelete, 1);
            localStorage.setItem("cart", JSON.stringify(newState.cartList));
            break;
    }

    return newState;
}


export const cartStore = createStore(CartReducer);