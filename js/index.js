let items = document.getElementById("items");

let json = requestAPI(" ", false);

setTimeout(function(){
    parseProducts(json, items, "all")
}, 250);


function asyncCall()
{

}