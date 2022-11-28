import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./EditCustomer.css";

function EditCustomer(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<CustomerModel>();

    const navigate = useNavigate();

    const params = useParams();
    const id = +params.customerId;

    useEffect(() => {
        adminService.fetchOneCustomer(id)
            .then(customer => {
                setValue("firstName", customer.firstName);
                setValue("lastName", customer.lastName);
                setValue("email", customer.email);                

            })
            .catch(err => notificationService.error(err));
    }, [])


    async function send(customer: CustomerModel) {
        try {
            customer.id = id;
            await adminService.updateCustomer(customer);
            notificationService.success("Customer has been updated!")
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
        <div className="EditCustomer">

            <div className="totalEditCustomer">

                <form onSubmit={handleSubmit(send)}>

                    <h2>Edit Customer</h2>

                    <label>First name: </label>
                    <input type="text" {...register("firstName", {
                        required: {
                            value: true,
                            message: "Missing customer first name!"
                        },
                        minLength: { value: 2, message: "First name must be minimum 3 chars" },
                        maxLength: { value: 20, message: "First name can't exceed 20 chars!" }
                    })} />
                    <span>{formState.errors?.name?.message}</span> <br />

                    <label>Last name: </label>
                    <input type="text" {...register("lastName", {
                        required: {
                            value: true,
                            message: "Missing customer last name!"
                        },
                        minLength: { value: 2, message: "Last name must be minimum 3 chars" },
                        maxLength: { value: 20, message: "Last name can't exceed 20 chars!" }
                    })} />
                    <span>{formState.errors?.name?.message}</span> <br />

                    <label>Email: </label>
                    <input type="email" {...register("email", {
                        required: {
                            value: true,
                            message: "Missing Email!"
                        },
                    })} />
                    <span>{formState.errors?.email?.message}</span> <br />

                    <button className="updateButtonCustomer">Update</button>

                    <button className="backButtonCustomer" onClick={back}>Back</button>

                </form>
            </div>

        </div>
    );
}

export default EditCustomer;
