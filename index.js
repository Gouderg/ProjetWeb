var type, ville,url;

function temp() {
	ville = document.getElementById("ville").value;
	type = document.getElementById("type").value;
	url = "http://ville.api.isen-ouest.fr/immo/list/ville/"+ville+"/type/"+type;
	location.href="rechercheGlobal.html";
	
	miseajour(url);
	
}

function clearTableau(){
	var tbody = document.getElementById('tableBody');

	while (tbody.firstChild) {
		tbody.removeChild(tbody.firstChild);
	}

}


function recup(json) {
	console.log("lol");
	console.log(json);
	clearTableau();

}


function miseajour(url) {

	console.log("MAJ" + url);

	fetch(url, {
		method : 'GET'
	})
	.then( (res) => res.json())
	.then( (json) => recup(json))

	console.log("bonswar");

}






/*//Code Js pour le swipe dans Recherche précise
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
} */