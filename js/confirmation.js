var orderID  = document.getElementById("orderId");

var json;

for (var x = 0; x < localStorage.length; x++){
    json = JSON.parse(localStorage.getItem(localStorage.key(x)));
    console.log("JSON = " + json);
  };

orderID.innerHTML = json.orderId;

localStorage.clear();