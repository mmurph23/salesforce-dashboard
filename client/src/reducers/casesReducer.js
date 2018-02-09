import {getValues} from 'redux-form';

//Action creator
const CASES_BY_ACCOUNT = "CASES_BY_ACCOUNT";
const CURRENT_CASE_INFO = "CURRENT_CASE_INFO";
const SELECTED_CASE = "SELECTED_CASE";
const CASE_TO_UPDATE = "CASE_TO_UPDATE";
const LOAD_CASE_INFO_TO_FORM = "LOAD_CASE_INFO_TO_FORM";
const LOAD_UPDATE_CONFIRM = "LOAD_UPDATE_CONFIRM";

//Reducer Action
export const loadCasesByAccount = (casesByAccount) => ({type: CASES_BY_ACCOUNT, payload: casesByAccount});
export const loadSelectedCase = (caseInfo) => ({type: CURRENT_CASE_INFO, payload: caseInfo});
export const updateSelectedCase = (caseId) => ({type: SELECTED_CASE, payload: caseId});
export const loadCaseToUpdate = (caseInfo) => ({type: CASE_TO_UPDATE, payload: caseInfo});
export const loadCaseInfoToForm = (formInfo) => ({type: LOAD_CASE_INFO_TO_FORM, payload: formInfo})
export const loadUpdateConfirm = (confirmId) => ({type: LOAD_UPDATE_CONFIRM, payload: confirmId})
//helper functions

//get a list of accounts for the loadAccounts action
export const fetchCasesByAccount = () => {
     return fetch('/api/casesByAccount', {credentials: "include"})
               .then(res => res.json())
}

//get selected case information
export const fetchCaseInfo = () => {
     return fetch('/api/getCaseInfo', {credentials: "include"})
               .then(res => res.json())
}

//get case to update
export const fetchCaseToUpdate = (request) => {
     console.log("Fetching request");
     return fetch(request)
               .then(res => res.json())
}

export const pushUpdatedCase = (request) => {
     console.log("pushing updated body: " + JSON.stringify(request.body));
     return fetch(request)
          .then(res => res.json())
}

//Action dispatch functions, links the fetch call to the the reducer action, which calls the reducer

//load form edit info into edit case form
export const dispatchLoadCaseInfoToForm = () => {
     return (dispatch, getState) => {
          let state = getState();
          let caseInfo = state.CASES.caseToUpdate[0].CaseNumber;
          console.log("This is the selected case info from dispatchLoadCaseInfoToForm: " + caseInfo)

          let initialValues = {
               SuppliedName: state.CASES.caseToUpdate[0].CaseNumber,
               SuppliedEmail: state.CASES.caseToUpdate[0].SuppliedEmail,
               Subject: state.CASES.caseToUpdate[0].Subject,
               Description: state.CASES.caseToUpdate[0].Description
          }
          dispatch(loadCaseInfoToForm(initialValues))
     }
}

//dispatch selected case
export const dispatchSelectedCase = (payload) => {
     return(dispatch, getState) => {
          dispatch(updateSelectedCase(payload))
     }
}

//dispatch call to get the case info to update
export const dispatchCaseToUpdate = (payload) => {
     return(dispatch, getState) => {
          /*let state = getState();
          console.log()
          let selectedCase = state.CASES.selectedCase;*/
          console.log('selected case payload from dispatchCaseToUpdate: ' + payload);
          let data = {
               selectedCase: payload,
          }

          const request = new Request('/api/caseToUpdate', {
               method: 'POST',
               body: JSON.stringify(data),
               headers:{'content-type': 'application/json'},
               credentials: 'include'
          });
          console.log("Sending Request");
          console.log(JSON.stringify(request));
          fetchCaseToUpdate(request)
           .then(caseToUpdate => dispatch(loadCaseToUpdate(caseToUpdate)))

     }
}

//dispatch call to update selected case
export const dispatchUpdateCase = (payload) => {
          return (dispatch, getState) => {
               let state = getState();
               let CaseId = state.CASES.selectedCase;
               let data = {
                    CaseId: CaseId,
                    Subject: payload.Subject,
                    Description: payload.Description

               }
               console.log("This is the selected Account Id: " + CaseId);

               console.log("This is the payload from dispatchUpdateCase: " + JSON.stringify(data))
               const request = new Request('/api/updateCase', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{'content-type': 'application/json'},
                    credentials: 'include'
               });

               pushUpdatedCase(request)
               .then(confirmId => dispatch(loadUpdateConfirm(confirmId)))
          }
}

//dispatch loadCasesByAccount
export const dispatchFetchCasesByAccount = () => {
     return (dispatch) => {
          fetchCasesByAccount()
          .then(casesByAccount => dispatch(loadCasesByAccount(casesByAccount)))
     }
}

//dispatch loadSelectedCase
/*export const dispatchSelectedCase = () => {
     return (dispatch) => {
          fetchCaseInfo()
               .then(caseInfo => dispatch(loadSelectedCase(caseInfo)))
     }
}*/

//Reducer
export default (state = [], action) => {

  switch (action.type) {
    case CASES_BY_ACCOUNT:
      return {...state, casesByAccount: action.payload}
    case CURRENT_CASE_INFO:
      return {...state, currentCaseInfo: action.payload}
    case SELECTED_CASE:
      return {...state, selectedCase: action.payload}
    case CASE_TO_UPDATE:
      return {...state, caseToUpdate: action.payload}
    case LOAD_CASE_INFO_TO_FORM:
      return {...state, initialValues: action.payload}
    case LOAD_UPDATE_CONFIRM:
      return {...state, confirmId: action.payload}
    default:
      return state;
  }
};
