$( "#recherche" ).click(function() {
  
  var villeSelect = $( "#ville  option:selected" ).val();
  var typeSelect = $( "#type  option:selected" ).val();
  var base_url = 'http://ville.api.isen-ouest.fr/immo/list/ville/'+villeSelect+'/type/'+typeSelect;
  
  console.log(base_url);

    var response = "";
    var valresult = '';
    var photo = '';

    $.ajax({
        type: "GET", 
        url: base_url , 
        //data: form_data,
        dataType: "json",//set to JSON
        success: function(response)
        {
          
      jQuery.each( response, function( i, val ) {

        valresult += '<tr><th><img class="photo" src = "http://172.31.0.5/immo/images/' + val.id + '-0.jpg" alt = "maison"></th>'; 
        valresult += '<td>Rue : ' + val.numero + '<br> Prix : '+ val.prix + '</td></tr>';
        
         
      });
      console.log(photo);     
      $(".niv1").html(valresult);
      
        }    
      
    }) 
});


$(document).ready(function() {
       
})



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

//mailto
function soummision(){
  var nom = document.getElementById('position1').value;
  var prenom = document.getElementById('position2').value;
  var adresse=document.getElementById('position3').value;
  var ville =document.getElementById('position4').value;
  var mail = document.getElementById('position5').value;
  var message =document.getElementById('position6').value;
    if(nom=="")
    {
      
      document.getElementById('position1').focus;
      return false;

        
    }
    if(prenom == ""){
    
      document.getElementById('position2').focus;
      return false;
    }
    if(adresse == ""){
    
      document.getElementById('position3').focus;
      return false;
    }
    if(ville == ""){
    
      document.getElementById('position4').focus;
      return false;
    }
     if (mail == ""){
      
      document.getElementById('position5').focus;
      return false;
    }
     if (message == ""){
      
      document.getElementById('position6').focus;
      return false;
    }
    else{
      return true;
      }
}

//contact
function soumettre(){
  var nom = document.getElementById('nom').value;
  var prenom = document.getElementById('prenom').value;
  var mail = document.getElementById('mail').value;
    if(nom=="")
    {
      
      document.getElementById('champs').focus;
      return false;

        
    }
    if(prenom == ""){
    
      document.getElementById('nom').focus;
      return false;
    }
     if (mail == ""){
      
      document.getElementById('mail').focus;
      return false;
    }
    else{
      return true;
      }
} 