var orderIdDisplay = document.getElementById("orderId");
var orderIdURL = new URL(window.location.href).searchParams.get("orderId");

orderIdDisplay.innerHTML = orderIdURL;