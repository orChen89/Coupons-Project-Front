import { StringLiteral } from "typescript";
import CouponModel from "./CouponModel";
import Role from "./Role";

export abstract class BaseUserModel {

    public id: number;
    public name: string;
    public email: string;
    public role: Role;
    public password: string;

}

export class CustomerModel extends BaseUserModel {

    public firstName: string;
    public lastName: string;
    public coupons: CouponModel[];

}

export class CompanyModel extends BaseUserModel {

    public name: string;
    public coupons: CouponModel[];

}

export class AdminModel extends BaseUserModel {

    public firstName: string;
    public lastName: string;

}


