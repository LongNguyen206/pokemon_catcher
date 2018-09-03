// const axios = require('axios');

const searchPokemonBtn = document.querySelector('#search-btn');

const catchBtn = document.querySelector('#catch-btn');

// Get the modal
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Get the #release-btn element that closes the modal
const releaseBtn = document.getElementById('release-btn');

const success = document.getElementById('success');

searchPokemonBtn.addEventListener("click", callbackRequest);

catchBtn.addEventListener("click", catchFunc);

var pokemonCaught = 0;
function catchFunc() {
  modal.style.display = "none";
  if (pokemonCaught < 6) {
    pokemonCaught++;
    console.log(pokemonCaught);
    searchPokemonBtn.removeAttribute("hidden");
    success.style.display = "block";
    $('.pokeballs #pokeball:last').remove();
  } else {
    $('.modal-content').find('#catch-btn').remove();
  }
}

function callbackRequest() {
  // Set config defaults when creating the instance
  var pokemon_api = axios.create({
    baseURL: 'http://pokeapi.salestock.net/api/v2/pokemon/'
  });

  $('.modal-content').find('*').not(".close, #catch-btn, #release-btn").remove();
  $("#wait").css("display", "block");
  searchPokemonBtn.setAttribute("hidden", true);
  success.style.display = "none";

  var randPokId = Math.floor(Math.random() * 802);
  
  pokemon_api.get(`${randPokId}/`)
    .then(function (response) {    
      console.log(response.data);
      // var allSprites = response.data.sprites.front_default;
      // var currentSprite = allSprites.substr(allSprites.length - 80, allSprites.length);
      // console.log(currentSprite);
      modal.style.display = "block";
      // $('.modal-content')
      //           .prepend($('<h1>').text(`A WILD ${response.data.name.toUpperCase()} APPEARED!`))

      $('.close').after($('<p>').text(`Base Exp: ${response.data.base_experience}`))
                .after($('<p>').text(`Weight: ${response.data.weight}g`))
                .after($('<p>').text(`Height: ${response.data.height}cm`))
                .after($('<p>').text(`Type: ${response.data.types[0].type.name}`))
                .after($('<p>').text(`ID: ${response.data.id}`))
                .after(`<img src=${response.data.sprites.front_default} width=200px height=200px>`)
                .after($('<h1>').text(`A WILD ${response.data.name.toUpperCase()} APPEARED!`))

                
      // $('.modal-content')
      //               // .append(e)
      //               .prepend($('<p>').text(`Type: ${response.data.types[0].type.name}`))
      //               .prepend($('<p>').text(`Name: ${response.data.name.toUpperCase()}`))
      //               .prepend($('<p>').text(`ID: ${response.data.id}`))
      //               .prepend(`<img src=${response.data.sprites.front_default} width=200px height=200px>`) 
      // e.attr('id', 'catch-btn');

      $("#wait").css("display", "none");

      // catchBtn.addEventListener("click", function(){
      //   var sprite = response.data.sprites.front_default;
      //   console.log(sprite);
      //   $('.pokeballs').append(`<img src=${sprite}>`)
      // });

    })
    .catch(function(error) {
      console.log(error);      
    })
  }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    searchPokemonBtn.removeAttribute("hidden");
}

releaseBtn.onclick = function() {
  modal.style.display = "none";
  searchPokemonBtn.removeAttribute("hidden");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        searchPokemonBtn.removeAttribute("hidden");
    }
}
