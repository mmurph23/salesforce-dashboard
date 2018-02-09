// server/server.js
const httpClient = require('request');
const express = require('express');
const jsforce = require('jsforce');
const path = require('path');
const session = require('express-session');
const config = require('./config');
const bodyParser = require('body-parser');
const util = require('util');

// Setup HTTP server
const app = express();


//initialize session
app.use(session({secret: 'S3CRE7', resave: true, saveUninitialized: true}));

//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//jsForce connection
const oauth2 = new jsforce.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://your-unique-url.my.salesforce.com',
    //clientId and Secret will be provided when you create a new connected app in your SF developer account
    clientId : 'placeholder',
    clientSecret : 'placeholder',
    //redirectUri : 'http://localhost:' + port +'/token'
    redirectUri : 'http://localhost:3030/token'
});

// Serve static assets
/*app.use(express.static(path.join(__dirname, '../build')));*/

/**
* Login endpoint
*/
app.get("/auth/login", function(req, res) {
  // Redirect to Salesforce login/authorization page
  res.redirect(oauth2.getAuthorizationUrl({scope: 'api id web refresh_token'}));
});

/**
* Login callback endpoint (only called by Force.com)
*/
app.get('/token', function(req, res) {

    const conn = new jsforce.Connection({oauth2: oauth2});
    const code = req.query.code;
    conn.authorize(code, function(err, userInfo) {
        if (err) { return console.error("This error is in the auth callback: " + err); }

        console.log('Access Token: ' + conn.accessToken);
        console.log('Instance URL: ' + conn.instanceUrl);
        console.log('refreshToken: ' + conn.refreshToken);
        console.log('User ID: ' + userInfo.id);
        console.log('Org ID: ' + userInfo.organizationId);

        req.session.accessToken = conn.accessToken;
        req.session.instanceUrl = conn.instanceUrl;
        req.session.refreshToken = conn.refreshToken;

        var string = encodeURIComponent('true');
        res.redirect('http://localhost:3000/?valid=' + string);
    });
});


app.get('/api/toExtension', function(req, res){

});



//get a list of accounts.
app.get('/api/accounts', function(req, res) {

    // if auth has not been set, redirect to index
    if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }

    //SOQL query
    let q = 'SELECT id, name FROM account LIMIT 10';

    //instantiate connection
    let conn = new jsforce.Connection({
        oauth2 : {oauth2},
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
   });

   //set records array
    let records = [];
    let query = conn.query(q)
       .on("record", function(record) {
         records.push(record);
       })
       .on("end", function() {
         console.log("total in database : " + query.totalSize);
         console.log("total fetched : " + query.totalFetched);
         res.json(records);
       })
       .on("error", function(err) {
         console.error(err);
       })
       .run({ autoFetch : true, maxFetch : 4000 });
});

app.get('/api/casesByAccount', function(req, res) {

    // if auth has not been set, redirect to index
    if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }

    //SOQL query
    let q = "SELECT Name, Id, (SELECT Id, AccountId, CaseNumber FROM Cases) FROM Account WHERE Id IN (SELECT AccountId FROM Case)";

    //instantiate connection
    let conn = new jsforce.Connection({
        oauth2 : {oauth2},
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
   });

   //set records array
    let records = [];
    let query = conn.query(q)
       .on("record", function(record) {
         records.push(record);
       })
       .on("end", function() {
         console.log("total in database : " + query.totalSize);
         console.log("total fetched : " + query.totalFetched);
         res.json(records);
       })
       .on("error", function(err) {
         console.error(err);
       })
       .run({ autoFetch : true, maxFetch : 4000 });
});

//get account info for selected case
app.get('/api/getAccountInfo', function(req, res){

});

//get case info for selected case
app.get('/api/getCaseInfo', function(req, res){
     if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }

    //instantiate connection
    let conn = new jsforce.Connection({
        oauth2 : {oauth2},
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
   });

   var c = conn.sobject("Case").retrieve("500410000011nue", function(err, account) {
       if (err) { return console.error(err); }
       console.log("Name : " + account.Name);
       // ...
     });
     console.log(c)
});


