let productsCart = [];
let productsInfos = [];

for (var x = 0; x < sessionStorage.length; x++){
    productsCart.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(x))));
  };
for (var i = 0; i< productsCart.length; i++)
{
    fetch("http://localhost:3000/api/products/"+productsCart[i].id).then(function(res){
    if (res.ok)
    {
        return res.json();
    }
})
.then(function(value)
{
    productsInfos.push(value);
});
}

setTimeout(function(){
    let items = document.getElementById("cart__items");
    var totalQuantity = document.getElementById("totalQuantity");
    var totalPrice = document.getElementById("totalPrice");
    var btnOrder = document.getElementById("order");
    
    //creation
    parseProducts(productsInfos, items, "cart", productsCart);
    /*for(var i = 0; i < productsCart.length; i++)
    {
        createItem(productsCart[i].id,
        productsCart[i].couleur, productsInfos[i].name,
         productsInfos[i].imageUrl,productsInfos[i].altText, 
         productsInfos[i].price, productsCart[i].quantite);
    };*/

    //SET
    totalPrice.innerHTML = setCartPrice(productsCart, productsInfos);
    totalQuantity.innerHTML = setCartQuant(productsCart);

    setInterval(() => 
    {
        //Faire un onChange
        updateCart();
        updateItemQuant(productsCart);
    }, 1000);

    btnOrder.onclick = function(){
        submitOrder(productsCart)};
},1000);

function createItem(id, colors, name, url, alt, priceP, quantityP)
{
        var list_items = document.getElementById("cart__items");
        var article = document.createElement("article");
        var divImg = document.createElement("div");
        var img = document.createElement("img");
        var divContent = document.createElement("div");
        var divContentDesc = document.createElement("div");
        var h2 = document.createElement("h2");
        var color = document.createElement("p");
        var price = document.createElement("p");
        var divContentSett = document.createElement("div");
        var divContentQuant = document.createElement("div");
        var quant = document.createElement("p");
        var input = document.createElement("input");
        var divContentDel = document.createElement("div");
        var delItem = document.createElement("p");
        
        list_items.appendChild(article);
        article.appendChild(divImg);
        divImg.appendChild(img);
        article.appendChild(divContent);
        divContent.appendChild(divContentDesc);
        divContentDesc.appendChild(h2);
        divContentDesc.appendChild(color);
        divContentDesc.appendChild(price);
        divContent.appendChild(divContentSett);
        divContentSett.appendChild(divContentQuant);
        divContentQuant.appendChild(quant);
        divContentQuant.appendChild(input);
        divContentSett.appendChild(divContentDel);
        divContentDel.appendChild(delItem);

        //set class
        article.setAttribute("class","cart__item");
        divImg.setAttribute("class", "cart__item__img");
        divContent.setAttribute("class", "cart__item__content");
        divContentDesc.setAttribute("class", "cart__item__content__description");
        divContentSett.setAttribute("class", "cart__item__content__settings");
        divContentQuant.setAttribute("class", "cart__item__content__settings__quantity");
        input.setAttribute("class","itemQuantity");
        divContentDel.setAttribute("class", "cart__item__content__settings__delete");
        delItem.setAttribute("class", "deleteItem");

        //Attribute article
        article.setAttribute("data-id","{ " + id + " }");
        article.setAttribute("data-color","{ " + colors + " }");
        article.setAttribute("id", id);


        //Attribute img
        img.setAttribute("src", url);
        img.setAttribute("alt", alt);

        //Attribute input
        input.setAttribute("type","number");
        input.setAttribute("name","itemQuantity");
        input.setAttribute("min","1");
        input.setAttribute("max","100");
        input.setAttribute("value", quantityP);
        input.setAttribute("id", "itemQuantity");


        //Attribute Price
        price.setAttribute("id", "price");

        //Attribute DelItem
        delItem.setAttribute("id", "deleteItem");
        delItem.onclick = function(){delEventListener(name, id)};

        //innerTextHTML
        h2.innerHTML = name;
        color.innerHTML = colors;
        price.innerHTML = priceP + " €";
        quant.innerHTML = "Qté : ";
        delItem.innerHTML = "Supprimer";
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

function delEventListener(str, id)
{
    var balise = document.getElementById(id);
    sessionStorage.removeItem(str);

    for(var i = 0; i < productsCart.length; i++)
    {
        if (id == productsCart[i].id)
        {
            var tmp = productsCart.splice(i, 1);
        }
    }

    balise.remove();
}

function updateCart()
{
    //Changer les id  par des class
    var allQuant = document.querySelectorAll("[id=itemQuantity]");
    var allPrice = document.querySelectorAll("[id=price]");

    var totalQ = document.getElementById("totalQuantity");
    var totalP = document.getElementById("totalPrice");

    totalQ.innerHTML = updateCartQuant(allQuant);
    totalP.innerHTML = updateCartPrice(allQuant, allPrice);
}

function updateItemQuant(array)
{
    var allQuant = document.querySelectorAll("[id=itemQuantity]");
    
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

function submitOrder(array)
{
    var fName = document.getElementById("firstName");
    var lName = document.getElementById("lastName");
    var addr = document.getElementById("address");
    var city = document.getElementById("city");
    var mail = document.getElementById("email");

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
    
    var init = {
        method : "POST",
        "headers" : {

            "Accept" : "application/json",
            "Content-Type" : "application/json; charset=UTF-8"
        },
        mode: "cors",
        body : JSON.stringify(order)
    }
    fetch("http://localhost:3000/api/products/order", init)
    .then(function(res){
        if(res.ok)
        {
            return res.json();
        }
    })
    .then(function(json){
        sessionStorage.clear();
        sessionStorage.setItem("jsonOrder", JSON.stringify(json));
    });

    setTimeout(function(){
        document.location.href = url + "confirmation.html";
    },1000);
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