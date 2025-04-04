import React from "react";

const SalarySummary = ({ data }) => {
  const totalSalary = data.reduce((acc, item) => acc + item.netSalary, 0);
  return (
    <div>
      <h3>Total Net Salary: ₹{totalSalary.toFixed(2)}</h3>
    </div>
  );
};

export default SalarySummary;
