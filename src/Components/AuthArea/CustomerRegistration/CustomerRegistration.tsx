import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerRegistration.css";

function CustomerRegistration(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CustomerModel>();
    const navigate = useNavigate();

    async function send(customer: CustomerModel) {
        try {
            await authService.regiterCustomer(customer);
            notificationService.success("Welcome! " + customer.firstName + " " + customer.lastName);
            navigate("/home");

        }
        catch (err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="CustomerRegistration">

            <div className="customerRegister-box">
                <h2>Register to our System</h2>
                <form onSubmit={handleSubmit(send)}>
                    <div className="customer-box">


                        <input className="input" type="name" placeholder="First Name" required  {...register("firstName")} />

                    </div>
                    <div className="customer-box">

                        <input className="input" type="name" placeholder="Last Name" required  {...register("lastName")} />

                    </div>


                    <div className="customer-box">

                        <input className="input" type="email" placeholder="Email" required  {...register("email")} />

                    </div>

                    <div className="customer-box">

                        <input className="input" type="password" placeholder="Password" required {...register("password")} /> <br /> <br />

                    </div>

                    <button >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CustomerRegistration;
