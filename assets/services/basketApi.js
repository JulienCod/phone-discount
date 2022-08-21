// Ajouter un article
function addPanier(product) {
    let panier = getPanier();
    let foundProduct = panier.find(panier => panier.phoneId == product.phoneId && panier.color === product.color);
    if (foundProduct != undefined){
        foundProduct.quantity = parseInt(foundProduct.quantity)+ parseInt(product.quantity) ;
    } else {
        panier.push(product)
    }
    savePanier(panier);
}

// consulte le local storage existant
function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
}

// enregistre le contenu dans le localstorage
function savePanier(article){
    localStorage.setItem("panier", JSON.stringify(article));
}

export default {addPanier, getPanier, savePanier}