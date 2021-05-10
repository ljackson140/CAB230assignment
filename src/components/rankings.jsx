import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "./styles/ranking.css";


const years = [
    {title: "2015", link: "?year=2015"},
    {title: "2016", link: "?year=2016"},
    {title: "2017", link: "?year=2017"},
    {title: "2018", link: "?year=2018"},
    {title: "2019", link: "?year=2019"},
    {title: "2020", link: "?year=2020"},
    {title: "2021", link: "?year=2021"},
]

function Rankings() {
    
    const [rowData, setRowData] = useState([]);
    const [selected, setSelected] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        fetch("http://131.181.190.87:3000/rankings" + year)
            .then(res => res.json())
            .then(data =>
                data.map(rankingData => {
                    return {
                        rank: rankingData.rank,
                        country: rankingData.country,
                        score: rankingData.score,
                        year: rankingData.year,
                    };
                })
            )
            .then(senData => setRowData(senData));
    }, [year]);

    function clickHander(props) {
        setSelected(props.data.year);
    }
    function setYearFunc() {
        setYear(this.link);
    }

    function Dropdownmenu(){
        const [openDropDown, setOpenDropDown] = useState(false);
        const toggle = () => setOpenDropDown(prevState => !prevState);

        return (
            <Dropdown isOpen={openDropDown} toggle={toggle}>
                <DropdownToggle caret>
                    Year
                </DropdownToggle>
                <DropdownMenu className="years-drop">
                    {years.map(data => (
                        <React.Fragment key={data.title}>
                            <DropdownItem onClick={setYearFunc.bind(data)}>{data.title}</DropdownItem>
                        </React.Fragment>
                    ))}
                </DropdownMenu>
            </Dropdown>
        )
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
                onRowDoubleClicked={clickHander}
                pagination={true}
                paginationPageSize={30}
                rowSelection={true}
            >
            </AgGridReact>
        );
    }

    
    return (
        <div>
            <div className="jumbo">
                
                <div className="tBox-message">
                        <div className="title">
                            Rankings
                        </div>
                </div>
                
                <div
                    className="ag-theme-alpine-dark table"
                    style={{
                    height: "60vh",
                    width: "60vw",
                    marginRight: "6%",
                    marginLeft : "6%"
                    }}
                    >
                    <div className="years-drop">
                        <Dropdownmenu />
                    </div>
                    <Table />
                </div>
            </div>
        </div>
    )
    
}

export default Rankings;

 
