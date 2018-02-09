
const config = {
// Salesforce client settings for Force.com connection
     'jsforce' : {
    // OAuth2 service
    // OAuth authentication domain
    // For production or DE use
    loginUrl : 'https://bspoke-dev-ed.my.salesforce.com',
    // For sandbox use
    //domain : 'https://test.salesforce.com',

    // URL called by Force.com after authorization and used to extract an authorization code.
    // This should point to your app and match the value configured in your App in SFDC setup)
    redirectUri : 'http://localhost:3000/auth/callback',

    // Set of secret keys that allow your app to authenticate with Force.com
    // These values are retrieved from your App configuration in SFDC setup.
    // NEVER share them with a client.
    clientId : '3MVG9szVa2RxsqBZjh_k.RvJXDUONto6617zQuwcaGLwh_E8jSnT2Vw8u1Trf3.gqNNP44UmnGDdDDtSQDhGs',
    clientSecret : '73500702797681914',
     },
  // Data service




// Express server configuration
  'server' : {
       // Server HTTP port
       port : 3000,

       // Whether the server is configured with HTTPS
       isHttps : false,

       // Secret key used to encrypt user sessions
       sessionSecretKey : 'mySecretK3y!'
 },

//dummy data
/*
'records': {
     [ { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000D86Q6AAJ' },
           Id: '0014100000D86Q6AAJ',
           Name: 'Test1' },
          { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000DEWfeAAH' },
           Id: '0014100000DEWfeAAH',
           Name: 'Edge Communications' },
          { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000DEWffAAH' },
           Id: '0014100000DEWffAAH',
           Name: 'Burlington Textiles Corp of America' },
          { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000DEWfgAAH' },
           Id: '0014100000DEWfgAAH',
           Name: 'Pyramid Construction Inc.' },
          { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000DEWfhAAH' },
           Id: '0014100000DEWfhAAH',
           Name: 'Dickenson plc' },
          { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000DEWfiAAH' },
           Id: '0014100000DEWfiAAH',
           Name: 'Grand Hotels & Resorts Ltd' },
          { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000DEWfkAAH' },
           Id: '0014100000DEWfkAAH',
           Name: 'Express Logistics and Transport' },
          { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000DEWflAAH' },
           Id: '0014100000DEWflAAH',
           Name: 'University of Arizona' },
          { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000DEWfoAAH' },
           Id: '0014100000DEWfoAAH',
           Name: 'GenePoint' },
          { attributes:
            { type: 'Account',
             url: '/services/data/v39.0/sobjects/Account/0014100000DEWfmAAH' },
           Id: '0014100000DEWfmAAH',
           Name: 'United Oil & Gas, UK' } ]
      } */
 }


module.exports = config;
