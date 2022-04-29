var cart = localStorage.getItem("productsInCart");
if (cart == null) {
    cart = [];
} else {
    cart = JSON.parse(cart);
} 
var total = 0;

cart.forEach(element => { // Je boucle chaque element de mon cart
    fetch ("http://localhost:3000/api/products/"+element._id) // Je récupère l'id de chaque élement de mon cart
    .then (response => {
          return response.json();
      })
    .then (kanape => { 
        console.log(kanape)
            template = document.getElementById("template");
            node = template.cloneNode(true); //Je clone mon template dans "node"
            // Image
            node.querySelector('[id=cart__item__img]').src = kanape.imageUrl;
            console.log(node.querySelector('[id=cart__item__img]').src)
            // Name
            var namesDisplay = node.querySelector('[id=nomDuProduit]');
            namesDisplay.textContent = kanape.names;
            console.log(namesDisplay)
            // Color
            var colorKanape = node.querySelector('[id=colorKanape]');
            colorKanape.textContent = element.color;
            console.log(colorKanape)
            //Quantity
            var quantityDisplay = node.querySelector('[class=itemQuantity]');
            quantityDisplay.value = element.quantity;
            console.log(quantityDisplay);
            // Price
            var priceDisplay = node.querySelector('[id=priceKanape]');
            priceDisplay.textContent = kanape.price;
            console.log(priceDisplay)
            console.log(node.classList)
            node.classList.remove("hidden");
            // console.log(priceDisplay);
            document.getElementById('cart__items').appendChild(node); //Le noeud est ajouté au document
    })
    .catch((err) => {
    // Une erreur est survenue
    });
});



// 1er essai :

// Je récupère mon panier dans le localStorage
// total = 0;
// Pour chacun des élements du tableau (boucle)
//   total = total + prix du produit en cours
//   Je vais récupérer les informations du produit en cour
//   Je construit mon html (templating)
//   J'affiche mon produit

// var containerPanier = document.querySelector('[class=cart__item]');
// var total = 0;

// async function cartDisplay() {
//     await productArray;
//     productArray.forEach(element => {
//         var fetchProduct = await fetch("http://localhost:3000/api/products")
//         .then((response) => {
//             if (response.ok) {
//             return response.json();
//             }
//         })
//         .then((data) => {
//            var detailsAPI = data;
          
//         fetchProduct = await productArray;
//             // Je récupère mon template
//             template = document.getElementById("template");
//             node = template.cloneNode(true); //Je clone mon template dans "node"
//             node.href = "./product.html?id="+element._id; //Je récupère l'id de chaque objet
//             console.log(node.href)
//             // Image
//             node.querySelector('[id=cart__item__img]').src = detailsAPI.imageUrl;
//             console.log(node.querySelector('[id=cart__item__img]').src)
//             // Name
//             var namesDisplay = node.querySelector('[id=nomDuProduit]');
//             namesDisplay.textContent = detailsAPI.names;
//             console.log(namesDisplay)
//             // Color
//             var colorKanape = node.querySelector('[id=colorKanape]');
//             colorKanape.textContent = element.color;
//             console.log(colorKanape)
//             //Quantity
//             var quantityDisplay = node.querySelector('[class=itemQuantity]').value;
//             quantityDisplay.textContent = element.quantity;
//             console.log(quantityDisplay);
//         // Price
//             var priceDisplay = node.querySelector('[id=priceKanape]');
//             priceDisplay.textContent = detailsAPI.price;
//             console.log(priceDisplay)
//             node.classList.remove("hidden");
//             // console.log(priceDisplay);
//             document.querySelector('[class=cart__item]').appendChild(node); //Le noeud est ajouté au document
//         })
        
//     });     
// }
