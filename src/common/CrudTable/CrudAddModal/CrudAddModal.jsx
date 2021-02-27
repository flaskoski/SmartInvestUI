import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

class CrudAddModal extends Component {
    constructor(props) {
        //console.log("constructor", props.open)
        super(props);
        this.state = {
            newItem : {}
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }
    // componentWillReceiveProps(newProps) {
    //     this.setState({open: newProps.open})
    // }
    // handleClickOpen () {
    //     this.setState({open: true});
    // };
    handleAdd(event){
        event.preventDefault();
        console.log(this.state);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.newItem)
        };
        fetch(this.props.backendUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(`New ${this.props.itemType} added`)
                console.log(data)
                this.state.newItem.id = data.id
                this.props.handleAddToTable(true, this.state.newItem)
            })
            .catch(e => {
                console.error(`Error trying to add new ${this.props.itemType}!`)
                this.props.handleAddToTable(false, null)
            })
    }

    handleInput(event){
        const name = event.target.id;
        const newValue = event.target.value;
        this.setState({ 
            newItem : {
                ...this.state.newItem, 
                [name]: newValue} });
    };

    render() {
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
                    <form onSubmit={this.handleAdd}>
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
                                        InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />		
                                        
                                    );
                                default:
                                    return (	
                                        <TextField
                                        key={field.name}
                                        autoFocus={(i==0 ? true : undefined)}
                                        margin="dense"
                                        id={field.name}
                                        onChange={this.handleInput}
                                        label={field.label}
                                        type={field.type}
                                        fullWidth
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