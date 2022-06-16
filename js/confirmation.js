var orderID  = document.getElementById("orderId");

var json;

for (var x = 0; x < sessionStorage.length; x++){
    json = JSON.parse(sessionStorage.getItem(sessionStorage.key(x)));
  };

orderID.innerHTML = json.orderId;

sessionStorage.clear();