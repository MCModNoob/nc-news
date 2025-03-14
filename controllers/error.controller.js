

function handleNotExistEndpoint(request, response, next){
    console.log("Not Exist Endpoint")
    response.status(404).send({msg: "Not found"})
}


module.exports=handleNotExistEndpoint