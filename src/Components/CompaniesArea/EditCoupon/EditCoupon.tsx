import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import "./EditCoupon.css";


function EditCoupon(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<CouponModel>();

    const navigate = useNavigate();

    const params = useParams();
    const id = +params.couponId;


    useEffect(() => {
        companiesService.fetchOneCoupon(id)
            .then(coupon => {
                setValue("title", coupon.title);
                setValue("category", coupon.category);
                setValue("companyId", coupon.companyId);
                setValue("description", coupon.description);
                setValue("startDate", coupon.startDate);
                setValue("endDate", coupon.endDate);
                setValue("price", coupon.price);
                setValue("amount", coupon.amount);
                setValue("imageUrl", coupon.imageUrl);
            })
            .catch(err => notificationService.error(err));
    }, [])


    async function send(coupon: CouponModel) {
        try {
            coupon.id = id;
            await companiesService.updateCoupon(coupon);
            notificationService.success("Coupon has been updated!");
            if (authStore.getState().user.role === Role.Company) {
                navigate("/companies/company-coupons");
            }
            navigate("/company-coupons-admin/" + coupon.companyId);
        }
        catch (err: any) {
            notificationService.error(err);
        }
    }

    function back() {
        navigate("/companies/company-coupons");
    }

    return (
        <div className="EditCoupon">

            <div className="totalEdit">

                <form onSubmit={handleSubmit(send)}>

                    <h2>Edit Coupon</h2>

                    <label>Coupon title: </label>
                    <input type="text" {...register("title", {
                        required: {
                            value: true,
                            message: "Missing title!"
                        },
                        minLength: { value: 2, message: "Title must be minimum 2 chars" },
                        maxLength: { value: 1000, message: "Title can't exceed 100 chars!" }
                    })} />
                    <span>{formState.errors?.title?.message}</span> <br />


                    <label>Category: </label>
                    <select defaultValue="" {...register("category", {
                        required: {
                            value: true,
                            message: "Missing category!"
                        },
                    })} >

                        <option disabled value="">Select Category</option>
                        <option value={'FOOD'}>Food</option>
                        <option value={'ELECTRICITY'}>Electricity</option>
                        <option value={'VACATION'}>Vacation</option>
                        <option value={'FASHION'}>Fashion</option>
                        <option value={'FURNITURE'}>Furniture</option>
                        <option value={'COMPUTERS'}>Computers</option>
                        <option value={'MEDICINE'}>Medicine</option>
                    </select>
                    <span>{formState.errors?.category?.message}</span>  <br />

                    <label>Description: </label>
                    <input type="text" {...register("description", {
                        required: {
                            value: true,
                            message: "Missing description!"
                        },
                        minLength: { value: 5, message: "Description must be minimum 5 chars" },
                        maxLength: { value: 1000, message: "Description can't exceed 100 chars!" }
                    })} />
                    <span>{formState.errors?.description?.message}</span> <br />

                    <label>Start Date: </label>
                    <input type="date" {...register("startDate", {
                        required: { value: true, message: "Missing start date!" },
                    })} />
                    <span>{formState.errors?.startDate?.message}</span> <br />

                    <label>End Date: </label>
                    <input type="date" {...register("endDate", {
                        required: { value: true, message: "Missing end date!" },
                    })} />
                    <span>{formState.errors?.endDate?.message}</span> <br />

                    <label>Price: </label>
                    <input type="number" step="0.01"  {...register("price", {
                        valueAsNumber: true,
                        required: {
                            value: true,
                            message: "Missing price!"
                        },
                        min: { value: 0, message: "Please enter a positive amount" },
                        max: { value: 100000, message: "Price can't exceed 100000" }
                    })} />
                    <span>{formState.errors?.price?.message}</span>

                    <label>Amount: </label>
                    <input type="number" step="0" {...register("amount", {
                        valueAsNumber: true,
                        required: {
                            value: true,
                            message: "Missing amount!"
                        },
                        min: { value: 0, message: "Stock can't be negative" },
                        max: {
                            value: 100000, message: "Stock can't exceed 100000"
                        }
                    })} />
                    <span>{formState.errors?.amount?.message}</span> <br />

                    <label>Image Url: </label>
                    <input type="text" {...register("imageUrl", {
                        required: {
                            value: true,
                            message: "Missing Url!"
                        },
                        minLength: { value: 10, message: "Url must be minimum 10 chars" },
                        maxLength: { value: 10000, message: "Url can't exceed 10000 chars!" }
                    })} />
                    <span>{formState.errors?.imageUrl?.message}</span>

                    <button className="updateButton">Update</button>

                    <button className="backButton" onClick={back}>Back</button>

                </form>

            </div>

        </div>
    );
}

export default EditCoupon;
