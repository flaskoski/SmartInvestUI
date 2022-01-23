import { MenuItem, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import "./CrudAddModal.css"

function CrudAddModalFunction(props) {
    // newItem : {}

    async function handleSubmit(event){
        event.preventDefault();

        let newItem = this.state.newItem
        this.props.itemFields.filter(f => f.defaultValue != undefined).forEach(f => {
            if (!newItem[f.name]) newItem[f.name] = f.defaultValue //TODO if field is empty
        })
        // console.log(this.state);

        let headers = { headers: { 'Content-Type': 'application/json' } }
        if (this.props.backendHeaders)
            headers = await this.props.backendHeaders
        const requestOptions = {
            method: 'POST',
            ...headers,
            body: JSON.stringify(newItem)
        };
        fetch(this.props.backendUrl, requestOptions)
            .then(response => {
                if ([200, 201].indexOf(response.status) < 0)
                    throw new Error(response)
                return response.json()
            }).then(data => {
                console.log(`New ${this.props.itemType} added`)
                console.log(data)
                this.props.handleAddToTable(true, data)
            })
            .catch(e => {
                console.error(`Error trying to add new ${this.props.itemType}!`)
                this.props.handleAddToTable(false, null)
            })
    }

    handleInput(event){
        const name = (event.target.id ? event.target.id : event.target.name);
        const newValue = event.target.value;
        this.setState({
            newItem: {
                ...this.state.newItem,
                [name]: newValue
            }
        });
    };

    const handleClose = () => {
        this.props.handleAddToTable(false, null)
    };
    // const handleAdd = () => {
    //     console.log(this.state.value)
    // }
    const text = "";
    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Open form dialog
            </Button> */}
            <Dialog open={this.props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={this.handleSubmit}>
                    <DialogTitle id="form-dialog-title">Add {this.props.itemType}</DialogTitle>
                    <DialogContent>
                        {text}
                        {this.props.itemFields.filter(f => f.isInput != false).map((field, i) => {
                            switch (field.type) {
                                case 'date':
                                    return (
                                        <TextField
                                            key={field.name}
                                            autoFocus={(i == 0 ? true : undefined)}
                                            margin="dense"
                                            id={field.name}
                                            name={field.name}
                                            label={field.label}
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
                                    if (field.choices.length < 5)
                                        return (
                                            <div className="material-ui-radioGroup" >
                                                <FormLabel component="legend">{field.label}</FormLabel>
                                                <RadioGroup aria-label={field.label} name={field.name} id={field.name} onChange={this.handleInput}>
                                                    {field.choices.map(choice =>
                                                        <FormControlLabel value={choice} control={<Radio />} label={choice} />)}
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
                                                    value={this.state.newItem[field.name] ? this.state.newItem[field.name] : ''}
                                                    onChange={this.handleInput}
                                                >
                                                    {field.choices.map(choice =>
                                                        <MenuItem value={choice}>{choice}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        );
                                default:
                                    return (
                                        <TextField
                                            key={field.name}
                                            autoFocus={(i == 0 ? true : undefined)}
                                            margin="dense"
                                            id={field.name}
                                            onChange={this.handleInput}
                                            label={field.label}
                                            defaultValue={field.defaultValue}
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
                        })}
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

export default CrudAddModalFunction;