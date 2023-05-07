import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery'; 
import DataTable from "datatables.net-dt";

ReactDOM.render(<App />, document.getElementById("root"));

$(document).ready(function() {
    $('#userTable').DataTable();
});