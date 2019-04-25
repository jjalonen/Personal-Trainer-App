import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';



class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {customers: [], open: false, message: ''}
}

componentDidMount() {
  this.fetchCustomers();
}

fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then (response => response.json())
    .then (jsondata => this.setState({customers: jsondata.content}))
}

addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)      
        })
        .then(response => this.fetchCustomers())
        .then(response => this.setState({open:true, message:'New customer saved'}))
        .catch(err => console.error(err));
}

editCustomer = (link, customer) => {
    fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)      
        })
        .then(response => this.fetchCustomers())
        .then(response => this.setState({open:true, message:'Changes saved'}))
        .catch(err => console.error(err));
}

deleteCustomer = (link) => {
    if (window.confirm("Are you sure?")) {
    fetch(link, {method: 'DELETE'})
    .then(response => this.fetchCustomers())
    .then(response => this.setState({open:true, message:'Customer deleted'}))
    .catch(err => console.error(err))
    }
}


handleClose= () => {
    this.setState({open:false})
}

    render() {
        const columns = [

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
            {
                Header: "",
                filterable: false,
                sortable: false,
                width: 90,
                accessor: "links.0.href", 
                Cell: ({value, row}) => (<EditCustomer editCustomer={this.editCustomer} customer={row} link={value} />)
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 160,
                accessor: 'links.0.href',
                Cell: ({value}) => <Button color="secondary" variant="contained" size="small" onClick={() => this.deleteCustomer(value)}>DELETE CUSTOMER</Button>
            }
        ]

        return (
            <div>
                <AddCustomer addCustomer={this.addCustomer} />

               <ReactTable filterable={true} data={this.state.customers} columns={columns} />
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

export default CustomerList;