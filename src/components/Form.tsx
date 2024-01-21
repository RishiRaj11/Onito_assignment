import React from "react";
import {useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Form.css";

interface IFormInput {
    name: string;
    age: string,
    sex: string,
    phone: string;
    govt_idType: string,
    govt_idNumber: string,
}

// yup schema
const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    age: yup.string().required("Age is a required field"),
    sex: yup.string().required("Sex is a required field"),
    phone: yup
        .string()
        .required("Phone is a required field")
        .matches(
            /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            "Invalid phone number format"
        ),
    govt_idType: yup.string().required("Govt id is a required field"),
    govt_idNumber: yup.string().required("Id number is a required field"),

});

export const Form: React.FC = () => {
    let navigate=useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });

    const onSubmit = (data: IFormInput) => {
          navigate("/step2")
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input {...register("name")} />
            {errors.name && <p>{errors.name.message}</p>}

            <label>Age</label>
            <input {...register("age")} />
            {errors.age && <p>{errors.age.message}</p>}
            <div className="input-group">
                <div className="input-field">
                    <label>Sex</label>
                    <select{...register("sex")} >
                        <option value="male">Male</option>
                        <option value="female" >Female</option>
                    </select>
                    {errors.sex && <p>{errors.sex.message}</p>}
                </div>
                <div className="input-field">
                    <label>Govt Id</label>
                    <select  {...register("govt_idType")} >
                        <option>Aadhar</option>
                        <option>Pan</option>
                    </select>
                    {errors.govt_idType && <p>{errors.govt_idType.message}</p>}
                </div>
                <div className="input-field">
                    <label>Govt Id Number</label>
                    <input {...register("govt_idNumber")} />
                    {errors.govt_idNumber && <p>{errors.govt_idNumber.message}</p>}
                </div>
            </div>
            <label>Phone</label>
            <input {...register("phone")} />
            {errors.phone && <p>{errors.phone.message}</p>}

            <button type="submit" >Next</button>
        </form>
    );
};