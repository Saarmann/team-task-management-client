import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import { URL_API } from '../../config.js';
import '@trendmicro/react-modal/dist/react-modal.css';
import Modal from '@trendmicro/react-modal';

const axios = require("axios");

const { SearchBar } = Search;

const userDetails = (e) => {

    var { id } = e.target;
}

const formatEditUserButton = (cell, row) => {
    let clickHandler = userDetails;
    var aBtn = React.createElement('button', { id: row.id, className: "btn btn-outline-primary mdi mdi-lead-pencil btn-sm", onClick: clickHandler });
    var bBtn = React.createElement('button', { id: row.id, className: "btn btn-outline-success mdi mdi-check btn-sm ml-2", onClick: clickHandler });
    var cBtn = React.createElement('button', { id: row.id, className: "btn btn-outline-info mdi mdi-email-outline btn-sm ml-2", onClick: clickHandler });
    var userButtons = React.createElement('div', {}, aBtn, bBtn, cBtn);
    return userButtons;
}

const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
    </span>
);

const paginationConfig = {
    custom: true,
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [{
        text: '10', value: 10
    }, {
        text: '25', value: 25
    }, {
        text: '50', value: 50
    }, {
        text: '100', value: 100
    }, {
        text: 'All', value: 1000000
    }] // A numeric array is also available. the purpose of above example is custom the text
};

const columns = [{
    dataField: 'firstname',
    text: 'Firstname',
    style: {fontWeight: "normal"}

}, {
    dataField: 'lastname',
    text: 'Lastname'

}, {
    dataField: 'email',
    text: 'Email'

}, {
    dataField: 'role.role',
    text: 'Role'

},{
    text: 'Action',
    headerAlign: 'center',
    style: {
        textAlign: 'center'
    },
    formatter: formatEditUserButton
}];

