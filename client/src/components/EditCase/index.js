import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import { bindActionCreators } from 'redux'
import { Form, Field, reduxForm } from 'redux-form'

import { dispatchCaseCreate, loadCaseInfoToForm } from '../../reducers/stateReducer.js';
import {  dispatchLoadCaseInfoToForm, dispatchUpdateCase } from '../../reducers/casesReducer.js';



class EditCase extends Component {

     componentWillUpdate(nextProps, nextState) {

         if (this.props.initialValues !== nextProps.initialValues) {
              this.props.dispatchLoadCaseInfoToForm();
         }

    }

    render() {
          const { dispatchUpdateCase, handleSubmit, pristine, reset, submitting } = this.props
          return (
               <Form
                   className="editCase-form"
                   onSubmit={handleSubmit(dispatchUpdateCase)}>
                <legend>Edit Case</legend>

                <div>
                  <label>Subject</label>
                  <div className="form-group">
                    <Field
                      name="Subject"
                      component="input"
                      type="text"
                      placeholder="Test from CLI #7"
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <label>Description</label>
                  <div className="form-group">
                    <Field name="Description" component="textarea" className="form-control"/>
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                    Submit
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-seconday" disabled={pristine || submitting} onClick={reset}>
                    Reset
                  </button>
                </div>
               </Form>
          )
     }
};
//connect to react redux with no mapStateToProps, and pass dispatchCaseCreate as a prop. Then, wrap component in reduxForm



EditCase = reduxForm({
  form: 'editCase',
  enableReinitialize: true // a unique identifier for this form
})(EditCase);

// You have to connect() to any reducers that you wish to connect to yourself
EditCase = connect(
  state => ({
    initialValues: state.CASES.initialValues, // pull initial values from account reducer
  }),
  {dispatchLoadCaseInfoToForm, dispatchUpdateCase}, // bind account loading action creator
)(EditCase);

export default EditCase;


/*
const mapStateToProps = state => ({
     caseUpdateInfo: state.CASES.caseToUpdate
});

export default connect(mapStateToProps, {dispatchCaseCreate})(reduxForm({
  form: 'editCase', // a unique identifier for this form
  fields: ['SuppliedName', 'WebSite', 'SuppliedEmail', 'Subject', 'Description', 'AccountId'],
  initialValues: {}
})(EditCase));*/
