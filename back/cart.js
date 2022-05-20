var cart = localStorage.getItem("productsInCart");
if (cart == null) {
    cart = [];
} else {
    cart = JSON.parse(cart);
} 
var total = 0;
var totalQuantity = 0;
const promises = cart.map(cartElement => { // La méthode map me retourne un nouveau tableau avec chaque élément d'un tableau (ici cart). Ce nouveau tableau est stocké dans la const promises. 
    return fetch ("http://localhost:3000/api/products/"+cartElement._id).then(response => {
        return response.json();
    })
});
Promise.all(promises).then(products => { //Promise.all va me retourner une promesse de toutes les promesse comprisent dans mon argument. Ici la const promises  
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
        node.dataset.id = element._id;
        //data-color
        node.dataset.color = element.color;
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

        //remove hidden from my template
        node.classList.remove("hidden");

        // Price
        var priceDisplay = node.querySelector('[id=priceKanape]');
        priceDisplay.textContent = kanape.price+" €";
        document.getElementById('cart__items').appendChild(node); //Le noeud est ajouté au document

        // Final price
        var priceElement = document.getElementById('totalPrice');
        let productCost = kanape.price * parseInt(element.quantity);
        total += productCost;
        priceElement.textContent = total;

        //Final product quantity
        var quantityElement = document.getElementById('totalQuantity');
        let finalQuantity = element.quantity;
        totalQuantity += parseInt(finalQuantity);
        quantityElement.textContent = totalQuantity;
        
        // Remove an item from the cart
        var deleteButton = node.querySelector('[class=deleteItem]');
        deleteButton.addEventListener('click', (event) => {
            newCart = [];
            cart.forEach(elt => {
               if (elt._id != element._id || elt.color != element.color) { //if l'élément en cours de notre nouveau cart est différent de l'élément de notre ancien cart alors on met à jour le cart 
                   newCart.push(elt);
               }
            })
           localStorage.setItem("productsInCart", JSON.stringify(newCart));
           location.reload();
        });
        
        // Add quantity from the cart
        var cartQuantity = node.querySelector('[class=itemQuantity]');
        cartQuantity.addEventListener('change', (_) => {
            var newQuantity = cartQuantity.value;
            for (var i = 0; i<cart.length; i++) { //cart.length
                if (cart[i]._id == element._id && cart[i].color == element.color){ // if l'élément sur lequel j'ai cliqué est le même que celui de mon panier
                    cart[i].quantity = newQuantity;
                    localStorage.setItem("productsInCart", JSON.stringify(cart));
                    location.reload();
                 }
            }
        })
    });
})

//form
    //Regex
var nameRegex = /[A-Za-z_, '.-]{2,}(?![0-9])$/;
var addressRegex = /[\w, '.-]{2,}/;
var cityRegex = /([A-Za-z,_'.-]){2,}(?![0-9])$/;
var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    //FirstName
var firstNameEntry = document.getElementById('firstName');
var firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
var validFirstName = false;
firstNameEntry.addEventListener('input', (event) => {
    var firstaNameInput = event.target.value;
    if (nameRegex.test(firstaNameInput.trim())) {
        firstNameErrorMsg.textContent = " ";
        validFirstName = true;
    } else {
        firstNameErrorMsg.textContent = "Le prénom n'est pas valide";
    }
  })

    //LastName
var lastNameEntry = document.getElementById('lastName');
var lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
var validLastName = false;
lastNameEntry.addEventListener('input', (event) => {
    var lastNameInput = event.target.value;
    if (nameRegex.test(lastNameInput.trim())) {
        lastNameErrorMsg.textContent = " ";
        validLastName = true;
    } else {
        lastNameErrorMsg.textContent = "Le nom n'est pas valide";
    }
})
    //Adress
var adressEntry = document.getElementById('address');
var addressErrorMsg = document.getElementById('addressErrorMsg');
var validaddress = false;
adressEntry.addEventListener('input', (event) =>{
    var addressInput = event.target.value;
    if (addressRegex.test(addressInput.trim())) {
        addressErrorMsg.textContent =  " ";
        validaddress = true;
    } else {
        addressErrorMsg.textContent="L'adresse n'est pas valide";
    }
})
    // City
var cityEntry = document.getElementById('city');
var cityErrorMsg = document.getElementById('cityErrorMsg');
var validCity = false;
cityEntry.addEventListener('input', (event) =>{
    var cityInput = event.target.value;
    if (cityRegex.test(cityInput.trim())) {
        cityErrorMsg.textContent = " ";
        validCity = true;
    } else {
        cityErrorMsg.textContent="La ville n'est pas valide";
    }
})
    // Email
var emailEntry = document.getElementById('email');
var emailErrorMsg = document.getElementById('emailErrorMsg');
var validEmail = false;
emailEntry.addEventListener('input', (event) => {
    var emailInput = event.target.value;
    if (emailRegex.test(emailInput.trim())) {
        emailErrorMsg.textContent = " ";
        validEmail = true;
    } else {
        emailErrorMsg.textContent = "L'adresse email n'est pas valide";
    }
})

// Form validation 

var validateOrder = document.getElementById('form-order');
validateOrder.addEventListener('submit', (event)=> {
    event.preventDefault();
    var products = [];
    for (let i = 0; i<cart.length;i++) {
        products.push(cart[i]._id);
    }
    var contactInfo = { 
        contact : {
        firstName : firstNameEntry.value,
        lastName : lastNameEntry.value,
        address : adressEntry.value,
        city : cityEntry.value,
        email : emailEntry.value,
        },
        products
    };
    console.log(validFirstName,validLastName, validaddress, validCity,validEmail)
    if (validFirstName==true && validLastName==true && validaddress==true && validCity==true && validEmail==true){
        fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactInfo)
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
            localStorage.removeItem("productsInCart");
            window.location.href = "confirmation.html?orderId="+data.orderId;
        })
     
    } else {
        alert ('Les informations renseignée ne sont pas valides');
    }
})







// 1er essai :

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
