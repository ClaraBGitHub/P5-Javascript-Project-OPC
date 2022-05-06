//On récupère les données de notre API 
fetch("http://localhost:3000/api/products")
.then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
.then((data) => {
  console.log(data);
  // Execution de la fonction forEach pour chaque élement de mon tableau
    data.forEach(kanape => {
      console.log(kanape);
      template = document.getElementById("template"); //Je récupère mon template
      //Image
      node = template.cloneNode(true); //Je clone mon template dans "node"
      node.href = "./product.html?id="+kanape._id; //Je récupère l'id de chaque objet
      node.querySelector('[id=imgItems]').src = kanape.imageUrl; // Je récupère le querySelector qui a pour id "imgItems"
      node.querySelector('[class=productName]').textContent = kanape.name; // Je récupère le querySelector qui a pour class "productName"
      node.querySelector('[class=productDescription]').textContent = kanape.description; // Je récupère le querySelector qui a pour class "productDescription"
      node.classList.remove("hidden"); //Je supprime la class hidden que j'avais associé à mon template, ce qui la supprime de mon css
      document.getElementById("items").appendChild(node); //Le noeud est ajouté au document
      
    // Première méthode utilisée : 
      // var htmlContent = "<article>"+
      //     "<img id= 'imgItems' src='"+kanape.imageUrl+"' alt='Lorem ipsum dolor sit amet, Kanap name1'>"+
      //     "<h3 class='productName'>"+kanape.name+"</h3>"+
      //     "<p class='productDescription'>"+kanape.description+"</p>"+
      //     "</article>";
      // var elementChild = document.createElement("a"); // Création d'un élément <a> pour chaque nouvel enfant créé
      // elementChild.href = "./product.html?id="+kanape._id; //On récupère l'id de chaque objet
      // elementChild.innerHTML = htmlContent; // Ajout de notre htmlContent à notre élèment <a> fraîchement créé
      // document.getElementById("items").appendChild(node); // Ajout du nouveau noeud à la fin des enfants du noeud parent 
    })
  })
.catch((err) => {
    // Une erreur est survenue
  });
