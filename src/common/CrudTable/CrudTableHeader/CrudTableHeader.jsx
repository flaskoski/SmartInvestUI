import React, { Component, useEffect, useState } from 'react';
import TableFilter from 'react-table-filter';
import "./CrudTableHeader.css";
import "react-table-filter/lib/styles.css";


function CrudTableHeader({headers, onFilterChanged}){
  const [removedOptions, setRemovedOptions] = useState({})
  const [tableData, setTableData] = useState([])
  
  useEffect(() => {
    let auxTableData = []
    //--make an array with all the possible values options
    console.log("useeffect--:::", headers)
    headers.forEach(h =>{
      if(h.type == "choice")
      if(h.choices instanceof Array)
        h.choices.forEach((choice, i) =>{
          if(!auxTableData[i]) 
            auxTableData[i] = {}
          auxTableData[i][h.name] = choice
        })
      else
        Object.keys(h.choices).forEach((choice, i) =>{
          if(!auxTableData[i]) 
            auxTableData[i] = {}
          auxTableData[i][h.name] = choice
        })
    })
    setTableData(auxTableData)
  }, headers)

  const filterUpdated = (newData, newRemovedOptions) => {
    setRemovedOptions(newRemovedOptions)
    onFilterChanged(newRemovedOptions)
	}

  return console.log("rendering--::", tableData) ||(
    <TableFilter key={tableData.length} rows={tableData} onFilterUpdate={filterUpdated} initialFilters={removedOptions}>
      <th key="checkbox" className="borderWhite">
        <span className="custom-checkbox">
          <input className="margin10" type="checkbox" id="selectAll"/>
          <label htmlFor="selectAll"></label>
        </span>
      </th>
      {headers.map((h, i) =>{
        return (<th key={h.name} filterkey={h.type == "choice"? h.name.toLowerCase(): undefined}>{h.label}</th>);
      })}
      <th key="actions">Actions</th>
    </TableFilter>
  );
}

export default CrudTableHeader;