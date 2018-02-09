// src/components/App/index.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import { bindActionCreators } from 'redux'

import { dispatchSelectedCase } from '../../../reducers/casesReducer';


const CaseListItem = (props) => (
          <li className="list-group-item case-list-li">
               <a href="#"
                  key={props.csId}
                  id={props.aId}
                  onClick={() => props.dispatchSelectedCase(props.csId)}> {props.csNum} </a>
          </li>
);


const mapDispatchToProps = dispatch => bindActionCreators({
     dispatchSelectedCase
}, dispatch);

export default connect(
     null,
     mapDispatchToProps
)(CaseListItem);
