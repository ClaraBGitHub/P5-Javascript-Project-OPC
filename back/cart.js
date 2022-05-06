var cart = localStorage.getItem("productsInCart");
if (cart == null) {
    cart = [];
} else {
    cart = JSON.parse(cart);
} 
var total = 0;
var totalQuantity = 0;

const promises = cart.map(cartElement => {
    return fetch ("http://localhost:3000/api/products/"+cartElement._id).then(response => {
        return response.json();
    })
});
Promise.all(promises).then(products => {
    cart.forEach(element => { // Je boucle chaque element de mon cart
        var kanape = null;
        products.forEach(product => {
            if (product._id == element._id){
                kanape = product;
            }
        })
        template = document.getElementById("template");
        node = template.cloneNode(true); //Je clone mon template dans "node"
        //data-id
        template.dataset.id = element._id;
        //data-color
        template.dataset.color = element.color;
        // Image
        node.querySelector('[id=cart__item__img]').src = kanape.imageUrl;
        // Name
        var namesDisplay = node.querySelector('[id=nomDuProduit]');
        namesDisplay.textContent = kanape.name;
        // Color
        var colorKanape = node.querySelector('[id=colorKanape]');
        colorKanape.textContent = element.color;
        //Quantity
        var quantityDisplay = node.querySelector('[class=itemQuantity]');
        quantityDisplay.value = parseInt(element.quantity);

        // Price
        var priceDisplay = node.querySelector('[id=priceKanape]');
        priceDisplay.textContent = kanape.price;

        node.classList.remove("hidden");
        document.getElementById('cart__items').appendChild(node); //Le noeud est ajouté au document

        // Final price
        var priceElement = document.getElementById('totalPrice');
        let productCost = kanape.price * parseInt(element.quantity);
        total += productCost;
        priceElement.textContent = total;

        //Final product quantity
        var quantityElement = document.getElementById('totalQuantity');
        let finalQuantity = element.quantity;
        totalQuantity += finalQuantity;
        quantityElement.textContent = totalQuantity;
        
        deleteButton = node.querySelector('[class=deleteItem]');
        deleteButton.addEventListener('click', (event) => {
            newCart = [];
            cart.forEach(elt => {
               if (elt._id != element._id || elt.color != element.color) {
                   newCart.push(elt);
               }
           })
           localStorage.setItem("productsInCart", JSON.stringify(newCart));
           location.reload();
        });
    })
});


// Cart EventListener --> Ajout d'une quantité à mon panier
// var cartQuantity = document.querySelector('[class=itemQuantity]');
// cartQuantity.forEach(change => {
//         console.log(cartQuantity)
//         console.log("test du changement");
//         change.addEventListener('change', () => {
//         if (cart._id == change.dataset.id && cart.color == change.dataset.color) {
//             console.log(change.value)
//             cart.quantity = parseInt(change.value),
//             localStorage.setItem('productsInCart', JSON.stringify(cart));
//         }
//     })
// });

// 1- Je veux que lorsque j’ajoute une quantité depuis mon panier (addEvent), cela vient modifier mon local storage.
// J’écouté le changement de quantité sur ma page panier
// Je récupère cette quantité
// Je la push dans mon local storage


// Cart delete product 

// var deleteButtons = document.getElementsByClassName('deleteItem');
// Array.from(deleteButtons).forEach(button => {
//     button.addEventListener('click', (id, color) => {
//         alert('toto')
//     });
// })
// deleteButton.addEventListener('click', (id, color) => {
//     alert("toto")
//     console.log(id, color)
        // for (let i = 0; i < cart.length; i++) {
        //     // console.log(id, color);
        //     if (cart[i]._id == element.dataset.id && cart[i].color == element.dataset.color) {
        //         cart.splice(i, 1);
        //         console.log("supprimé");
        //         return (
        //             localStorage.removeItem("productsInCart"),
        //             location.reload()
        //         )
        //     }
        // }
    // })


// 2- Lorsque je clique sur le bouton « supprimer », cela supprime le Kanape de mon local storage et de ma page panier.
// J’écouté le clique sur le bouton de ma page panier
// Je supprime l’objet en question de mon local storage ET de ma page panier












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
