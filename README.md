multiparse
==========

This module exports a fresh new instance of the Parse Javascript SDK on every call, overriding the default Singleton-like behaviour. It achieves this by clearing node's `require.cache` of the parse module on every call

### Basic Usage
```javascript
var multiparse = require('multiparse');
var parse_dev = multiparse().Parse;
var parse_prod = multiparse().Parse;

parse_dev.initialize(DEV_APP_ID, DEV_JS_KEY);
parse_prod.initialize(PROD_APP_ID, PROD_JS_KEY);
```

### Execute a server-side action on behalf of a logged-in user, without maintaining any state on the server
```javascript
// This requires that the request to the server contains the session token assigned by Parse on the client side, as well as the Parse user ID
// For obvious reasons this should be done over a secure connection
var multiparse = require('multiparse');

var handler = function(request, response) {
    var temporary_parse = multiparse().Parse;
    temporary_parse.initialize(APP_ID, JS_KEY);

    var user_id = request.params.parse_user_id;
    var session_token = request.params.parse_session_token;
    if (user_id && session_token) {
        var User = Parse.Object.extend('_User');
        var current_user = new User();
        current_user.id = user_id;
        current_user._sessionToken = session_token;
        temporary_parse.User._currentUser = current_user;

        // Use the temporary_parse instance as if you were the user in their browser
    }
    else {
        // Send an error to the client
    }
}
```