//create a case
app.post('/api/createCase', function(req, res) {

        // if auth has not been set, redirect to index
        if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }


        let conn = new jsforce.Connection({
            oauth2 : {oauth2},
            accessToken: req.session.accessToken,
            instanceUrl: req.session.instanceUrl
          });

       //assign request body
       let p = req.body;
       //assign site URL to variable
       let website = p.WebSite;
       //parse request body to create case object for SF
       let payload = {
            AccountId: p.AccountId,
            Origin: 'Web',
            Subject: p.Subject,
            Description: p.Description,
            SuppliedName: p.SuppliedName,
            SuppliedEmail: p.SuppliedEmail
       }
       //set records array
       let recs = [];
       //set placeholder variable
       let x = '';
       //create query to return account Id
       let q = "SELECT Id FROM Account WHERE WebSite = '" + website + "'";
       conn.query(q)
       .then(res => {x = res.records[0].Id; console.log('This is the account Id: ' + x); return x})
       .then(res => {let y = res;
                     //assign accountId to case object
                     payload.AccountId = y;
                     //use jsForce to create a new case
                     let a = conn.sobject("Case").create(payload,
                           function(err, res) {
                                if (err) { return console.error(err); }

                                for (let i=0; i < res.length; i++) {
                                     if (res[i].success) {console.log("Created record id : " + res[i].id); return res[0].id}
                                }
                      });
                    return a; })
            //get case # and return to client (work in progress)
            .then(result => {recs.push(result); recs.map(rec => {console.log(rec.id); return res.json(rec.id)});});
});

app.post('/api/accountInfo', function(req, res){


     // if auth has not been set, redirect to index
    if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }

    //instantiate connection
    let conn = new jsforce.Connection({
        oauth2 : {oauth2},
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
   });

   let p = req.body;
   console.log(JSON.stringify(p));
   //assign site URL to variable
   let selectedAccount = p.selectedAccount;
   console.log(selectedAccount);
   //parse request body to create case object for SF
   //set records array
   let recs = [];
   //set placeholder variable
   let x = '';
   //create query to return account Id
   let q = "SELECT Name, Account.owner.name, Phone, Website, BillingCity, BillingCountry, BillingPostalCode, BillingState, BillingStreet FROM Account WHERE Id = '" + selectedAccount + "'";
   console.log(q);

   //set records array
    let records = [];
    let query = conn.query(q)
       .on("record", function(record) {
         records.push(record);
       })
       .on("end", function() {
         console.log("total in database : " + query.totalSize);
         console.log("total fetched : " + query.totalFetched);
         res.json(records);
       })
       .on("error", function(err) {
         console.error(err);
       })
       .run({ autoFetch : true, maxFetch : 4000 });
});



//get case to update
app.post('/api/caseToUpdate', function(req, res) {
     //jsforce function update(records, optionsopt, callbackopt)
     // if auth has not been set, redirect to index
     if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }

     let conn = new jsforce.Connection({
         oauth2 : {oauth2},
         accessToken: req.session.accessToken,
         instanceUrl: req.session.instanceUrl
       });

     //assign request body
     let p = req.body;
     console.log(JSON.stringify(p));
     let selectedCase = p.selectedCase;
     console.log("Selected Case on the server side: " + selectedCase);

     //set records array
     let recs = [];
     //set placeholder variable
     conn.sobject("Case").retrieve(selectedCase, function(err, cs) {
        if (err) { return console.error(err); }
        recs.push(cs);
        console.log("Case to update: " + JSON.stringify(recs));
        res.json(recs);
     });
});


//update case
app.post('/api/updateCase', function(req, res) {

        // if auth has not been set, redirect to index
        if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }


        let conn = new jsforce.Connection({
            oauth2 : {oauth2},
            accessToken: req.session.accessToken,
            instanceUrl: req.session.instanceUrl
          });

       //assign request body
       let p = req.body;

       //parse request body to create case object for SF
       let payload = {
            Id: p.CaseId,
            Subject: p.Subject,
            Description: p.Description
       }

       console.log("This is the payload on the server: " + JSON.stringify(payload));
       //set records array
       let recs = [];

       //set placeholder variable
       conn.sobject("Case").update(payload, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log('Updated Successfully : ' + ret.id);
            recs.push(ret.id);
            res.json(recs);
            // ...
       });
});

// Always return the main index.html, so react-router render the route in the client
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});*/

module.exports = app;
