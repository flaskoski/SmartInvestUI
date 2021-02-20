import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import "./CrudModal.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

class CrudAddModal extends Component {
    constructor(props) {
        //console.log("constructor", props.open)
        super(props);
        this.state = {
            open: false
        }
        // this.handleClickOpen = this.handleClickOpen.bind(this)
    }
    componentWillReceiveProps(newProps) {
        this.setState({open: newProps.open})
    }
    // handleClickOpen () {
    //     this.setState({open: true});
    // };
    render() {
        const handleClose = () => {
            this.setState({open: false});
        };  
        const text = "";
        if(this.props.children)
            text =  <DialogContentText>
                        {this.props.children}
                    </DialogContentText>
        return (
            <div>
                {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Open form dialog
                </Button> */}
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add {this.props.itemType}</DialogTitle>
                    <DialogContent>
                    {text}
                    
                    {this.props.itemFields.map((field, i) =>{	
                            return (	
                                <TextField
                                // autoFocus
                                margin="dense"
                                id={field.name}
                                label={field.name}
                                type={field.type}
                                fullWidth
                                // {field.size? field.size : fullWidth}
                                />		
                                //  required={field.isRequired} />
                                
                            );
                        }) }	
                   
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>

            // <div className="modal" tabIndex="-1" role="dialog">
            //     <div className="modal-dialog" role="document">
            //         <div className="modal-content">
            //             <div className="modal-header">
            //                 <h5 className="modal-title">{this.props.itemType}</h5>
                            
            //                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            //                     <span aria-hidden="true">&times;</span>
            //                 </button>
            //             </div>
            //             <div className="modal-body">
            //                 <p>Modal body text goes here.</p>
            //             </div>
            //             <div className="modal-footer">
            //                 <button type="button" className="btn btn-primary">Save changes</button>
            //                 <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            //             </div>	
            //         </div>
            //     </div>
            // </div>
         );
    }
}


 
export default CrudAddModal;

{/* <!-- Edit Modal HTML -->
<div id="editEmployeeModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form>
				<div class="modal-header">						
					<h4 class="modal-title">Edit Employee</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Name</label>
						<input type="text" class="form-control" required>
					</div>
					<div class="form-group">
						<label>Email</label>
						<input type="email" class="form-control" required>
					</div>
					<div class="form-group">
						<label>Address</label>
						<textarea class="form-control" required></textarea>
					</div>
					<div class="form-group">
						<label>Phone</label>
						<input type="text" class="form-control" required>
					</div>					
				</div>
				<div class="modal-footer">
					<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
					<input type="submit" class="btn btn-info" value="Save">
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Delete Modal HTML -->
<div id="deleteEmployeeModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form>
				<div class="modal-header">						
					<h4 class="modal-title">Delete Employee</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<p>Are you sure you want to delete these Records?</p>
					<p class="text-warning"><small>This action cannot be undone.</small></p>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
					<input type="submit" class="btn btn-danger" value="Delete">
				</div>
			</form>
		</div>
	</div>
</div> */}