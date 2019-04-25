import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {trainings: [], open: false, message: ''}
}

componentDidMount() {
  this.fetchCustomers();
}

fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then (response => response.json())
    .then (jsondata => this.setState({trainings: jsondata.content}))
}

addTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
      })
        .then(response => this.fetchCustomers())
        .then(response => this.setState({open:true, message:'New training saved'}))
        .catch(err => console.error(err))
}

handleClose= () => {
    this.setState({open:false})
}

    render() {
        const columns = [

            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 150,
                accessor: 'links.0.href',
                Cell: ({value}) => <AddTraining addTraining={this.addTraining} fetchCustomers={this.fetchCustomers} customer = {(value)}/>
            },
            {
                Header: 'Firstname',
                accessor: 'firstname'
            },
            {
                Header: 'Lastname',
                accessor: 'lastname'
            },
            {
                Header: 'Street address',
                accessor: 'streetaddress'
            },
            {
                Header: 'Postcode',
                accessor: 'postcode'
            },
            {
                Header: 'City',
                accessor: 'city'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Phone',
                accessor: 'phone'
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