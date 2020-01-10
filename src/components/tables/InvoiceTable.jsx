import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { invoices } from '../../components/data/invoices.js';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
   
  };

const customerDetails = (e) => {
    //console.log(e.target);
    var { id } = e.target;
    // console.log("See Details for Id: "+id);
    //hashHistory.push('/contacts/details/'+id);
}

const formatEditCustomerButton = (cell, row) => {
    let clickHandler = customerDetails;
    // var emptyContent = React.createElement('i', { id: row.id, onClick: clickHandler });
    var aBtn = React.createElement('button', { id: row.id, className: "btn btn-outline-primary mdi mdi-lead-pencil btn-sm", onClick: clickHandler });
    var bBtn = React.createElement('button', { id: row.id, className: "btn btn-outline-success mdi mdi-check btn-sm ml-2", onClick: clickHandler });
    var cBtn = React.createElement('button', { id: row.id, className: "btn btn-outline-info mdi mdi-email-outline btn-sm ml-2", onClick: clickHandler });
    var invoiceButtons = React.createElement('div', {}, aBtn, bBtn, cBtn);
    return invoiceButtons;
}

const { SearchBar } = Search;

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
        text: 'All', value: invoices.length
    }] // A numeric array is also available. the purpose of above example is custom the text
};

const columns = [{
    dataField: 'invoice_nr',
    text: 'Number',
    style: {
        fontWeight: 'bold'
      },
    sort: true

}, {
    dataField: 'invoice_date',
    text: 'Date',
    sort: true

}, {
    dataField: 'customer_name',
    text: 'Customer',
    sort: true

}, {
    dataField: 'amount',
    text: 'Amount',
    sort: true

}, {
    dataField: 'submitter',
    text: 'Submitter',
    sort: true

}, {
    dataField: 'due_date',
    text: 'Payment date',
    sort: true

}, {
    dataField: 'status',
    text: 'Status',
    sort: true,
    formatter: (cell, row) => {

        let rowStatus = row.status;

        if(rowStatus === true) {
            return (
                <div>
                    <span className="badge badge-success">Confirmed</span>
                </div>
            );
        } else if (rowStatus === false){
            return (
                <div>
                    <span className="badge badge-warning">On hold</span>
                </div>
            );
        }
            return (
                ""
            );
            
    }

},  {
    dataField: 'sent',
    text: 'Sent',
    sort: true,
    formatter: (cell, row) => {
        
        if(row.sent) {
           return(
           <div>
                <span class="mdi mdi-check" style={{color: "#29cc97", fontSize: "23px"}}></span>
            </div>
           );    
    }
        return (
            ""
        );
    }

}, {
    text: 'Action',
    formatter: (cell, row) => {

        if(row.status) {
            return (
                React.createElement('button', { id: row.id, className: "btn btn-outline-primary mdi mdi-lead-pencil btn-sm"})


            )
            
            
        }
    }
    
}];

export default class InvoiceTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const contentTable = ({ paginationProps, paginationTableProps }) => {

            return (
                <div className="card-body">

                    <ToolkitProvider
                        keyField="id"
                        columns={ columns }
                        data={ invoices }
                        search
                       
                    >
                        {
                            (toolkitprops) => {

                                return (
                                    <div>
                                        <div className="row-between">
                                            
                                            <div>
                                                <SizePerPageDropdownStandalone { ...paginationProps } />
                                            </div>

                                            <div>
                                                <button type="button" className="btn btn-success">Create new invoice</button>
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
                                                    selectRow= {selectRow}
                                                    {...toolkitprops.baseProps}
                                                    {...paginationTableProps}
                                                />
                                            </div>
                                        </div>
                                        <div className="row-between">
                                            <div className="col-sm-8">
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
                        <div className="col-12">
                            <div className="card card-default">

                                <div className="card-header card-header-border-bottom d-flex justify-content-between" id="recent-orders">
                                    <h2>Invoices</h2>
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

