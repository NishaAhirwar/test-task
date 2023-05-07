import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().positive().min(18).max(50, "Age should be less than 50").required().typeError("Age must be a number and required"),
  sex: yup.string().required().typeError("Please select sex"),
  mobile: yup.string().trim().ensure().when({
    is: (val)=> val.length>0,
    then: (schema)=>  yup.string().matches(/^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/, "Invalid number"),
    
  }),
  eContact: yup.string().trim().ensure().when({
    is: (val)=> val.length>0,
    then: (schema)=>  yup.string().matches(/^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/, "Invalid number"),
  }),
  govID: yup.string(),
  email: yup.string().email(),
  address: yup.string().max(50, "Address is too long"),
  pincode: yup.number()
  .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value).typeError("Incorrect pincode"),
  labelName: yup.string(),
  guarName: yup.string().trim().ensure().when(["labelName"],{
    is: (labelName)=> labelName.length>0,
    then: (schema)=> yup.string().required("Please enter name")
  }),   
  
});



function FormData() {
  
  const { register, handleSubmit,reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const [nat, setNat] = useState(["India"]);
  const [data, setData] = useState([""]);
  const [city, setCity] = useState([""]);
  
  
  
  
  useEffect(() => {
    axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
    .then(res => setData(res.data))
    .catch(error => console.log(error));
  }, []);
  
  var details = data.filter((item) => item.country === "India");
  var statesList = [...new Set(details.map(st => st.subcountry))];
  statesList.sort();
  
  
  
  
  function handleStateChange(e) {
    
    setCity("--Select City--");
    var cityList = details.filter(item => item.subcountry === e.target.value).map(i => i.name);
    cityList.sort();
    setCity(cityList);
    
  }
  
  
  const onSubmit = userData => {
    console.log(userData);
    axios.post("http://localhost:5000/", userData)
    .then(res => console.log(res.data))
    
    reset()
    
    
    
    
  }
  
  
  
  return (
    <div>
    <h1 className="main-heading">Registration Form</h1>
    <div className="container data">
    
    
    
    
    <form onSubmit={handleSubmit(onSubmit)} >
    
    <h3 className="heading">Personal Details: </h3>
    
    <div className="form-row">
    
    <div className="form-group ">
    <div>
    <label>Name<span className="req">*</span></label>
    <input  {...register("name")} placeholder="Enter Name" className="form-control" />
    <p className="err">{errors.name?.message}</p>
    </div>
    
    
    </div>
    
    <div className="form-group ">
    <label>Age<span className="req">*</span></label>
    <input className="form-control" {...register("age")} placeholder="Age in Years" />
    <p className="err">{errors.age?.message}</p>
    
    </div>
    
    
    
    <div className="form-group ">
    <label>Sex<span className="req">*</span></label>
    <select className="form-control" {...register("sex")}   >
    <option value="" hidden >Enter Sex</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
    </select>
    <p className="err">{errors.sex?.message}</p>
    
    </div>
    
    </div>
    
    <div className="form-row">
    
    <div className="form-group ">
    <label>Mobile</label>
    <input {...register("mobile")} placeholder="Enter Mobile" className="form-control" />
    <p className="err">{errors.mobile?.message}</p>
    </div>
    
    <div className="form-group ">
    <label>Govt Issued ID</label>
    <select {...register("govID")} className="form-control" >
    <option value="" hidden> ID type</option>
    <option value="Adhaar" > Adhaar </option>
    <option value="PAN"> PAN </option>
    </select>
    
    </div>
    
    <div className="form-group ">
    <input {...register("govIDnum")} placeholder="Enter Govt ID" className="form-control" />
    <p className="err">{errors.govIDnum?.message}</p>
    
    </div>
    
    
    </div>
    
    <h3 className="heading">Contact Details</h3>
    
    <div>
    <div className="form-group">
    <label>Guardian Details</label>
    <select {...register("labelName")} className="form-control">
    <option value="" hidden >Enter Label</option>
    <option >Mr.</option>
    <option >Miss.</option>
    </select>
    <input {...register("guarName")} placeholder="Enter Guardian Name" className="form-control"/>
    <p className="err">{errors.guarName?.message}</p>
    </div>
    
    
    <div className="form-group">
    <label>Email</label>
    <input type="email" {...register("email")} placeholder="Enter Email" className="form-control" />
    <p className="err">{errors.email?.message}</p>
    </div>
    
    <div className="form-group">
    <label>Emergency Contact Number</label>
    <input  {...register("eContact")} placeholder="Enter Emergency No" className="form-control" />
    <p className="err">{errors.eContact?.message}</p>
    </div>
    
    
    
    
    
    </div>
    
    <h3 className="heading">Address Details</h3>
    <div>
    
    <div className="form-group">
    <label>Address</label>
    <input  {...register("address")} placeholder="Enter Address" className="form-control" />
    
    </div>
    <div className="form-group">
    <label>State</label>
    <select {...register("stateName")} onChange={handleStateChange} className="form-control">
    <option value="" hidden>--select State--</option>
    {statesList?.map((item, index) => <option key={index} value={item}>{item}</option>)}
    </select>
    </div>
    
    
    <div className="form-group">
    <label>City</label>
    <select {...register("city")} className="form-control">
    <option value="">---Select City---</option>
    {city !== "--Select City--" && city?.map((item, index) => <option key={index} value={item}>{item}</option>)}
    
    </select>
    </div>
    
    
    </div>
    
    <div>
    
    <div className="form-group">
    <label>Country</label>
    <input {...register("country")} value="India" className="form-control" />
    </div>
    <div className="form-group">
    <label> Enter Pincode</label>
    <input {...register("pincode")} placeholder="Enter pincode" className="form-control" />
    <p className="err">{errors.pincode?.message}</p>
    </div>
    
    
    </div>
    
    <h3 className="heading">Other details</h3>
    <div>
    <div className="form-group">
    <label>Occupation</label>
    <input {...register("occupation")} placeholder="Enter Occupation" className="form-control" />
    </div>
    
    <div className="form-group">
    <label>Religion</label>
    <select {...register("religion")} className="form-control">
    <option value="" hidden>Choose religion</option>
    <option >Hindu</option>
    <option >Muslim</option>
    <option >Sikh</option>
    <option >Christian</option>
    <option >Jain</option>
    </select>
    
    </div>
    
    
    
    <div className="form-group">
    <label>Marital Status</label>
    <select {...register("maritalStatus")} className="form-control">
    <option value="" hidden>---Choose marital status---</option>
    <option >Married</option>
    <option >Unmarried</option>
    </select>
    </div>
    
    <div className="form-group">
    <label>Blood Group</label>
    <select {...register("bloodgrp")} className="form-control">
    <option value="" hidden>--Choose blood group--</option>
    <option >A+</option>
    <option >B+</option>
    <option >AB+ </option>
    <option >AB-</option>
    <option >O+</option>
    <option >O-</option>
    </select>
    </div>
    
    <div className="form-group">
    <label>Nationality</label>
    <input {...register("nationality")} value={nat} className="form-control" />
    
    
    </div>
    
    
    </div>
    
    <div className="row">
    <div className="btn-sub ">
    
    <button className="btn btn-primary" type="submit">Submit</button>
    
    <input className="btn btn-can btn-secondary" value="Cancel" />
    
    <a  href="/data" className="btn btn-can btn-info">Show Data</a> 
    
    
    
    
    </div>
    
    
    </div>
    
    </form>
    
    </div>
    </div>
    )
  }
  
  export default FormData;