# employee-app

The project is based on client-server architecture

### Prerequisites
For usiing the app client must install all the dependencies of project

**server is running in the port 5000**

**for registration use** ``` /api/user/register```
**for login use** ``` /api/auth/login```
<div style = "font-family : Courier, monospace">
on client side the app get you credentials and server checked your you're registered or not.
If registered then you must be registerd first, server call  serviceApi to registered your details.

 <br />

credentials like password is highly sensitive that's why another api call who stored in the form of bcrypt so that no one actully get you password.

 <br />

after successfully login you'll be redirected to login page, where you enter you're registered email id and password server matched you're authetntication with an authApi with database, based on that api redirected to you on homepage, if not autenticated you got error email id or password is incorrect
on successfully completion user get the JWT token, which authrize them to access to authorize pages.
 
 <br />

no one got authrization without token, on successfully logout token will be ended.

</div>

**admin : Pawan Kumar**

**mentor : Sunil Garg**
