import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
//import { Button } from "reactstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const API_URL = "http://131.181.190.87:3000";
const url = `${API_URL}/rankings`;

// const years = [
//     {title: "2015", link: "?year=2015"},
//     {title: "2016", link: "?year=2016"},
//     {title: "2017", link: "?year=2017"},
//     {title: "2018", link: "?year=2018"},
//     {title: "2019", link: "?year=2019"},
//     {title: "2020", link: "?year=2020"},
//     {title: "2021", link: "?year=2021"},
// ]

function Rankings() {
    
    const [rowData, setRowData] = useState([]);
    // const [selected, setSelected] = useState("");
    // const [year, setYear] = useState("");

    useEffect(() => {
        fetch(url)
          .then((res) => res.json())
          .then((data) =>
            data.map((info) => {
              return {
                rank: info.rank,
                country: info.country,
                score: info.score,
                year: info.year,
              };
            })
          )
          .then((info) => setRowData(info));
    });

    const columns = [
        { headerName: "Rank", field: "rank" },
        { headerName: "Country", field: "country" },
        { headerName: "Score", field: "score" },
        { headerName: "Year", field: "year", sortable: true, filter: true },
    ];

    return (
        <div className="container">
      <h1>Rankings</h1>
      
      <div
        className="ag-theme-balham"
        style={{
          height: "700px",
          width: "800px"
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={30}
        />
      </div>
    </div>
    );
}

export default Rankings;

 