export default class UserTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teamMembers: [],
            openModal: false
            
        }

        this.showUserList = this.showUserList.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount (){
        this.showUserList();
    }

    showUserList() {
        axios.get(URL_API + `/user/team`)
            .then((users) => {

                this.setState({ teamMembers: users.data });

            }).catch((exception) => {
                console.log(exception);
            });
    }

    openModal () {
        this.setState({openModal: true});
    }

    closeModal() {
        this.setState({openModal: false});
    }

    addTeamMember() {

    }

    render() {

        const contentTable = ({ paginationProps, paginationTableProps }) => {

            return (
                <div className="card-body">

                    <ToolkitProvider
                        keyField="id"
                        columns={ columns }
                        data={ this.state.teamMembers }
                        search
                    >
                        {
                            (toolkitprops) => {

                                return (
                                    <div>
                                         {   
                                            this.state.openModal &&
                                            <Modal size={400} onClose={ this.closeModal}>
                                                <Modal.Header>
                                                    <Modal.Title>
                                                        Add new customer
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body padding>
                                                        
                                                                <div className="card-body">
                                                                    <form >
                                                                        <div className="form-row">
                                                                            <div className="col-md-12 mb-3">
                                                                                <label for="validationServer01">Customer name</label>
                                                                                <input type="text" value={this.customerName} onChange={(e) => this.setState({customerName: e.target.value})} className="form-control" id="validationServer01" placeholder="Company name" required/>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="form-row">
                                                                            <div className="col-md-6 mb-3">
                                                                                <label for="validationServer03">Registration code</label>
                                                                                <input type="text" value={this.registrationCode} onChange={(e) => this.setState({registrationCode: e.target.value})} className="form-control" id="validationServer03" placeholder="Code" required/>
                                                                            </div>
                                                                            <div className="col-md-6 mb-3">
                                                                                <label for="validationServer04">VAT No.</label>
                                                                                <input type="text" value={this.vatNo} onChange={(e) => this.setState({vatNo: e.target.value})} className="form-control" id="validationServer04" placeholder="Number"/>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-row">
                                                                            <div className="col-md-6 mb-3">
                                                                                <label for="validationServer01">Address</label>
                                                                                <input type="text" value={this.address} onChange={(e) => this.setState({address: e.target.value})} className="form-control" id="validationServer01" placeholder="Street address"/>
                                                                            </div>
                                                                            <div className="col-md-6 mb-3">
                                                                                <label for="validationServer03">City</label>
                                                                                <input type="text" value={this.city} onChange={(e) => this.setState({city: e.target.value})} className="form-control" id="validationServer03" placeholder="City"/>
                                                                            </div>

                                                                        </div>

                                                                        <div className="form-row">
                                                                            <div className="col-md-6 mb-3">
                                                                                <label for="validationServer03">Country</label>
                                                                                <input type="text" value={this.country} onChange={(e) => this.setState({country: e.target.value})} className="form-control" id="validationServer03" placeholder="Country"/>
                                                                            </div>
                                                                            <div className="col-md-3 mb-3">
                                                                                <label for="validationServer04">State</label>
                                                                                <input type="text" value={this.state} onChange={(e) => this.setState({state: e.target.value})} className="form-control" id="validationServer04" placeholder="State"/>

                                                                            </div>
                                                                            <div className="col-md-3 mb-3">
                                                                                <label for="validationServer05">Zip</label>
                                                                                <input type="text" value={this.zip} onChange={(e) => this.setState({zip: e.target.value})} className="form-control" id="validationServer05" placeholder="Zip"/>

                                                                            </div>
                                                                        </div>

                                                                        <div className="form-row">
                                                                            <div className="col-md-12 mb-3">
                                                                                <label for="validationServer02">Email address</label>
                                                                                <input type="text" value={this.customerEmail} onChange={(e) => this.setState({customerEmail: e.target.value})} className="form-control" id="validationServer02" placeholder="Email"/>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-row">
                                                                            <div className="col-md-6 mb-3">
                                                                                <label for="validationServer03">Contact</label>
                                                                                <input type="text" value={this.contact} onChange={(e) => this.setState({contact: e.target.value})} className="form-control" id="validationServer03" placeholder="Phone number"/>

                                                                            </div>
                                                                            <div className="col-md-6 mb-3">
                                                                                <label for="validationServer04">Payment term</label>
                                                                                <input type="text" value={this.paymentTerm} onChange={(e) => this.setState({paymentTerm: e.target.value})} className="form-control" id="validationServer04" placeholder="Days"/>
                                                                            </div>
                                                                        </div>
                                                                                                                                            
                                                                    </form>
                                                                </div>
                                                          
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <button type="button" class="btn btn-primary" onClick={ this.saveCustomer }>Save customer</button>
                                                    <button type="button" class="btn btn-danger" onClick={ this.closeModal }>Close</button>
                                                   
                                                </Modal.Footer>
                                            </Modal>

                                        }

                                        <div className="row-between">
                                            
                                            <div>
                                                <SizePerPageDropdownStandalone { ...paginationProps } />
                                            </div>

                                            <div>
                                                <button type="button" className="btn btn-success">Add team member</button>
                                                </div>

                                            <div>                                                
                                                <SearchBar {...toolkitprops.searchProps} />                                                     
                                               
                                            </div>
                                        </div>
                                        <br />

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <BootstrapTable
                                                    bordered={false}
                                                    hover
                                                    {...toolkitprops.baseProps}
                                                    {...paginationTableProps}
                                                />
                                            </div>
                                        </div>
                                        <div className="row-between">
                                            <div className="col-sm-9">
                                            </div>
                                            <div>
                                                <div>
                                                    <PaginationListStandalone {...paginationProps}   />
                                                </div>                                                   
                                            </div>
                                        </div>
                                    </div>);


                            }
                        }
                    </ToolkitProvider>          

                </div>
            );
        }

        return (
            <div className="content-wrapper">
                <div className="content">

                    <div className="row">
                        <div className="col-9">
                            <div className="card card-default">

                                <div className="card-header card-header-border-bottom d-flex justify-content-between" id="recent-orders">
                                    <h2>Team members</h2>
                                </div>
                                
                                <PaginationProvider pagination={paginationFactory(paginationConfig)} >
                                    {contentTable}
                                </PaginationProvider>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}