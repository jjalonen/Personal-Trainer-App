import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class AddTraining extends Component {

    state = {
        open: false, date: '', duration: '', activity: '', customer:''
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }

      saveTraining = () => {
        const newTraining ={
            date: this.state.date,
            duration: this.state.duration,
            activity: this.state.activity,
            customer: this.props.customer
          
        };

        this.props.addTraining(newTraining);
        this.handleClose();
      };
        

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Training
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Training to Customer</DialogTitle>
          <DialogContent>            
            <TextField autoFocus margin="dense" name="date" value={this.state.date} onChange={this.handleChange} label="Date (YYYY-MM-DD)" fullWidth />
            <TextField margin="dense" name="duration" value={this.state.duration} onChange={this.handleChange} label="Duration" fullWidth />
            <TextField margin="dense" name="activity" value={this.state.activity} onChange={this.handleChange} label="Activity" fullWidth />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveTraining} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
            </div>
        );
    }
}

export default AddTraining;