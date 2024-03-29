import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { getLookupKey } from '../CrudTable';

class CrudDeleteItemModal extends Component {
    constructor(props) {
        //console.log("constructor", props.open)
        super(props);
        this.state = {
            open: (props.open? props.open : false)
        }
        this.handleDelete = this.handleDelete.bind(this)
    }
    // componentWillReceiveProps(newProps) {
    //     this.setState({open: newProps.open})
    // }

    async handleDelete(event){
        event.preventDefault();
        let headers = { headers: {'Content-Type': 'application/json'}}
        if(this.props.backendHeaders)
            headers = await this.props.backendHeaders
        const requestOptions = {
            method: 'DELETE',
            ...headers,
        };
        fetch(this.props.backendUrl + '/' + this.props.item.id, requestOptions)
            .then(data => {
                if(data.status != 200){
                    console.error(data)
                    return;
                }
                console.log(`${this.props.itemType} deleted!`)
                let deletedItem = this.props.item
                this.props.handleDeleteItem(true, deletedItem )
            })
            .catch(e => {
                console.error(`Error trying to delete ${this.props.itemType}: ${e}`)
                this.props.handleDeleteItem(false, null)
            })
        this.setState({open: false});
    }

    render() {
        const handleClose = () => {
            this.setState({open: false});
            this.props.handleDeleteItem(false, null)
        };  

        const text = `Are you sure you want to delete the ${this.props.itemType} below?`;
        let itemFields = (this.props.item? Object.keys(this.props.item) : null)
        return (
            <div>
                <Dialog open={(this.state.open? this.state.open : false)} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <form onSubmit={this.handleAdd}>
                        <DialogTitle id="form-dialog-title">Add {this.props.itemType}</DialogTitle>
                        <DialogContent>
                        <p>{text}</p>
                        <table>
                        {
                            (this.props.fields?  this.props.fields.map( (field, i) =>{
                            return (<div><b>{field.label}</b>: {
                              field?.type === 'lookup'
                                ? getLookupKey(this.props.item?.[field.name])
                                : this.props.item?.[field.name]}<br/></div>)	
                        }) : "")
                        }
                        </table>      
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="default">
                                Cancel
                            </Button>
                            <Button onClick={this.handleDelete} color="primary">
                                Delete
                            </Button>
                        </DialogActions>
                    
                    </form>
                </Dialog>
            </div>

         );
    }
}
export default CrudDeleteItemModal;
