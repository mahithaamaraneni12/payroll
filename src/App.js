import React, { useState } from "react";
import Papa from "papaparse";
import Swal from "sweetalert2";
import PayrollTable from "./DataTable";

const App = () => {
  const [data, setData] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    e.target.value = "";

    setData([]);
    setTotalSalary(0);

    if (file.type !== "text/csv") {
      Swal.fire("Invalid File!", "Please upload a CSV file only.", "error");
      return;
    }

    Papa.parse(file, {
      complete: (result) => {
        if (!result.data.length) {
          setData([]);
          setTotalSalary(0);
          Swal.fire("Error!", "CSV file is empty or invalid.", "error");
          return;
        }

        const parsedData = result.data.slice(1).map((row) => ({
          id: row[0] || "N/A",
          name: row[1]?.trim() || "Unknown",
          netSalary: parseFloat(row[2]) || 0,
          lopDays: row[3] || "0",
          pf: row[4] || "0",
          esi: row[5] || "0",
          tds: row[6]?.toLowerCase() === "yes" ? "Yes" : "No",
        }));

        setData(parsedData);
        setTotalSalary(parsedData.reduce((sum, row) => sum + row.netSalary, 0));

        Swal.fire("Success!", "Your CSV file was uploaded successfully.", "success");
      },
      skipEmptyLines: true,
    });
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Confirm Payroll Disbursal",
      text: `Total Salary to be disbursed: ₹${totalSalary.toLocaleString()}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Payroll disbursal initiated.", "success");
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payroll Processing</h2>

     
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-sm p-4">
            <h5 className="card-title text-center">Upload Employee Salary CSV</h5>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="form-control mb-2"
            />
          
          </div>
        </div>
      </div>

     
      {data.length > 0 && <PayrollTable data={data} totalSalary={totalSalary} />}

    
      <div className="text-center mt-4">
        <button
          className="btn btn-dark btn-lg text-white"
          style={{ backgroundColor: "#6f42c1" }}
          onClick={handleProceed}
          disabled={data.length === 0}
        >
          Proceed to Disbursal
        </button>
      </div>
    </div>
  );
};

export default App;
