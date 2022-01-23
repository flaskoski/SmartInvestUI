import { MenuItem, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import "./CrudAddModal.css"

class CrudAddModal extends Component {
    constructor(props) {
        //console.log("constructor", props.open)
        super(props);
        let itemsWithDefaults = {} 
        let errors = {}
        this.props.itemFields.forEach(i => {
            errors[i.name] = ""
            if(i.defaultValue)
                itemsWithDefaults[i.name] = i.defaultValue
        })

        this.state = {
            newItem : {...itemsWithDefaults},
            errors: errors
        }
        console.log(`defaults for ${this.props.itemType}:` , itemsWithDefaults)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    async handleSubmit(event){
        event.preventDefault();

        let newItem = this.state.newItem
        this.props.itemFields.filter(f => f.defaultValue != undefined).forEach(f=>{
            if(!newItem[f.name]) newItem[f.name] = f.defaultValue //TODO if field is empty
        })
        this.props.itemFields.filter(f => f.type === 'float' || f.type === 'int')
          .forEach(f =>
            newItem[f.name] = f.type === 'float'? parseFloat(newItem[f.name]) : parseInt(newItem[f.name])
          )
        // console.log(this.state);
        
        let headers = { headers: {'Content-Type': 'application/json'}}
        if(this.props.backendHeaders)
            headers = await this.props.backendHeaders
        const requestOptions = {
            method: 'POST',
            ...headers,
            body: JSON.stringify(newItem)
        };
        fetch(this.props.backendUrl, requestOptions).then(response => {
              console.log(response)
              if([200, 201].indexOf(response.status) < 0)
                throw new Error(response)
              return response.json()
            }).then(data => {
              console.log(`New ${this.props.itemType} added`)
              console.log(data)
              this.props.handleAddToTable(true, data.item)
            })
            .catch(e => {
              console.error(`Error trying to add new ${this.props.itemType}:`, e)
              this.props.handleAddToTable(false, null)
            })
    }

    handleInput(event){
        const name = event.target.name
        const newValue = event.target.value
        
        console.log(this.state, {[name]: newValue})
        this.setState({ 
            newItem : {
                ...this.state.newItem, 
                [name]: newValue} });
    };

    render() {
        const handleClose = () => {
            this.props.handleAddToTable(false, null)
        };  
        const validateField = (validate, {name, value}) => {
            let allErrors = this.state.errors
            let message = (validate? validate(value) : "")
            allErrors[name] = message
            console.log(`name: ${name}, value: ${value}`)
            // console.log(`validate: ${validate(value)}`)
            console.log(allErrors)
            this.setState({errors: allErrors})
        }

        const text = "";
        return (
            <div>
                <Dialog open={this.props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle id="form-dialog-title">Add {this.props.itemType}</DialogTitle>
                        <DialogContent>
                        {text}
                        {this.props.itemFields.filter(f => f.isInput != false).map( (field, i) =>{	
                            switch(field.type){
                                case 'date':
                                    return (	
                                    <TextField
                                        key={field.name} id={field.name}  name={field.name}
                                        label={field.label}
                                        autoFocus={(i==0 ? true : undefined)}
                                        margin="dense"
                                        onChange={this.handleInput}
                                        type={field.type}
                                        InputLabelProps={{
                                            shrink: true
                                            }}
                                        InputProps={{
                                            readOnly: field.isReadOnly
                                            }}
                                    />		
                                        
                                    );
                                case 'choice':
                                    if(field.choices.length < 5)
                                        return (	
                                        <div className="material-ui-radioGroup" >
                                            <FormLabel component="legend">{field.label}</FormLabel>
                                            <RadioGroup aria-label={field.label} name={field.name} id={field.name} onChange={this.handleInput}>
                                              {field.choices instanceof Array
                                                ? field.choices.map(choice => 
                                                  <FormControlLabel value={choice} control={<Radio  />} label={choice} />)
                                                : Object.entries(field.choices).map(([key, val]) => 
                                                  <FormControlLabel value={val} control={<Radio  />} label={key} />)
                                              }
                                                {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                                            </RadioGroup>
                                        </div>
                                            
                                        );
                                    else
                                        return (
                                            <FormControl className={`form-select-label`}>
                                                <InputLabel id={`select-label-${field.name}`}>{field.label}</InputLabel>
                                                <Select className={`select-label`} labelId="demo-simple-select-label"
                                                    name={field.name}
                                                    value={this.state.newItem[field.name]?this.state.newItem[field.name]:''}
                                                    onChange={this.handleInput}
                                                    >
                                                    {field.choices instanceof Array
                                                      ? field.choices.map(choice => 
                                                          <MenuItem value={choice}>{choice}</MenuItem>)
                                                      : Object.entries(field.choices).map(([key, val]) => 
                                                          <MenuItem value={val}>{key}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>
                                        );
                                case 'lookup': 
                                  return (<FormControl className={`form-select-label`}>
                                    <InputLabel id={`select-label-${field.name}`}>{field.label}</InputLabel>
                                    <Select className={`select-label`} labelId="demo-simple-select-label"
                                      name={field.name}
                                      value={!this.state.newItem[field.name]? '' : this.state.newItem[field.name]}
                                      onChange={this.handleInput}
                                      >
                                      {Object.entries(field.choices).map(([key, val]) => 
                                            <MenuItem value={val}>{key}</MenuItem>)
                                      }
                                    </Select>
                                  </FormControl>)
                                default:
                                    return (	
                                    <TextField
                                        autoFocus={(i==0 ? true : undefined)}
                                        key={field.name} id={field.name} name={field.name}
                                        label={field.label}
                                        onChange={this.handleInput}
                                        onBlur={(event) => validateField(field.validate, event.target)}
                                        defaultValue={field.defaultValue}
                                        type={field.type}
                                        error={this.state.errors[field.name]}
                                        helperText={this.state.errors[field.name]}
                                        margin="dense"
                                        fullWidth
                                        InputProps={{
                                            readOnly: field.isReadOnly
                                            }}
                                        // {field.size? field.size : fullWidth}
                                    />		
                                    //  required={field.isRequired} />
                                        
                                    );
                            }
                        }) }	
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    
                    </form>
                </Dialog>
            </div>

         );
    }
}


 
export default CrudAddModal;