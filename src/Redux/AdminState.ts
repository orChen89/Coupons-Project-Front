import { createStore } from "redux";
import { CompanyModel, CustomerModel } from "../Models/UserModel";

export class AdminState {

    public companies: CompanyModel[] = [];
    public customers: CustomerModel[] = [];
    public company: CompanyModel;
    public customer: CustomerModel;

}

export enum AdminActionType {

    FetchAllCompanies = "FetchAllCompanies",
    FetchAllCustomers = "FetchAllCustomers",
    AddCompany = "AddCompany",
    AddCustomer = "AddCustomer",
    UpdateCompany = "UpdateCompany",
    DeleteCompany = "DeleteCompany",
    UpdateCustomer = "UpdateCustomer",
    DeleteCustomer = "DeleteCustomer",

}

export interface AdminAction {

    type: AdminActionType;
    payload: any;

}

export function fetchAllCompaniesAction(companies: CompanyModel[]): AdminAction {
    return { type: AdminActionType.FetchAllCompanies, payload: companies };
}

export function fetchAllCustomersAction(customers: CustomerModel[]): AdminAction {
    return { type: AdminActionType.FetchAllCustomers, payload: customers };
}

export function addCompanyAction(company: CompanyModel): AdminAction {
    return { type: AdminActionType.AddCompany, payload: company };
}

export function addCustomerAction(customer: CustomerModel): AdminAction {
    return { type: AdminActionType.AddCustomer, payload: customer };
}

export function updateCompanyAction(company: CompanyModel): AdminAction {
    return { type: AdminActionType.UpdateCompany, payload: company };
}

export function updateCustomerAction(customer: CustomerModel): AdminAction {
    return { type: AdminActionType.UpdateCustomer, payload: customer };
}

export function deleteCompanyAction(companyId: number): AdminAction {
    return { type: AdminActionType.DeleteCompany, payload: companyId };
}

export function deleteCustomerAction(customerId: number): AdminAction {
    return { type: AdminActionType.DeleteCustomer, payload: customerId };
}


export function AdminReducer(currentState = new AdminState(), action: AdminAction): AdminState {
    const newState = { ...currentState };

    switch (action.type) {

        case AdminActionType.FetchAllCompanies:
            newState.companies = action.payload;
            break;

        case AdminActionType.FetchAllCustomers:
            newState.customers = action.payload;
            break;

        case AdminActionType.AddCompany:

            newState.companies.push(action.payload);
            break;

        case AdminActionType.AddCustomer:

            newState.customers.push(action.payload);
            break;

        case AdminActionType.UpdateCompany:

            const indexToUpdateCompany = newState.companies.findIndex(c => c.id === action.payload.id);
            if (indexToUpdateCompany >= 0) newState.companies[indexToUpdateCompany] = action.payload;
            break;

        case AdminActionType.UpdateCustomer:

            const indexToUpdateCustomer = newState.customers.findIndex(c => c.id === action.payload.id);
            if (indexToUpdateCustomer >= 0) newState.customers[indexToUpdateCustomer] = action.payload;
            break;

        case AdminActionType.DeleteCompany:
            const indexToDeleteCompany = newState.companies.findIndex(c => c.id === action.payload);
            if (indexToDeleteCompany >= 0) newState.companies.splice(indexToDeleteCompany, 1);

            break;

        case AdminActionType.DeleteCompany:
            const indexToDeleteCustomer = newState.customers.findIndex(c => c.id === action.payload);
            if (indexToDeleteCustomer >= 0) newState.customers.splice(indexToDeleteCustomer, 1);

            break;

    }

    return newState;
}

export const adminStore = createStore(AdminReducer);