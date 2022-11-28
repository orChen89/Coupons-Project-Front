import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

function Login(): JSX.Element {


    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notificationService.success("Welcome Back " + credentials.email);
            navigate("/home");

        }
        catch (err: any) {
            notificationService.error("Email or Password are Incorrect");
        }
    }

    return (
        <div className="Login">

            <div className="login-box">
                <h2>Login to System</h2>
                <form onSubmit={handleSubmit(send)}>
                    <div className="user-box">
                        <input type="email" name="" required {...register("email")} />
                        <label><MdEmail className="emailIcon" /> Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="" required {...register("password")} />
                        <label><RiLockPasswordFill className="passwordIcon" /> Password</label>
                    </div>
                    <button >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </form>
                <div>

                    <h3 className="didntSign">Didn't register yet to our website? </h3>

                    <NavLink className="signInButton" to={'/registration'}><button>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Sign Up</button> </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Login;
