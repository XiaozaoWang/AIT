AGENDA

* working w/ forms review
* persist data between requests
    * by supplying id to client
* alternative to using callbacks - promises
* mongodb
    * homebrew
    * download installer

office hours after class outside of 101

/complaints/add

[ subway line  \/ ]
|---------------|
| complaint     |
|               |
|               |
|---------------|
[ ] delay  [ ] cleanliness  [ ] safety

[complain]
^
press on this button will take us to /complaints


/complaints


F train didn't come for 15 minutes    delay, safety
A someone spilled coffee              cleanliness 

/

redirect to /complaints



remember the client that has visited us

y is it useful to maintain state between http requests?

* keeping data persistent for a return client
* analytics (site visits)
* tracking


how can we do this?

* whenever client visits.... give me a unique id for yourself (something that I, as the server, will have assigned to you)
* maybe put id within the header
    * custom header <-----
    * Cookie: name=value;name2=value2
    *         ^^^ sessionid=1234
    * 🚫path... index.html?sessionid=321412341251251251254
    * 🚫 in body.... but this requires all requests to be posts, inconvenient
    

session management

* keep data on the server about a client
* based on unique id for that client


1. some new client visits site
2. server sees that no session is sent (either there's no cookie header or cookie header does not contain session id)
3. server generates new session id
4. sends a response that sets a session cookie
5. every subsequent request from client will now have cookie header with that session id
6. every subsequent request on server will cause server to unlock data behind that session id


session management =/= authentication
cookies =/= session management

(can be used for sess management, but only that)

* store a little bit of data on the client (ON THE CLIENT)
* other ways to store data on client, localstorage for example
* u can examine cookies through inspector



HTTP request
one header for sending cookies to server
Cookie: name=value;name2=value2

HTTP response
multiple Set-Cookie headers to set cookie

Set-Cookie: sessid=asdfaq2349u139rjislefij;secure;httpOnly
Set-Cookie: favcolor=blue


when u set a cookie, these are the options

security

* domain and path - the domain and path that cookies will be sent to 
* httpOnly - frontend javascript can't read ur cookies
* secure - cookies will only be sent when request is over https
* sameSite - determines when cookies will be sent in a cross site context
    * lax - cookies will be sent if user navigation
    * strict - cookies will never be sent in cross site context
    * 💀none

other

* expires, max-age



SERVER                                                                CLIENT
                    <-------------------
                     (no cookie or cookie does not have sess id)

server
generates 
sess id               --------------------------------->
                       Response
                       Set-Cookie: sessid=123123123; Secure; HttpOnly

                   
                      <-------------------------------------------
                        Cookie: sessid=123123123

server
sees the
session id
in cookie header
and retrieves data

req.session
^^^^
any data
associated with 
session
