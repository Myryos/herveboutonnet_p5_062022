let orderID  = document.getElementById("orderId");

let json;

for (let x = 0; x < localStorage.length; x++){
    json = JSON.parse(localStorage.getItem(localStorage.key(x)));
  };

orderID.innerHTML = json.orderId;

localStorage.clear();