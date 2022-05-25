console.log(window.location);   //window.location renvoie un objet Location contenant des infos sur l'URL actuelle du doc

let searchParams = new URLSearchParams(window.location.search);
//URLSearchParams définit des méthodes utilitaires pour travailler avec la chaîne de requête d'une URL (query string)  
//la propriété search = la partie de l'URL qui suit le symbole "?" (inclu)
var productId = null;
if (searchParams.has("id")) { // La méthode has() vérifie si le paramètre (ici id) existe dans l’URL. Il renvoie true si le paramètre existe, sinon il renvoie false
    productId = searchParams.get('id') //La méthode get recherche la valeur de mon paramètre (ici id)
    console.log(productId);
} 
if (productId==null) {
    alert("Ce produit n'existe pas");
    window.location = "index.html";
}
fetch("http://localhost:3000/api/products/"+productId)
.then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
.then((kanape) => {
  // Execution de la fonction forEach pour chaque élement de mon tableau
    //image    
        let imgHtmlContent = document.createElement("img");
        imgHtmlContent.src = kanape.imageUrl;
        document.getElementsByClassName("item__img")[0].appendChild(imgHtmlContent); 
    //title
        let titleHtmlContent = document.getElementById("title");
        titleHtmlContent.innerHTML = kanape.name;
    //price  
        let priceHtmlContent = document.getElementById("price");
        priceHtmlContent.innerHTML = kanape.price;
    //description    
        let descriptionHtmlContent = document.getElementById("description");
        descriptionHtmlContent.innerHTML = kanape.description;
    //colors
        let myTeddycolor = document.getElementById('colors');
        let colorsHtmlContent = kanape.colors;
        for(i=0; i<colorsHtmlContent.length; i++) {
            let colorOptions = colorsHtmlContent[i];
            let colorsDisplay = document.createElement('option');
            colorsDisplay.textContent = colorOptions;
            colorsDisplay.value = colorOptions;
            myTeddycolor.appendChild(colorsDisplay);
            // console.log(colorsDisplay);
        }      
  })
.catch((err) => {
    // Une erreur est survenue
  });


  // Cart event listener
let cart = document.getElementById("addToCart");
cart.addEventListener('click', () => {
    let amountSelected = parseInt(document.getElementById("quantity").value); //parseInt analyse une chaîne de caratère et renvoie un entier
    let colorSelected = document.getElementById("colors").value;
    var products = { // les valeurs que je veux stocker dans mon panier
        _id : productId,
        color : colorSelected,
        quantity : amountSelected,
    };
    let productArray = JSON.parse(localStorage.getItem("productsInCart")); // Je récupère le panier "productsInCart" dans localStorage et je le "parse" (= cela devient un objet JS). Les infos sont stockées dans productArray 
    if (productArray == null){ // Si rien n'est selectionné = arrray vide  
        productArray = [];
        if (amountSelected <= 0 ) {
            alert("Le nombre d'article doit être supérieur à 0")
            return;
        }
        if (amountSelected >100) {
            alert("Le nombre d'article doit être inférieur à 100")
            return;
        }
    productArray.push(products); // Send data to my products template
    localStorage.setItem("productsInCart", JSON.stringify(productArray)); // Storing data in key "productsInCart" and convert a JS object into a string (otherwise it can't be store in localstorage)
    }
    else  {
        if (amountSelected <= 0 ) {
            alert("Le nombre d'article doit être supérieur à 0")
            return;
        }
        if (amountSelected >100) {
            alert("Le nombre d'article doit être inférieur à 100")
            return;
        }
        productFinded = false;
        for (var i=0; i<productArray.length; i++) {
            if (productArray[i]._id == products._id && productArray[i].color == products.color) { //important d'ajouter le [i] car on parle de l'élément dans lequel on boucle à l'instant
                productArray[i].quantity = productArray[i].quantity + products.quantity;
                localStorage.setItem("productsInCart", JSON.stringify(productArray));
                productFinded = true;
            }
        };
        if  (productFinded == false) { // le boolean me permet de vérifier si une condition est vérifiée
            productArray.push(products); // Send data
            localStorage.setItem("productsInCart", JSON.stringify(productArray)); // Storing data and convert a JS object into a string (otherwise it can't be store in localstorage)
        }
    }
})