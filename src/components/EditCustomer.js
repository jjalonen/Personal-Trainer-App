import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditCustomer extends Component {

    state = {
        open: false, firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
        this.setState({
            firstname: this.props.customer.firstname,
            lastname: this.props.customer.lastname,
            streetaddress: this.props.customer.streetaddress,
            postcode: this.props.customer.postcode,
            city: this.props.customer.city,
            email: this.props.customer.email,
            phone: this.props.customer.phone
        })
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }

      saveCustomer = () => {
        const customer ={
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        };

        this.props.editCustomer(this.props.link, customer);
        this.handleClose();
      };
      
      

    render() {
        return (
            <div>
                <Button size="small" variant="contained" color="primary" onClick={this.handleClickOpen}>EDIT        
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
          <DialogContent>            
          <TextField autoFocus margin="dense" name="firstname" value={this.state.firstname} onChange={this.handleChange} label="Firstname" fullWidth />
            <TextField margin="dense" name="lastname" value={this.state.lastname} onChange={this.handleChange} label="Lastname" fullWidth />
            <TextField margin="dense" name="streetaddress" value={this.state.streetaddress} onChange={this.handleChange} label="Street address" fullWidth />
            <TextField margin="dense" name="postcode" value={this.state.postcode} onChange={this.handleChange} label="Postcode" fullWidth />
            <TextField margin="dense" name="city" value={this.state.city} onChange={this.handleChange} label="City" fullWidth />
            <TextField margin="dense" name="email" value={this.state.email} onChange={this.handleChange} label="Email" fullWidth />
            <TextField margin="dense" name="phone" value={this.state.phone} onChange={this.handleChange} label="Phone" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveCustomer} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
            </div>
        );
    }
}

export default EditCustomer;