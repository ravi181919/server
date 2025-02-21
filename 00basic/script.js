const express = require('express'); //
const app = express(); //


// how to recive the request, and how to send the  data on browser or fronted,  according to the specific route
app.get('/', function(request, response){
    // get.("/") =>  is define when the request is comming from this route, then u can send the data or response 
    response.send("Hello") 
    // for send the response on the webBrowser or fronted
})


app.listen(3000)  // for start the server on PORT (3000)