

function handleNotExistEndpoint(request, response, next){
    console.log("error reached")
    response.status(404).send({msg: "Not found"})
}


module.exports=handleNotExistEndpoint