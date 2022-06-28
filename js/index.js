let items = document.getElementById("items");
requestAPI(" ", false)
.then(function(json)
{
    parseProducts(json, items, "all");
})
.catch(function(msg){
    debug(msg, "");
});