import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "./styles/ranking.css";



function Search(){

    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    useEffect(() => {
        fetch("http://131.181.190.87:3000/rankings")
            .then(res => res.json())
            .then(data =>
                data.map(searchData => {
                    return {
                        year: searchData.year,
                        rank: searchData.rank,
                        score: searchData.score,
                        country: searchData.country,
                    };
                })
            )
            .then(senData => setRowData(senData));
    }, []);

    const columns = [
        { headerName: "Year", field: "year", sortable: true, filter: true },
        { headerName: "Rank", field: "rank", sortable: true, filter: true },
        { headerName: "Score", field: "score", sortable: true, filter: true },
        { headerName: "Country", field: "country", sortable: true, filter: true },
    ];

    

    function onGridReady(p) {
        setGridApi(p.api);
        setGridColumnApi(p.columnApi);
      }
    const onFilterTextChange=(e)=>{
      gridApi.setQuickFilter(e.target.value)
    }

    return (
        <div className="App">
          <h1 align="center">Happiness Search</h1>
          <h4 align='center'>search for your country's Happiness</h4>
    
          <div>
            <input 
                type="search" 
                onChange={onFilterTextChange} 
                placeholder="search a country..."/>
          </div>
          <div className="ag-theme-alpine-dark table" style={{ height: 300 }}>
            <AgGridReact
              onGridReady={onGridReady}
              rowData={rowData}
              columnDefs={columns}
              defaultColDef={{ flex: 1 }}
            />
          </div>
        </div>
      );


    
    
}
 
export default Search;