
//Fonction se lançant en cliquant sur le bouton recherche (index.html)
$("#recherche").click(function() {
  
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
        valresult += '<tr> <th> <br> <a href="recherchePrecise.html?id='+val.id+'" ><img class="photo" src = "http://172.31.0.5/immo/images/' + val.id + '-0.jpg" alt = "maison"></a></th>';
        //et en deuxième cellule on rajoute des informations 
        valresult +=  '<td>Rue : ' + val.voie + '<br> Prix : '+ val.prix + '<img src="image/euro.png" id="euro" > <br> Surface du Bâti : ' + val.surfaceBati + '<br> T' + val.nbPiece + '</td> </tr> ';

      });

      //On envoie le tout dans une balise ayant l'attribut .niv1
      $(".niv1").html(valresult);

    }     
  }) 
});

//Fonction se lançant au chargement de la page ayant le bonne ID (recherchePrecise.html / envoiMail.html)
$(document).ready(function() {

  if ($("#recupID").length) { //On exécute le code seulement si l'id est présent et rempli

    //On récupère l'id dans l'URL
    var nom = window.location.href;
    console.log(nom);
    var id = nom.substring(nom.lastIndexOf('=') + 1);
    var url = 'http://ville.api.isen-ouest.fr/immo/immo/' + id; 

    var info = '';
    var titre = '';
    var description ='';
    var button = '';
    var resume = '';

    //Méthode ajax récupérant les infos stockées à l'adresse url
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function(info) {
        
        var compteur = 0;
        var id = info[0].id;

        //Fonction qui permet de vérifier si la photo existe
        checkPhoto(id, compteur);
        

        titre += info[0].typeLocal + ': '+info[0].typeRue + ' ' + info[0].voie;//Type Rue NomRue

        //Description du bien rédigée en HTML et stockée dans une variable
        description += ' Adresse : ' + info[0].typeRue + ' '+info[0].voie 
        + '<br> Code postal : '+ info[0].codePostal +' <br> Ville : ' 
        + info[0].ville + '<br> <br> <stong> Surface du bâti  :</strong> '
        + info[0].surfaceBati + ' mètres carrés' +'<br> Surface terrain : ' 
        + info[0].surfaceTerrain + ' mètres carrés' + '<br>  <br><stong> Prix: </strong>'
        + info[0].prix + ' <br> <img  id="image/euro" src="image/euro.png" >';

        //Bouton qui renvoie à un lien en passant un id dans son URL
        button += '<a href="envoiMail.html?id='+info[0].id+'" id="interesser">Intéressé?<br>Cliquez ici</a>'

        //Résumé utilisé dans la envoiMail
        resume += 'Rue : ' + info[0].voie + '<br> Prix : '+ info[0].prix 
        + '<img src="image/euro.png" id="euro" > <br> Surface du Bâti : ' 
        + info[0].surfaceBati + '<br> T' + info[0].nbPiece;

        //On réinjecte le tout dans le code HTML à la classe qui correspond
        $(".title").html(titre);
        $(".btnInte").html(button);
        $(".description").html(description);
        $(".resume").html(resume);

      }
    })
  }
});

//Fonction qui regarde si la photo choisie existe, elle prend en paramètres l'id du bien et compteur
//Compteur s'incrémente à chaque appel de la fonction
function checkPhoto(id, compteur) {

  var photo = '';
  var url = 'http://172.31.0.5/immo/images/'+id+'-'+compteur+'.jpg';

  //Méthode ajax qui récupère la photo à l'adresse voulue
  $.ajax ({
    type: "HEAD",
    url: url,
    dataType: "jpg",
    async:false,
    success: function() { 
      //Si la photo existe on la concatène dans une variable puis on la réinjecte directement dans le code HTML
      photo = '<li><img src="http://172.31.0.5/immo/images/'+id+'-'+compteur+'.jpg"></li>'; 
      $(".carrousel").append(photo);
      compteur ++;
      //Tant qu'il y a succès de la méthode ajax, on rappelle la fonction
      checkPhoto(id, compteur);
    } 


  });

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