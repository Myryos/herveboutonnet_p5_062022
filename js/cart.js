var list_items = document.getElementById("cart_items");
let productsCart = [];
let productsInfos = []

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

console.log(productsInfos);
console.log(productsCart);
setTimeout(function(){
    for(var i = 0; i < productsCart.length; i++)
    {createItem(productsCart[i].id,
        productsCart[i].color, productsInfos[i].imageUrl,productsInfos[i].altText,
        productsInfos[i].price, productsCar[i].quantite, list_items);}
    },200);

function createItem(id, colors, url, alt, priceP, quantityP, list)
{
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
        var delItem = document.createElement("p")
        
        list.appendChild(article);
        article.appendChild(divImg);
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

        //Attribute input
        input.setAttribute("type","number");
        input.setAttribute("name","itemQuantity");
        input.setAttribute("min","1");
        input.setAttribute("max","100");
}
