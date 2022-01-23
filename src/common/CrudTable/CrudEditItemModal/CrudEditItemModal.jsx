import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField  } from '@material-ui/core';
import "../CrudAddModal/CrudAddModal.css"
import { getShortDate, getUsaShortDate } from '../../convert';
import { formatLookupFields, getLookupValue } from '../CrudTable';

class CrudEditItemModal extends Component {
    constructor(props) {
        super(props);
        let currentItem = props.item && Object.keys(props.item)?.length ? formatLookupFields(props.item, this.props.itemFields) : {}
        this.state = {
            open: (props.open? props.open : false),
            newItem: currentItem
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }
    // componentWillReceiveProps(newProps) {
    //     this.setState({open: newProps.open})
    // }

    handleInput(event){
      const newValue = {[(event.target.id ?event.target.id : event.target.name)]: event.target.value}
      console.log(this.state, newValue)
      this.setState({ 
        newItem : {
          ...this.state.newItem, 
          ...newValue
        } 
      });
    };

    async handleSubmit(event){
        event.preventDefault();

        let newItem = this.state.newItem
        this.props.itemFields.filter(f => f.defaultValue != undefined).forEach(f=>{
            if(!newItem[f.name]) newItem[f.name] = f.defaultValue //TODO if field is empty. Now filling again with default value
        })
        this.props.itemFields.filter(f => f.type === 'float' || f.type === 'int')
          .forEach(f =>
            newItem[f.name] = f.type === 'float'? parseFloat(newItem[f.name]) : parseInt(newItem[f.name])
          )
        let headers = { headers: {'Content-Type': 'application/json'}}
        if(this.props.backendHeaders)
            headers = await this.props.backendHeaders
        const requestOptions = {
            method: 'PUT',
            ...headers,
            body: JSON.stringify(newItem)
        };
        fetch(this.props.backendUrl + '/' + this.props.item.id, requestOptions)
            .then(response => {
                if(response.status != 200)
                    throw new Error(response)
                return response.json()
            }).then(data => {
                console.log(`Item ${this.props.itemType} updated`)
                this.props.handleAction(true, data)
            })
            .catch(e => {
                console.error(`Error trying to add new ${this.props.itemType}!`)
                this.props.handleAction(false, null)
            })
    }

    render() {
        const handleClose = () => {
            this.props.handleAction(false, null)
        };
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
                                        key={field.name}
                                        autoFocus={(i==0 ? true : undefined)}
                                        margin="dense"
                                        id={field.name}
                                        label={field.label}
                                        onChange={this.handleInput}
                                        type={field.type}
                                        defaultValue={this.props.item? getShortDate(this.props.item[field.name]):""}
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
                                            <RadioGroup aria-label={field.label} name={field.name} id={field.name} 
                                                onChange={this.handleInput}
                                                defaultValue={this.props.item? this.props.item[field.name]: undefined} >
                                                {field.choices.map(choice => 
                                                    <FormControlLabel value={choice} control={<Radio  />} label={choice} />)}
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
                                                     {field.choices.map(choice => 
                                                        <MenuItem value={choice}>{choice}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        );
                                case 'lookup': 
                                  return (<FormControl className={`form-select-label`}>
                                    <InputLabel id={`select-label-${field.name}`}>{field.label}</InputLabel>
                                    <Select className={`select-label`} labelId="demo-simple-select-label"
                                      name={field.name}
                                      value={ !this.state.newItem?.[field.name]
                                        ? '' 
                                        : this.state.newItem[field.name] instanceof Object
                                        ? getLookupValue(this.props.item[field.name])
                                        : this.state.newItem[field.name]
                                      }
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
                                        key={field.name}
                                        autoFocus={(i==0 ? true : undefined)}
                                        margin="dense"
                                        id={field.name}
                                        onChange={this.handleInput}
                                        label={field.label}
                                        defaultValue={this.props.item? this.props.item[field.name]:""}
                                        type={field.type}
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
                                Edit
                            </Button>
                        </DialogActions>
                    
                    </form>
                </Dialog>
            </div>

         );
    }
}
export default CrudEditItemModal;
