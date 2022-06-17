var paramID = "" + window.location.search.replace("?id=","");
let jsonProduct = [];
jsonProduct = requestAPI(paramID, false);

setTimeout(function(){

    jsonProduct.forEach(product => {
        let divImg= document.getElementById("item_img");
        let img = document.createElement("img")
        let titleProduct = document.getElementById("title");
        let price = document.getElementById("price");
        let description = document.getElementById("description");
        let quantity = document.getElementById("quantity")
        let options = document.getElementById("colors");
        let button = document.getElementById("addToCart");
        let error = document.getElementById("colorErrorMsg");

        
        document.title = product.name;
        img.setAttribute("src", product.imageUrl)
        img.setAttribute("alt", product.altText)
        divImg.appendChild(img);
        titleProduct.innerHTML = product.name;
        price.innerHTML = product.price;
        description.innerHTML = product.description;
        createColorsOption(options, product.colors);
        options.onchange = function() {
            error.innerHTML = "";
        }
        button.onclick = function() {
            if(options.selectedIndex != 0)
                saveSelection(product.name, product._id, quantity.value, options);
            else
                error.innerHTML = "Veuillez selectionner une couleur"
            };

            
        
    });
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
    let key  =  name + "/" + color.options[color.selectedIndex].text ;
    var product = 
    {
        "id" : id,
        "quantite" : quantity,
        "couleur" : color.options[color.selectedIndex].text
    };
    if(!checkStorage(key))
    {
        sessionStorage.setItem( key, JSON.stringify(product));
    }
    if(checkStorage(key))
    {
        updateQuantity(key, quantity);
    }
}
// REFAIRE LES 2 FONCTION 
function checkS torage(key)
{
    var bool;
   
        if(sessionStorage.key(i) == key)
            bool = true;
        else
            bool = false;
   return bool;

}

function updateQuantity(key, quantity)
{
    let product = sessionStorage(key);
    let r = 0;
    console.log(product);
}