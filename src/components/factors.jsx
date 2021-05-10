import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "./ranking.css";
import "./home.css";


const years = [
    {title: "2015", link: "?year=2015"},
    {title: "2016", link: "?year=2016"},
    {title: "2017", link: "?year=2017"},
    {title: "2018", link: "?year=2018"},
    {title: "2019", link: "?year=2019"},
    {title: "2020", link: "?year=2020"},
]

function Factors() {
    
    const [rowData, setRowData] = useState([]);
    const [selected, setSelected] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        fetch("http://131.181.190.87:3000/factors/2018")
            .then(res => res.json())
            .then(data =>
                data.map(company => {
                    return {
                        rank: company.rank,
                        country: company.country,
                        score: company.score,
                        year: company.year,
                    };
                })
            )
            .then(senData => setRowData(senData));
    }, [year]);

    function setYearFunc() {
        setYear(this.link);
    }

    function Dropdownmenu(){
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const toggle = () => setDropdownOpen(prevState => !prevState);

        return (
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    Year
                </DropdownToggle>
                <DropdownMenu className="industry-drop">
                    {years.map(data => (
                        <React.Fragment key={data.title}>
                            <DropdownItem onClick={setYearFunc.bind(data)}>{data.title}</DropdownItem>
                        </React.Fragment>
                    ))}
                </DropdownMenu>
            </Dropdown>
        )
    }

    function clickHander(props) {
        setSelected(props.data.year);
    }

    const columns = [
        { headerName: "Rank", field: "rank", filter: "agTextColumnFilter", filter: true, sortable: true, width:"200", flex:"300" },
        { headerName: "Country", field: "country", filter: "agTextColumnFilter", filter: true, sortable: true, width:"200", flex:"300" },
        { headerName: "Score", field: "score", filter: "agTextColumnFilter", filter: true, sortable: true, width:"200", flex:"300" },
        { headerName: "Year", field: "year", filter: "agTextColumnFilter", filter: true, sortable: true, width:"200", flex:"300" }
      ];

    function Table(){
        return (

            <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                pagination={true}
                paginationPageSize={30}
                rowSelection={true}
                onRowDoubleClicked={clickHander}
            >
            </AgGridReact>
        );
    }

    if (selected === "") {
        return (
            <div>
                <div className="jumbo">
                    <div className="transbox">
                        <div className="transMessage">
                                <div className="title">
                                    Factors
                                </div>
                        </div>
                    </div>
                    <div
                        className="ag-theme-alpine-dark table"
                        style={{
                        height: "60vh",
                        width: "60vw",
                        marginRight: "5%",
                        marginLeft : "5%"
                        }}
                        >
                        <div className="industry-drop">
                            <Dropdownmenu />
                        </div>
                        <Table />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return(
            <Redirect to={"./search" + selected} />
        )
    }



   
}

export default Factors;

 
