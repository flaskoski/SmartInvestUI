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
      if(h.choices instanceof Array)
        h.choices.forEach((choice, i) =>{
          if(!auxTableData[i]) 
            auxTableData[i] = {}
          auxTableData[i][h.name] = choice
        })
      else if(h.choices)
        Object.keys(h.choices).forEach((choice, i) =>{
          if(!auxTableData[i]) 
            auxTableData[i] = {}
          auxTableData[i][h.name] = choice
        })
    })
    console.log(auxTableData)
    setTableData(auxTableData)
  }, headers)

  const transformLookupValues = async newRemovedOptions => 
  newRemovedOptions 
  ? Object.entries(newRemovedOptions).reduce((ac, [key, val]) => {
      let currentField = headers.find(({name}) => name === key)
      console.log("currentField:", currentField, {...ac, [key]: (currentField?.type === 'lookup' ? val.map(option => currentField.choices[option]) : val) })
      return {...ac, [key]: (currentField?.type === 'lookup' ? val.map(option => currentField.choices[option]) : val) }
    }, {}) 
  : {}

  const filterUpdated = (newData, newRemovedOptions) => {
    transformLookupValues(newRemovedOptions).then( transformedRemovedOptions => {
      setRemovedOptions(transformedRemovedOptions)
      onFilterChanged(transformedRemovedOptions)
    })
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
        return (<th key={h.name} filterkey={h.type == "choice" || h.type === 'lookup' ? h.name: undefined}>{h.label}</th>);
      })}
      <th key="actions">Actions</th>
    </TableFilter>
  );
}

export default CrudTableHeader;