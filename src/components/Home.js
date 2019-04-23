import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
//import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {trainings: [], open: false, message: ''}
}

componentDidMount() {
  this.fetchTrainings();
}

fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then (response => response.json())
    .then (jsondata => this.setState({trainings: jsondata}))
}

handleClose= () => {
    this.setState({open:false})
}

    render() {
        const columns = [
            {
                Header: 'Date',
                accessor: 'date',
                filterable: false,
                Cell: row => (
                    <span>
                        {moment(row.value).format("D.M.YYYY - hh:mm")}
                    </span>
                )
            },
            {
                Header: 'Duration',
                accessor: 'duration',
                
            
            },
            {
                Header: 'Activity',
                accessor: 'activity'
            },
            {
                Header: 'Firstname',
                accessor: 'customer.firstname'
            },
            {
                Header: 'Lastname',
                accessor: 'customer.lastname'
            },

        ]

        return (
            <div>
                
               <ReactTable filterable={true} data={this.state.trainings} columns={columns} />
               <Snackbar
                    open ={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      message={this.state.message}
                    />
            </div>
        );
    }
}

export default Home;