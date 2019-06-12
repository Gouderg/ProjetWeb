
//Fonction se lançant en cliquant sur le bouton recherche (index.html)
$( "#recherche" ).click(function() {
  
  //On récupère les valeurs sélectionnées par les selects
  var villeSelect = $( "#ville  option:selected" ).val();
  var typeSelect = $( "#type  option:selected" ).val();

  //On les concatène les données dans une autre variable
  var base_url = 'http://ville.api.isen-ouest.fr/immo/list/ville/'+villeSelect+'/type/'+typeSelect;

  //Déclaration des variables utilisés dans la récupération des données
  var response = "";
  var valresult = '';
  var photo = '';

  //Méthode ajax permettant de récuperer des informations par une requête GET sur une URL sous forme d'un fichier json
  $.ajax({
    type: "GET", //Requête GET
    url: base_url , //URL
    dataType: "json", //Fichier json
    //S'il y a succès, on exécute la fonction anonyme ayant pour paramètre le json
    success: function(response) {
      
      //Tant qu'il y a des valeurs, on exécute la fonction    
      jQuery.each( response, function( i, val ) {

        //On concatène dans une variable du code html et des valeur du json
        //Ici, on crée un tableau ayant en première cellule une photo cliquable
        valresult += '<tr><th><a href="recherchePrecise.html?id='+val.id+'" ><img class="photo" src = "http://172.31.0.5/immo/images/' + val.id + '-0.jpg" alt = "maison"></a></th>';
        //et en deuxième cellule on rajoute des informations 
        valresult += '<td>Rue : ' + val.numero + '<br> Prix : '+ val.prix + '</td></tr>';

      });

      //On envoie le tout dans une balise ayant l'attribut .niv1
      $(".niv1").html(valresult);

    }     
  }) 
});


$(document).ready(function() {
       
})

//Fonction se lançant au chargement de la page ayant le bonne ID (recherchePrecise.html)
$('#recupID').on('load', function() {

  var nom = window.location.pathname;
  var id = nom.substring(nom.lastIndexOf('=') + 1);
  console.log(id);
  var url = 'http://ville.api.isen-ouest.fr/immo/immo/' + id; 

  var info = '';
  var titre = '';
  var photo = '';
  var description ='';

  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: function(info) {

      title = info.type + info. + info. ;//Type Rue NomRue
      photo = '<img src = "http://172.31.0.5/immo/images/' + info.id + '-0.jpg">';


      $(".title").html(title) ;
      $(".photos").html(photo);
      $(".description").html(description);

    }
  })

});



//Code Js pour le swipe dans Recherche précise
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  console.log(slideIndex)
}

//Fonction vérifiants si tous les champs du formulaire sont remplis (envoiMail.html)
function soummision() {

  var nom = document.getElementById('position1').value;
  var prenom = document.getElementById('position2').value;
  var adresse = document.getElementById('position3').value;
  var ville = document.getElementById('position4').value;
  var mail = document.getElementById('position5').value;
  var message = document.getElementById('position6').value;

//Si les champs sont vides alors il prend le focus
  if(nom == "") {
     
    document.getElementById('position1').focus;
    return false;   
  }

  if(prenom == "") {
    
    document.getElementById('position2').focus;
    return false;
  }

  if(adresse == "") {
    
    document.getElementById('position3').focus;
    return false;
  }

  if(ville == "") {
    
    document.getElementById('position4').focus;
    return false;
  }

  if (mail == "") {
      
    document.getElementById('position5').focus;
    return false;
  }

  if (message == "") {
      
    document.getElementById('position6').focus;
    return false;
  } else {
      return true;
    }
}

//Fonction vérifiants si tous les champs du formulaire sont remplis (contact.html)
function soumettre() {

  var nom = document.getElementById('nom').value;
  var prenom = document.getElementById('prenom').value;
  var mail = document.getElementById('mail').value;

  //Si les champs sont vides alors il prend le focus
  if(nom == "") {
    
    document.getElementById('champs').focus;
    return false;
  }
    
  if(prenom == "") {
    
    document.getElementById('nom').focus;
    return false;
  }

  if (mail == "") {
      
    document.getElementById('mail').focus;
    return false;
  } else {
      return true;
    }
} 