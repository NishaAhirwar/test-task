import React from "react";
import FormData from "./FormData";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import FormTable from "./FormTable";


function App() {
  return (
    <div className="App">

      <Router>
        <div>
          <Routes>
            <Route path="/" element={<FormData />}></Route>
            <Route path="/data" element={<FormTable />}></Route>
          </Routes>
        </div>
      </Router>
    
    </div>
  );
}

export default App;
