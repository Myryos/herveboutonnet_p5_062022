var productsCart = [];
onCreate();


async function onCreate()
{

    let productsInfos = [];
    var items = document.getElementById("cart__items");;
    var btnOrder = document.getElementById("order");
    var totalQuantity = document.getElementById("totalQuantity");
    var totalPrice = document.getElementById("totalPrice");
    var fName = document.getElementById("firstName");
    var lName = document.getElementById("lastName");
    var addr = document.getElementById("address");
    var city = document.getElementById("city");
    var mail = document.getElementById("email");
    let isOk = false;
    
    for (var x = 0; x < localStorage.length; x++)
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

        var delItems = document.querySelectorAll("[class=deleteItem]");
        delItems.forEach(element => {
            element.onclick = function()
            {
                for(var i = 0; i < productsCart.length; i++)
                {
                    delEventListener(element, productsCart[i].id);
                }
            }   
        });
    });

    //SET

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
        if(isOk)
            submitOrder(productsCart, fName, lName, addr, city, mail);
    };
        
        
}
//submitOrder(productsCart)

function getInfo(array)
{
    return new Promise((resolve, reject) => {
        let info = [];
        for (var i = 0; i < array.length; i++)
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

function setCartQuant(cart)
{
    var q = 0;
    for(var i = 0; i < cart.length; i++)
    {
        q += parseInt(cart[i].quantite);
    }
    var qq = "" + q;
    return qq;
}

function setCartPrice(cart, info)
{
    var p = 0;
    for( var i = 0; i< cart.length; i++)
    {
        p += parseInt(cart[i].quantite) * parseInt(info[i].price);
    };
    var pp = "" +  p;
    return pp;
}


function delEventListener(element, id)
{
    parent = getGrandParent(element);

    localStorage.removeItem(element.id);

    for(var i = 0; i < productsCart.length; i++)
    {
        if (id == productsCart[i].id)
        {
            var tmp = productsCart.splice(i, 1);
        }
    }
    parent.remove();  
}

function updateCart(totalQ,totalP)
{
    var allQuant = document.querySelectorAll("[class=itemQuantity]");
    var allPrice = document.querySelectorAll("[class=price]");


    totalQ.innerHTML = updateCartQuant(allQuant);
    totalP.innerHTML = updateCartPrice(allQuant, allPrice);
    
    updateItemQuant(productsCart, allQuant);
}

function updateItemQuant(array,allQuant)
{
    for(var i = 0; i < array.length; i++)
    {
        if(array[i].quantite != allQuant[i].value)
        {
            array[i].quantite = allQuant[i].value;
        }
    }
}

function updateCartQuant(array)
{
    var q = 0
    for (var i = 0; i < array.length; i++)
    {
        q+= parseInt(array[i].value);
    }
    var r = "" + q;
    return r;
}

function updateCartPrice(array0, array1)
{
    var p = 0;
    for(var i = 0; i < array0.length; i++)
    {   
        p += parseInt(array0[i].value) * parseInt(array1[i].innerHTML.replace(" €", ""));;
    }
    var r = "" + p;
    return r;
}

function submitOrder(array, fName, lName, addr, city, mail)
{

    var url = document.location.href.replace("cart.html", "");

    var order = {
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

function productArray(array)
{
    var r = []
    array.forEach(element => 
    {
        for (var i = 0; i < element.quantite; i++)
        {
            r.push(element.id);
        }
    });
    return r
}
function getGrandParent(child)
{
    if(child.parentElement.tagName == "ARTICLE")
        return child.parentElement;
    else
        return getGrandParent(child.parentElement);
}

function checkRegEx(element)
{
    var error = document.getElementById(element.id + "ErrorMsg");
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