import axios from "axios";
import CompaniesListWrapper from "../Models/CompaniesListWrapper";
import CustomersListWrapper from "../Models/CustomersListWrapper";
import { CompanyModel, CustomerModel } from "../Models/UserModel";
import { addCompanyAction, addCustomerAction, adminStore, deleteCompanyAction, deleteCustomerAction, fetchAllCompaniesAction, fetchAllCustomersAction, updateCompanyAction, updateCustomerAction } from "../Redux/AdminState";
import appConfig from "../Utils/Config";

class AdminService {

    public async fetchAllCompanies(): Promise<CompanyModel[]> {

        let companies = adminStore.getState().companies;
        if (companies.length === 0) {
            const response = await axios.get<CompaniesListWrapper>(appConfig.getAllCompaniesUrl);
            companies = response.data.companyDtoList;
            adminStore.dispatch(fetchAllCompaniesAction(companies));
        }
        return companies;
    }

    public async fetchAllCustomers(): Promise<CustomerModel[]> {

        let customers = adminStore.getState().customers;
        if (customers.length === 0) {
            const response = await axios.get<CustomersListWrapper>(appConfig.getAllCustomersUrl);
            customers = response.data.customerDtoList;
                       adminStore.dispatch(fetchAllCustomersAction(customers));
           
        }
        return customers;
    }

    public async fetchOneCompany(companyId: number): Promise<CompanyModel> {

        const oneCompany = adminStore.getState().companies.find(c => c.id === companyId);

        return oneCompany;
    }

    public async fetchOneCustomer(customerId: number): Promise<CustomerModel> {

        const oneCustomer = adminStore.getState().customers.find(c => c.id === customerId);

        return oneCustomer;
    }

    public async addCompany(company: CompanyModel): Promise<void> {

        const formData = new FormData();

        formData.append("name", company.name);
        formData.append("email", company.email);
        formData.append("password", company.password);

        const response = await axios.post<CompanyModel>(appConfig.createCompanyUrl, company)
        const addedCompany = response.data;
        adminStore.dispatch(addCompanyAction(addedCompany));
    }

    public async addCustomer(customer: CustomerModel): Promise<void> {

        const formData = new FormData();

        formData.append("firstName", customer.firstName);
        formData.append("lastName", customer.lastName);
        formData.append("email", customer.email);
        formData.append("password", customer.password);

        const response = await axios.post<CustomerModel>(appConfig.createCustomerUrl, customer)
        const addedCustomer = response.data;
        adminStore.dispatch(addCustomerAction(addedCustomer));
    }

    public async deleteCompany(companyId: number): Promise<void> {
        await axios.delete<CompanyModel>(appConfig.deleteCompanyUrl + companyId);
        adminStore.dispatch(deleteCompanyAction(companyId));
    }

    public async deleteCustomer(customerId: number): Promise<void> {
        await axios.delete<CustomerModel>(appConfig.deleteCustomerUrl + customerId);
        adminStore.dispatch(deleteCustomerAction(customerId));
    }

    public async updateCompany(company: CompanyModel): Promise<void> {

        const formData = new FormData();

        formData.append("name", company.name);
        formData.append("email", company.email);
        formData.append("password", company.password);

        await axios.put<CompanyModel>(appConfig.createCompanyUrl, company);
        adminStore.dispatch(updateCompanyAction(company));

    }
    public async updateCustomer(customer: CustomerModel): Promise<void> {

        const formData = new FormData();

        formData.append("firstName", customer.firstName);
        formData.append("lastName", customer.lastName);
        formData.append("email", customer.email);
        formData.append("password", customer.password);

        await axios.put<CompanyModel>(appConfig.createCustomerUrl, customer);
        adminStore.dispatch(updateCustomerAction(customer));

    }

}
const adminService = new AdminService();

export default adminService;