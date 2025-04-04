import React from "react";

const PayrollTable = ({ data, totalSalary }) => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="table-responsive shadow p-3 bg-white rounded">
            <table className="table table-bordered table-hover table-striped">
              <thead className="table-dark text-center">
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Net Salary</th>
                  <th>LOP Days</th>
                  <th>PF</th>
                  <th>ESI</th>
                  <th>TDS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td>{row.id}</td>
                    <td className="text-start">{row.name}</td>
                    <td className="fw-bold text-success">₹{row.netSalary.toLocaleString()}</td>
                    <td>{row.lopDays}</td>
                    <td>₹{row.pf}</td>
                    <td>₹{row.esi}</td>
                    <td className={row.tds === "Yes" ? "text-danger fw-bold" : ""}>
                      {row.tds}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-end fw-bold fs-5 text-primary mt-3">
            Total Net Salary: ₹{totalSalary.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollTable;
