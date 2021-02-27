import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

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

    handleDelete(event){
        event.preventDefault();
        console.log(this.state);
        const requestOptions = {
            method: 'DELETE',
            headers: {},
            body: {}
        };
        fetch(this.props.backendUrl + this.props.item.id, requestOptions)
            //.then(response => response.json())
            .then(data => {
                console.log(`${this.props.itemType} deleted!`)
                console.log(data)
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
                            (itemFields? itemFields.map( (field, i) =>{
                            return (<div><b>{field}</b>: {this.props.item[field]}<br/></div>)	
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
