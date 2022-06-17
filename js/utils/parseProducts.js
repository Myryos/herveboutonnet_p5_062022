function parseProducts(products, parent, type, cart)
{
    if(type == "all")
    {
        products.forEach(product => {
                /*Zone de creation des elements DOM des produit 
                et mise en enfant pour que le css fonctionne*/
            let p = 
            `<a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altText}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`;
            parent.innerHTML += p;
        })
    }
    if(type == "cart")
    {
        for (var i; i < cart.length; i++)
        {
            let p = `
            <article class="cart__item" data-id="{${cart[i].id}}" data-color="{${cart[i].couleur}}">
            <div class="cart__item__img">
              <img src="${products[i].imageUrl}" alt="${products[i].altText}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${products[i].name}</h2>
                <p>${cart[i].couleur}</p>
                <p>${products[i].price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantite}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;
          
          parent.innerHTML += p;
        };
    }
}