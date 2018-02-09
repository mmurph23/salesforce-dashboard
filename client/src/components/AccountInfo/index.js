import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { dispatchSelectedAccountInfo } from '../../reducers/accountsReducer';
import { dispatchCaseToUpdate } from '../../reducers/casesReducer';

import './AccountInfo.css';


class AccountInfo extends Component {

     componentDidMount() {
       if (this.props.selectedAccountInfo == null) {
         this.props.dispatchSelectedAccountInfo();
         this.props.dispatchCaseToUpdate(this.props.selectedCase);
       }
     }

     /*   componentWillUpdate(nextProps, nextState) {
          if (nextProps.selectedCase !== this.props.selectedCase) {
         this.props.dispatchCaseToUpdate(nextProps.selectedCase);
       }
     } */

  render() {

    return (

         <div className="row">
            <div className="col-sm-8">
                  <h1>
                   Account Info
                  </h1>
                  {this.props.selectedAccountInfo ?
                       <div>
                         <address>
                           <div><strong>{this.props.selectedAccountInfo[0].Name}</strong></div>
                            <div><p>{this.props.selectedAccountInfo[0].BillingStreet}</p></div>
                      <div> <p>{this.props.selectedAccountInfo[0].BillingCity}, {this.props.selectedAccountInfo[0].BillingState} {this.props.selectedAccountInfo[0].BillingPostalCode}</p></div>
                           <div className="phone-wrap"><abbr title="Phone">P:</abbr> <p>{this.props.selectedAccountInfo[0].Phone}</p></div>
                         </address>
                         <div>
                         <bold>Primary Contact: </bold><p>{this.props.selectedAccountInfo[0].Owner.Name}</p></div>
                         </div>

                  : <div className="text-center">
                         <p className="text-center">No Account Selected</p>
                    </div>}
              </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedAccountInfo: state.ACCOUNTS.selectedAccountInfo,
  selectedAccount: state.ACCOUNTS.selectedAccount,
  selectedCase: state.CASES.selectedCase

});

const mapDispatchToProps = dispatch => bindActionCreators({
     dispatchSelectedAccountInfo,
     dispatchCaseToUpdate
}, dispatch);

export default connect(
     mapStateToProps,
     mapDispatchToProps
)(AccountInfo);
