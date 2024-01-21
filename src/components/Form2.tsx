import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Country, State, City } from 'country-state-city';
import * as yup from "yup";
import "./Form.css";

interface IFormInput {
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

// yup schema
const schema = yup.object().shape({
    address: yup.string().required("Address is a required field"),
    city: yup.string().required("City is a required field"),
    state: yup.string().required("State is a required field"),
    country: yup.string().required("Country is a required field"),
    zipcode: yup
        .string()
        .required("Zipcode is a required field")
        .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid zipcode format"),
});

export const Form2: React.FC = () => {
    const formInput = {
        country: "",
        countryCode: "",
        state: "",
        stateCode: "",
        city: ""
    }
    const [inputValue, setInputValue] = useState(formInput);
    const [csc, setcsc] = useState({ state: [], city: [] })
    // console.log(Country.getAllCountries())

    console.log(State.getAllStates())
    console.log(City.getAllCities())
    //console.log(City.getCitiesOfState(countryCode:"",stateCode:""))
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });

    const onSubmit = (data: IFormInput) => {

        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Address</label>
            <input {...register("address")} />
            {errors.address && <p>{errors.address.message}</p>}
            <div className="input-group">
                <div className="input-field">
                    <label>Country</label>
                    <select  {...register("country")} onChange={(event) => { setInputValue({ ...inputValue, countryCode: event.target.value }) }} >
                        {
                            Country.getAllCountries().map((country) => {

                                return <option value={country.isoCode}>{country.name}</option>
                            })
                        }
                    </select>
                    {errors.country && <p>{errors.country.message}</p>}
                </div>
                <div className="input-field">
                    <label>State</label>
                    <select  {...register("state")} onChange={(event) => { { setInputValue({ ...inputValue, stateCode: event.target.value }) } }} >
                        {
                            inputValue.countryCode ? <>{State.getAllStates().filter((state) => state.countryCode == inputValue.countryCode).map((state) => <option value={state.isoCode} >{state.name}</option>)}</> : <option value="">select state</option>
                        }
                    </select>
                    {errors.state && <p>{errors.state.message}</p>}
                </div>
            </div>
            <div className="input-group">
                <div className="input-field">
                    <label>City</label>
                    <select  {...register("city")}  >
                        {
                            inputValue.countryCode && inputValue.stateCode ? <>{City.getAllCities().filter((city) => city.stateCode == inputValue.stateCode).map((state) => <option>{state.name}</option>)}</> : <option value="">select city</option>
                        }
                    </select>
                    {errors.state && <p>{errors.state.message}</p>}
                </div>
                <div className="input-field">
                </div>
                <div className="input-field">
                    <label>ZIP Code</label>
                    <input {...register("zipcode")} />
                    {errors.zipcode && <p>{errors.zipcode.message}</p>}
                </div>
            </div>
            <input type="submit" />
        </form>
    );
};