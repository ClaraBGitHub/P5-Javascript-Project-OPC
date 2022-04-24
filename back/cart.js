var productArray = JSON.parse(localStorage.getItem("productsInCart"));
console.log(productArray)

var containerPanier = document.querySelector('[class=cart__item]');
var total = 0;

productArray.forEach(element => {
    fetch("http://localhost:3000/api/products")
    .then((response) => {
        if (response.ok) {
        return response.json();
        }
    })
    .then((data) => {
        // var image = document.querySelector('[class=cart__item__img]').src = data.imageUrl;
        // console.log(image); 
        data.forEach(dataAPI => {
            var images = document.createElement("img");
            // images.src = dataAPI.imageUrl;
            // console.log(images.src)
            var names = dataAPI.name;
            console.log(names)
            // var prices = dataAPI.price;
            // console.log(prices)
        });
        // Je récupère mon template
        template = document.getElementById("template");
        node = template.cloneNode(true); //Je clone mon template dans "node"
        node.href = "./product.html?id="+element._id; //Je récupère l'id de chaque objet
        console.log(node.href)
        //Image
        var imageDisplay = node.querySelector('[id=cart__item__img]');
        imageDisplay =  document.createElement("img").src;
        console.log(imageDisplay)
        // Name
        var namesDisplay = node.querySelector('[id=nomDuProduit]');
        namesDisplay.textContent = data.names;
        console.log(namesDisplay)
        // Color
        var colorKanape = node.querySelector('[id=colorKanape]');
        colorKanape.textContent = element.color;
        console.log(colorKanape)
        //Quantity
        var quantityDisplay = node.querySelector('[class=itemQuantity]').value;
        quantityDisplay.textContent = element.quantity;
        console.log(quantityDisplay);
       // Price
        var priceDisplay = node.querySelector('[id=priceKanape]');
        priceDisplay.textContent = data.price;
        console.log(priceDisplay)
        node.classList.remove("hidden");
        // // console.log(products);
        document.querySelector('[class=cart__item]').appendChild(node); //Le noeud est ajouté au document

    });
});