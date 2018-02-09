import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import { bindActionCreators } from 'redux'
import { Form, Field, reduxForm } from 'redux-form'

import { dispatchCaseCreate } from '../../reducers/stateReducer.js';



let CreateCase =  ({ dispatchCaseCreate, fields: {SuppliedName, WebSite, SuppliedEmail, Subject, Description, AccountId}, handleSubmit, pristine, reset, submitting }) => (

    <Form
         className="createCase-form"
         onSubmit={handleSubmit(dispatchCaseCreate)}>
      <legend>Create A Case</legend>
      <div>
        <label>Full Name</label>
        <div className="form-group">
          <Field
            name="SuppliedName"
            component="input"
            type="text"
            placeholder="Full Name"
            className="form-control"
            {...SuppliedName}
          />
        </div>
      </div>
      <div>
        <label>DDC Website URL</label>
        <div className="form-group">
          <Field
            name="WebSite"
            component="input"
            type="text"
            placeholder="www.example.com"
            className="form-control"
            {...WebSite}
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div className="form-group">
          <Field
            name="SuppliedEmail"
            component="input"
            type="email"
            placeholder="Email"
            className="form-control"
            {...SuppliedEmail}
          />
        </div>
      </div>
      <div>
        <label>Subject</label>
        <div className="form-group">
          <Field
            name="Subject"
            component="input"
            type="text"
            placeholder="Test from CLI #7"
            className="form-control"
            {...Subject}
          />
        </div>
      </div>
      <div>
        <label>Description</label>
        <div className="form-group">
          <Field name="Description" component="textarea" className="form-control" {...Description}/>
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
);
//connect to react redux with no mapStateToProps, and pass dispatchCaseCreate as a prop. Then, wrap component in reduxForm
export default connect(null, {dispatchCaseCreate})(reduxForm({
  form: 'createCase', // a unique identifier for this form
  fields: ['SuppliedName', 'WebSite', 'SuppliedEmail', 'Subject', 'Description', 'AccountId'],
  initialValues: {AccountId: 'placeholder'}
})(CreateCase));
