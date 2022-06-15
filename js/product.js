var paramID = window.location.search.replace("?id=","");

let jsonProduct;

fetch("http://localhost:3000/api/products/"+paramID).then(function(res){
    if (res.ok)
    {
        return res.json();
    }
})
.then(function(value)
{
    jsonProduct = value;
});

setTimeout(function(){

    
    let divImg= document.getElementById("item_img");
    let img = document.createElement("img")
    let titleProduct = document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    let quantity = document.getElementById("quantity")
    let options = document.getElementById("colors");
    let button = document.getElementById("addToCart");

    
    document.title = jsonProduct.name;
    img.setAttribute("src", jsonProduct.imageUrl)
    img.setAttribute("alt", jsonProduct.altText)
    divImg.appendChild(img);
    titleProduct.innerHTML = jsonProduct.name;
    price.innerHTML = jsonProduct.price;
    description.innerHTML = jsonProduct.description;
    createColorsOption(options, jsonProduct.colors);
    button.onclick = function() {
        saveSelection(jsonProduct.name, jsonProduct._id, quantity.value, options);
    };
},200);


//Creer les element html <option> pour le <sleect> id color
function createColorsOption(optionsColors, colorsProducts)
{

    colorsProducts.forEach(color => {

        var colorOption = document.createElement("option");
        colorOption.innerHTML = color;
        colorOption.setAttribute("value", color.toLowerCase());
        optionsColors.appendChild(colorOption);
        
    });

}


//permet de sauvegarde la selection de l'acticle
function saveSelection(name, id, quantity, color)
{
    var product = 
    {
        "id" : id,
        "quantite" : quantity,
        "couleur" : color.options[color.selectedIndex].text
    };

    sessionStorage.setItem(name , JSON.stringify(product));
    console.log(sessionStorage);
}