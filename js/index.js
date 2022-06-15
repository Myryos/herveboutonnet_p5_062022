let json = null;
// a tranforme en script js independant (fonction)
fetch("http://localhost:3000/api/products/").then(function(res){
    if (res.ok)
    {
        return res.json();
    }
})
.then(function(value)
{
    json = value;
});

setTimeout(function(){
    console.log("Longueur du json: "+json.length);
    parseProducts(json)
}, 250);


//Fonction pour parse le json dans des les produits dans des <articles>
async function parseProducts(products)
{
    var items = document.getElementById("items");
    products.forEach(product => {
        console.log(product);
        //Zone dee creation des elements DOM des produit et mise en enfant pour que le css fonctionne
        var link = document.createElement("a");
        var article = document.createElement("article");
        var img = document.createElement("img")
        var title = document.createElement("h3");
        var text = document.createElement("p");
        
        article.appendChild(img);
        article.appendChild(title);
        article.appendChild(text);
        link.appendChild(article);

        link.setAttribute("href", "./product.html?id="+product._id);
        img.setAttribute("src", product.imageUrl)
        img.setAttribute("alt", product.altText)
        title.innerHTML = product.name;
        text.innerHTML = product.description;



        items.appendChild(link);
    });
}

function initElement(element)
{
    return document.createElement(element)
}