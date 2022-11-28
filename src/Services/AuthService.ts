import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import JwtWrapper from "../Models/JwtWrapper";
import { CompanyModel, CustomerModel } from "../Models/UserModel";
import { addCompanyAction, addCustomerAction, adminStore, fetchAllCompaniesAction, fetchAllCustomersAction } from "../Redux/AdminState";
import { authStore, loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import { customerStore, fetchCouponsAction } from "../Redux/CustomersState";
import appConfig from "../Utils/Config";

class AuthService {

    public async login(credentials: CredentialsModel): Promise<void> {

        const respone = await axios.post<JwtWrapper>(appConfig.loginUrl, credentials);
        const token = respone.data.jwt;
        authStore.dispatch(loginAction(token));
    }

    public async regiterCompany(comapny: CompanyModel): Promise<void> {

        const respone = await axios.post<JwtWrapper>(appConfig.registerCompanyUrl, comapny);
        const token = respone.data.jwt;
        authStore.dispatch(registerAction(token));
        adminStore.dispatch(addCompanyAction(comapny));
    }

    public async regiterCustomer(customer: CustomerModel): Promise<void> {

        const respone = await axios.post<JwtWrapper>(appConfig.registerCustomerUrl, customer);
        const token = respone.data.jwt;
        authStore.dispatch(registerAction(token));
        adminStore.dispatch(addCustomerAction(customer));
    }

    public logout(): void {
        authStore.dispatch(logoutAction());
        customerStore.dispatch(fetchCouponsAction([]));
        adminStore.dispatch(fetchAllCustomersAction([]));
        adminStore.dispatch(fetchAllCompaniesAction([]));
    }
}

const authService = new AuthService();

export default authService;