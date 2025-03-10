# NC News Seeding

- Instructions for this sprint can be found at https://l2c.northcoders.com/courses/be/seeding-nc-news

Set-up step :

Step 1 - pre-requisites : Creating .env.\* files!

Since .env._ files are ignored by Git, anyone who clones my project won’t have access to the required environment variables. So the first step for anyone cloning this porject is to make their own .env._ files (\* doesn't mean anything ignore it for now).

Now to make the .env. file :

1: -Create TWO new file in the project you have git cloned, make sure the file is NOT created inside ANY folder!
2: -Name the TWO new file .env.test and .env.development
3: -copy and paste this line of code inside BOTH .env.test and .env.development file . Here is the line of code : PGDATABASE='nc_news'
4: -Yes,just this line is good! You are done with this step.

## These .env. files will enable developers to connect to both databases locally

app.js file :
app.js file is essesstially where we create the app using express.js and act as a main base of the app's operation.
All endpoints that the web app has will be created and implemented here. The main behaviour of the implementation of app.js is app.get(), this is where we call or connect with the actual endpoint and then return a status number ( .status() ) and .send (which is to "send" a HTTP response back to you with whatever in that endpoint)

# Status code

Status codes is an communication number from the server, after it receives your .get() request. These are the common status code number that you have to know, it can be easily understood by commonsense:

# Successful responses

- status code 200 , means its all OK
  The request succeeded, Whether the request is GET or POST or anything else. It means all ok and returning the correct value.

  In that sense, if you have a code of 200 but the value is not what you want, you may want to check if its the correct endpoint you want.

- 201 Created
  The request succeeded, and a new resource was created as a result. This is typically the respons e sent after POST requests, or some PUT requests.

- 204 No Content

  There is no content to send for this request, but the headers are useful. The user agent may update its cached headers for this resource with the new ones. # Client error responses

  -404 Bad Request

  The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).

  -404 Not Found
    The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
