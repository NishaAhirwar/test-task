import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery'; 
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";


class FormTable extends Component {
  
  state={detail:[]}
  
  componentDidMount(){
    
    axios.get("http://localhost:5000/data")
    .then(res=> {var detail=res.data;
      this.setState({detail})});
      
      
      $(document).ready(function () {
        setTimeout(function () {
          $("#table").DataTable({
            // pagingType: "full_numbers",
            // processing: true,
            // dom: "Bfrtip",
            // select: {
            //   style: "single",
            // },
            
          });
        }, 1000);
      });
    }
    
    showTable = () => {
      try {
        return this.state.detail.map((item, index) => {
          return (
            <tr>
            <td className="text-xs font-weight-bold">{item.name}</td>
            <td className="text-x font-weight-bold">{item.age}</td>
            <td className="text-x font-weight-bold">{item.sex}</td>
            <td className="text-x font-weight-bold">{item.mobile}</td>
            <td className="text-x font-weight-bold">{item.email}</td>
            <td className="text-x font-weight-bold">{item.govt_ID}</td>
            <td className="text-x font-weight-bold">{item.govtID_num}</td>
            <td className="text-x font-weight-bold">{item.guar}</td>
            <td className="text-x font-weight-bold">{item.eContact}</td>
            <td className="text-x font-weight-bold">{item.add}</td>
            <td className="text-x font-weight-bold">{item.country}</td>
            <td className="text-x font-weight-bold">{item.state}</td>
            <td className="text-x font-weight-bold">{item.city}</td>
            <td className="text-x font-weight-bold">{item.pin}</td> 
            <td className="text-x font-weight-bold">{item.occ}</td>
            <td className="text-x font-weight-bold">{item.rel}</td>
            <td className="text-x font-weight-bold">{item.mar_st}</td>
            <td className="text-x font-weight-bold">{item.bld_grp}</td>
            <td className="text-x font-weight-bold">{item.nat}</td>
            
            
            <td></td>
            </tr>
            );
          });
        } catch (e) {
          alert(e.message);
        }
      };
      
      render(){
        return(
          <div className="container-fluid py-4">
          <div>
          <h1 className="main-heading">User Details</h1>
          </div>
          <div className="table-responsive p-0 pb-2">
          <table id="table" className="table align-items-center justify-content-center mb-0 container">
          <thead>
          <tr>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Name</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Age</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Sex</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Mobile Number</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Email</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Govt ID type</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Govt ID number</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Guardian name</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Emergency Contact</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Address</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Country</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">State</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">City</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Pincode</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Occupation</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Religion</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Marital Status</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Blood Group</th>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Nationality</th>
          
          
          <th></th>
          </tr>
          </thead>
          
          <tbody>
          {this.showTable()}
          </tbody>
          </table>
          </div>
          </div>
          )
        }
      }
      
      
      export default FormTable;