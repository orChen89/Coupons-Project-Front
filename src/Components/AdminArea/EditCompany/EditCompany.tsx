import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./EditCompany.css";

function EditCompany(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<CompanyModel>();

    const navigate = useNavigate();

    const params = useParams();
    const id = +params.companyId;

    useEffect(() => {
        adminService.fetchOneCompany(id)
            .then(company => {
                setValue("name", company.name);
                setValue("email", company.email);               

            })
            .catch(err => notificationService.error(err));
    }, [])


    async function send(company: CompanyModel) {
        try {
            company.id = id;
            await adminService.updateCompany(company);
            notificationService.success("Company has been updated!")
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
        <div className="EditCompany">

            <div className="totalEditCompany">

                <form onSubmit={handleSubmit(send)}>

                    <h2>Edit Company</h2>

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

                    <button className="updateButtonCompany">Update</button>

                    <button className="backButtonCompany" onClick={back}>Back</button>

                </form>
            </div>
        </div>
    );
}

export default EditCompany;
