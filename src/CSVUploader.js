import React from "react";
import Papa from "papaparse";
import Swal from "sweetalert2";

const CSVUploader = ({ onDataParsed }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    
    e.target.value = "";
  
    if (file.type !== "text/csv") {
      onDataParsed([]); 
      setTimeout(() => {
        Swal.fire("Invalid File!", "Please upload a CSV file only.", "error");
      }, 0);
      return;
    }
  
    Papa.parse(file, {
      complete: (result) => {
        if (!result.data.length) {
          onDataParsed([]); 
          setTimeout(() => {
            Swal.fire("Error!", "CSV file is empty or invalid.", "error");
          }, 0);
          return;
        }
  
        const rawHeaders = result.data[0];
        const normalizedHeaders = rawHeaders.map((header) =>
          header.trim().toLowerCase().replace(/\s+/g, "")
        );
  
        const parsedData = result.data.slice(1).map((row) => ({
          id: row[normalizedHeaders.indexOf("employeeid")] || "N/A",
          name: row[normalizedHeaders.indexOf("name")]?.trim() || "Unknown",
          netSalary: parseFloat(row[normalizedHeaders.indexOf("netsalary")]) || 0,
          lopDays: row[normalizedHeaders.indexOf("lopdays")] || "0",
          pf: row[normalizedHeaders.indexOf("pf")] || "0",
          esi: row[normalizedHeaders.indexOf("esi")] || "0",
          tds: row[normalizedHeaders.indexOf("tds")]?.toLowerCase() === "yes" ? "Yes" : "No",
        }));
  
        onDataParsed(parsedData);
        Swal.fire("Success!", "CSV uploaded and processed successfully.", "success");
      },
      header: false, 
      skipEmptyLines: true, 
    });
  };
  

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="form-control form-control-sm mb-2"
          />
        </div>
      </div>
    </div>
  );
};

export default CSVUploader;
