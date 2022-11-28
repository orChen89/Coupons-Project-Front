import { useForm } from "react-hook-form";
import { AiFillFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CompanyModel>();

    const navigate = useNavigate();

    async function send(company: CompanyModel) {

        try {
            await adminService.addCompany(company);
            notificationService.success(company.name + " has been added!")
            navigate("/admin/companies");

        }
        catch (err: any) {
            notificationService.error(err);
        }
    }
    function back() {
        navigate("/admin/companies");
    }

    return (
        <div className="AddCompany">

            <form onSubmit={handleSubmit(send)}>

                <h2>Create New Company</h2>

                <label>Name: </label>
                <input type="text" {...register("name", {
                    required: {
                        value: true,
                        message: "Missing company name!"
                    },
                    minLength: { value: 3, message: "Name must be minimum 3 chars" },
                    maxLength: { value: 20, message: "Name can't exceed 20 chars!" }
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

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing password!" },
                    minLength: { value: 5, message: "Password must be minimum 5 chars" },
                })} />
                <span>{formState.errors?.password?.message}</span> <br />

                <button className="addCompanyButton"><AiFillFileAdd /></button>

                <button className="companyBack" onClick={back}>Back</button>

            </form>

        </div>
    );
}

export default AddCompany;
