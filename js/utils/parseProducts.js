//Fonction quui permet de creer et parse les infos des produits
function parseProducts(products, parent, type, cart)
{
  if(type == "all")
  {
    products.forEach(product => {
            /*Zone de creation des elements DOM des produit 
            et mise en enfant pour que le css fonctionne*/
        /*let p = 
        `<a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altText}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>`;
        parent.innerHTML += p;*/

        
        let link = document.createElement("a");
        let article = document.createElement("article");
        let img = document.createElement("img")
        let title = document.createElement("h3");
        let text = document.createElement("p");
        
        article.appendChild(img);
        article.appendChild(title);
        article.appendChild(text);
        link.appendChild(article);

        link.setAttribute("href", "./product.html?id="+product._id);
        img.setAttribute("src", product.imageUrl)
        img.setAttribute("alt", product.altText)
        title.innerHTML = product.name;
        title.setAttribute("class", "productName");
        text.innerHTML = product.description;
        text.setAttribute("class", "productDescription")

        parent.appendChild(link); 
        
    })
  }
    
  
  if(type == "cart")
  {
    for (let i = 0; i < cart.length; i++)
    {
        /*let p = `
        <article class="cart__item" id="item ${i}"data-id="{${cart[i].id}}" data-color="{${cart[i].couleur}}">
        <div class="cart__item__img">
          <img src="${products[i].imageUrl}" alt="${products[i].altText}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${products[i].name}</h2>
            <p>${cart[i].couleur}</p>
            <p class="price">${products[i].price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantite}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" id="${products[i].name}/${cart[i].couleur}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
      
      parent.innerHTML += p;*/


      let article = document.createElement("article");
      let divImg = document.createElement("div");
      let img = document.createElement("img");
      let divContent = document.createElement("div");
      let divContentDesc = document.createElement("div");
      let h2 = document.createElement("h2");
      let color = document.createElement("p");
      let price = document.createElement("p");
      let divContentSett = document.createElement("div");
      let divContentQuant = document.createElement("div");
      let quant = document.createElement("p");
      let input = document.createElement("input");
      let divContentDel = document.createElement("div");
      let delItem = document.createElement("p")
        
      parent.appendChild(article);
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
      article.setAttribute("data-id","{ " + cart[i].id + " }");
      article.setAttribute("data-color","{ " + cart[i].couleur + " }");
      article.setAttribute("id", "item " + i);

      //Attribute img
      img.setAttribute("src", products[i].imageUrl);
      img.setAttribute("alt", products[i].altText);

      //Attribute input
      input.setAttribute("type","number");
      input.setAttribute("name","itemQuantity");
      input.setAttribute("min","1");
      input.setAttribute("max","100");
      input.setAttribute("value", cart[i].quantite);
      input.setAttribute("id", "itemQuantity");

      //Attribute Price
      price.setAttribute("class", "price");

      //Attribute Deltitems
      delItem.setAttribute("class", "deleteItem");
      delItem.setAttribute("id", products[i].name + "/" + cart[i].couleur);;

      //innerTextHTML
      h2.innerHTML = products[i].name;
      color.innerHTML = cart[i].couleur;
      price.innerHTML = products[i].price + " €";
      quant.innerHTML = "Qté : ";
      delItem.innerHTML = "Supprimer";  
    }
  }
}