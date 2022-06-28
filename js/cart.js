let productsCart = [];

let productsInfos = [];
let items = document.getElementById("cart__items");
let divOrder = document.getElementById("cart__order");
let btnOrder = document.getElementById("order");
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let fName = document.getElementById("firstName");
let lName = document.getElementById("lastName");
let addr = document.getElementById("address");
let city = document.getElementById("city");
let mail = document.getElementById("email");
let isOk = false;
    
for (let x = 0; x < localStorage.length; x++)
{
    productsCart.push(JSON.parse(localStorage.getItem(localStorage.key(x))));
};

getInfo(productsCart)
.then(function(array)
{
    productsInfos = array;
    parseProducts(productsInfos, items, "cart", productsCart);

    totalPrice.innerHTML = setCartPrice(productsCart, productsInfos);
    totalQuantity.innerHTML = setCartQuant(productsCart);

    items.onchange = function()
    {
        updateCart(totalQuantity, totalPrice);
    };
    items.onclick =function(){
    
        updateCart(totalQuantity, totalPrice);
    };
    divOrder.onclick == function()
    {
        isOk = checkRegEx(fName);
        isOk = checkRegEx(lName);
        isOk = checkRegEx(addr);
        isOk = checkRegEx(city);
        isOk = checkRegEx(mail);
    }

    let delItems = document.querySelectorAll("[class=deleteItem]");
    delItems.forEach(element => {
        element.onclick = function()
        {
            for(let i = 0; i < productsCart.length; i++)
            {
                delEventListener(element, productsCart[i].id);
            }
        }   
    });
});

  

fName.onchange = function(){
    //test le pattern/value
    isOk = checkRegEx(fName);
};
lName.onchange = function(){
    //test le pattern/value
    isOk = checkRegEx(lName);
};
addr.onchange = function(){
    isOk = checkRegEx(addr);
}
city.onchange = function(){
    isOk = checkRegEx(city);
}
mail.onchange = function(){
    isOk = checkRegEx(mail);
}

btnOrder.onclick = function(){
    isOk = onClickRegEx([fName, lName, addr, city, mail])
    if(isOk)
         submitOrder(productsCart, fName, lName, addr, city, mail);
};
               

//Prmet de lancer requestAPI() pour x objets de l'array.
function getInfo(array)
{
    return new Promise((resolve, reject) => {
        let info = [];
        for (let i = 0; i < array.length; i++)
        {
            requestAPI(array[i].id, false)
            .then(function(jsons)
            {
                jsons.forEach(json => 
                {
                    info.push(json)
                    if(info.length == array.length)
                    {
                        resolve(info)
                    }
                });
            });
        }
    })
    
}

// Set la quantite total au lancement de la page
function setCartQuant(cart)
{
    let q = 0;
    for(let i = 0; i < cart.length; i++)
    {
        q += parseInt(cart[i].quantite);
    }
    let qq = "" + q;
    return qq;
}

//Set le prix total au lancement de la page
function setCartPrice(cart, info)
{
    let p = 0;
    for( let i = 0; i< cart.length; i++)
    {
        p += parseInt(cart[i].quantite) * parseInt(info[i].price);
    };
    let pp = "" +  p;
    return pp;
}

// Permet d'efface de toute part sur un bouton l'elemment html, vider la place d''une array et et vide le localstorage
function delEventListener(element, id)
{
    parent = getGrandParent(element);

    localStorage.removeItem(element.id);

    for(let i = 0; i < productsCart.length; i++)
    {
        if (id == productsCart[i].id)
        {
            let tmp = productsCart.splice(i, 1);
        }
    }
    parent.remove();  
}

//Tiens a jours le prix et la quantite total du panier
function updateCart(totalQ,totalP)
{
    let allQuant = document.querySelectorAll("[class=itemQuantity]");
    let allPrice = document.querySelectorAll("[class=price]");


    totalQ.innerHTML = updateCartQuant(allQuant);
    totalP.innerHTML = updateCartPrice(allQuant, allPrice);
    
    updateItemQuant(productsCart, allQuant);
}

// Met a jour les quantite d'une array
function updateItemQuant(array,allQuant)
{
    for(let i = 0; i < array.length; i++)
    {
        if(array[i].quantite != allQuant[i].value)
        {
            array[i].quantite = allQuant[i].value;
        }
    }
}

// Met a jour et renvoie la quantite total du panier
function updateCartQuant(array)
{
    let q = 0
    for (let i = 0; i < array.length; i++)
    {
        q+= parseInt(array[i].value);
    }
    let r = "" + q;
    return r;
}

//Met a jour et renvoie le prix total du panier
function updateCartPrice(array0, array1)
{
    let p = 0;
    for(let i = 0; i < array0.length; i++)
    {   
        p += parseInt(array0[i].value) * parseInt(array1[i].innerHTML.replace(" €", ""));;
    }
    let r = "" + p;
    return r;
}

// Envoie la requete POST, recois et sauvegarde le recipe avant de changer de page
function submitOrder(array, fName, lName, addr, city, mail)
{

    let url = document.location.href.replace("cart.html", "");

    let order = {
        "contact" : {
            "firstName" :  fName.value,
            "lastName" : lName.value,
            "address" : addr.value,
            "city" : city.value,
            "email" : mail.value
        },
        "products" : productArray(array)
    }
    requestAPI("order", true, order)
    .then(function(recipe)
    {
        localStorage.clear();
        console.log("recipe = "+ JSON.stringify(recipe[0]));
        localStorage.setItem("order", JSON.stringify(recipe[0]))
        document.location.href = url + "confirmation.html";
    })
    .catch(function(msg){
        console.log(msg)
    });
}

// Permet de parse dans une array n fois la quantité, l'id d'un produits du panier
function productArray(array)
{
    let r = []
    array.forEach(element => 
    {
        for (let i = 0; i < element.quantite; i++)
        {
            r.push(element.id);
        }
    });
    return r
}

// Obtient le grand-parent d'un element HTML en recursifs
function getGrandParent(child)
{
    if(child.parentElement.tagName == "ARTICLE")
        return child.parentElement;
    else
        return getGrandParent(child.parentElement);
}

// Verifie si l'input du form corresponde a leur fonction 
function checkRegEx(element)
{
    let error = document.getElementById(element.id + "ErrorMsg");
    error.innerHTML = "";

    if(new RegExp(element.pattern).test(element.value))
    {
        return true
    }
    else
    {
        if(element.value.length > 0)
        {
            switch (element.id)
            {
                case "firstName" :
                    error.innerHTML = "Ereur sur votre prenom, attention";
                    break;
                case "lastName" :
                    error.innerHTML = "Erreur sur votre nom de famille, attention";
                    break;
                case "adress" :
                    error.innerHTML = "Ceci n'est pas une adresse valide";
                    break;
                case "city" :
                    error.innerHTML = "Ville inconnue";
                    break;
                case "email":
                    error.innerHTML = "Ceci n'est pas un mail";
                    break;
            }
        }
        return false
    }
}

//Verifie que tout les input ne soit pas vide
function onClickRegEx(array)
{
    let bool = false;
    let isVoid = 0;
    let error;
    array.forEach(element => {
        if(element.value.length < 1)
        {
            error = document.getElementById(element.id + "ErrorMsg");
            error.innerHTML = "Ce champ est vide";
            isVoid +=1;
        }
    });
    if(isVoid == 0)
        bool = true;
    return bool;
}