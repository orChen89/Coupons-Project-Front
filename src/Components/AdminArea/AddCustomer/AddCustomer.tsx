import { useForm } from "react-hook-form";
import { AiFillFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CustomerModel>();

    const navigate = useNavigate();

    async function send(customer: CustomerModel) {

        try {
            await adminService.addCustomer(customer);
            notificationService.success(customer.firstName + " has been added!")
            navigate("/admin/customers");

        }
        catch (err: any) {
            notificationService.error(err);
        }
    }
    function back() {
        navigate("/admin/customers");
    }

    return (
        <div className="AddCustomer">

            <form onSubmit={handleSubmit(send)}>

                <h2>Create New Customer</h2>

                <label>First Name: </label>
                <input type="text" {...register("firstName", {
                    required: {
                        value: true,
                        message: "Missing customer first name!"
                    },
                    minLength: { value: 2, message: "First name must be minimum 2 chars" },
                    maxLength: { value: 20, message: "Name can't exceed 20 chars!" }
                })} />
                <span>{formState.errors?.firstName?.message}</span> <br />

                <label>Last Name: </label>
                <input type="text" {...register("lastName", {
                    required: {
                        value: true,
                        message: "Missing customer last name!"
                    },
                    minLength: { value: 2, message: "Last name must be minimum 2 chars" },
                    maxLength: { value: 20, message: "Name can't exceed 20 chars!" }
                })} />
                <span>{formState.errors?.lastName?.message}</span> <br />

                <label>Email: </label>
                <input type="email" {...register("email", {
                    required: {
                        value: true,
                        message: "Missing Email!"
                    },
                })} />
                <span>{formState.errors?.email?.message}</span> <br />

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing password!" },
                    minLength: { value: 5, message: "Password must be minimum 5 chars" },
                })} />
                <span>{formState.errors?.password?.message}</span> <br />

                <button className="addCustomerButton"><AiFillFileAdd /></button>

                <button className="customerBack" onClick={back}>Back</button>

            </form>

        </div>
    );
}

export default AddCustomer;
