let paramID = "" + window.location.search.replace("?id=","");
requestAPI(paramID, false)
.then(function(json)
{
    json.forEach(product => {
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
        button.onclick = function() 
        {
            if(options.selectedIndex != 0)
                saveSelection(product.name, product._id, quantity.value, options);
            else
            {
                error.innerHTML = "Veuillez selectionner une couleur"
            };
        }
    })
})
.catch(function(msg)
{
    console.log("Error : " + msg);
})
//Creer les element html <option> pour le <select> id color
function createColorsOption(optionsColors, colorsProducts)
{

    colorsProducts.forEach(color => {

        let colorOption = document.createElement("option");
        colorOption.innerHTML = color;
        colorOption.setAttribute("value", color.toLowerCase());
        optionsColors.appendChild(colorOption);
        
    });

}

//permet de sauvegarde la selection de l'acticle
function saveSelection(name, id, quantity, color)
{    
    let key  =  name + "/" + color.options[color.selectedIndex].text ;
    let product = 
    {
        "id" : id,
        "quantite" : quantity,
        "couleur" : color.options[color.selectedIndex].text
    };
    if(!checkStorage(key))
        localStorage.setItem( key, JSON.stringify(product));
    
    else if(checkStorage(key))
        updateQuantity(key, quantity);   
}

//Permet de verifier si un key est deja utilise dans le localStorage
function checkStorage(key)
{
    let bool = false;
    let check = true
    
    for(let i = 0; i < localStorage.length; i++)
    {
        if(localStorage.key(i) == key && check)
        {
            bool = true;
            check = false;
        }
        if(localStorage.key(i) != key && check)
        {
            bool = false;
        }
    }
   return bool;

}

//Permet d'augmente la quantite du produits si la cle existe

function updateQuantity(key, quantity)
{
    let product =JSON.parse(localStorage.getItem(key));
    
    localStorage.removeItem(key);
    
    let r =parseInt(product.quantite) + parseInt(quantity);
    
    product.quantite = JSON.stringify(r);
    
    localStorage.setItem( key, JSON.stringify(product));
}