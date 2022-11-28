import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyRegistration.css";

function CompanyRegistration(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CompanyModel>();
    const navigate = useNavigate();

    async function send(company: CompanyModel) {
        try {
            await authService.regiterCompany(company);
            notificationService.success("Welcome! " + company.name);
            navigate("/home");

        }
        catch (err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="CompanyRegistration">

            <div className="companyRegister-box">
                <h2>Register to our System</h2>
                <form onSubmit={handleSubmit(send)}>
                    <div className="company-box">

                        <input className="input" type="name" placeholder="Name" required  {...register("name")} />

                    </div>

                    <div className="company-box">

                        <input className="input" type="email" placeholder="Email" required  {...register("email")} />

                    </div>

                    <div className="company-box">

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

export default CompanyRegistration;
