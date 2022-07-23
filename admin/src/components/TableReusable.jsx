import React from "react";

const Table = ({ data, columnHeaders, children }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columnHeaders.map((el, idx) => (
              <th key={idx}>{el}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((datum, idx) => {
            return React.cloneElement(children, {
              datum: datum,
              idx: idx,
              key: datum.id,
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
