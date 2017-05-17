$(document).ready(function() {

//get name arrays
  let trueNames,falseNames;
  $.getJSON('truenames.json', function(data) {
    trueNames = data;
  })
  $.getJSON('falsenames.json', function(data) {
    falseNames = data;
  })

      $('#start').click(function() {

        $('.jumbotron').addClass('animated fadeOutUp');
        fadeOut();
        fadeIn(trueNames,falseNames);
        $('figure').click(function(){
          fadeOut();
          fadeIn(trueNames,falseNames);
        })

  })
})

function setNames(trueNames,falseNames){
  let arr = ['name-left','name-right'];
  let correct = arr.splice(Math.round(Math.random()),1)
  $(`#${correct}`).text(trueNames[Math.floor(Math.random()*trueNames.length)])
  $(`#${arr}`).text(falseNames[Math.floor(Math.random()*falseNames.length)])
}

function fadeIn(trueNames,falseNames){
  window.setTimeout(function(){
  resetAnimation();
  setNames(trueNames,falseNames)
  $('.left-img').addClass('animated fadeInLeft');
  $('.right-img').addClass('animated fadeInRight');
}, 1500);
}

function fadeOut(){
  resetAnimation();
  $('.right-img').addClass('animated fadeOutRight');
  $('.left-img').addClass('animated fadeOutLeft');
}

function resetAnimation(){
  $('.left-img').removeClass('animated fadeOutLeft');
  $('.right-img').removeClass('animated fadeOutRight');
  $('.left-img').removeClass('animated fadeInLeft');
  $('.right-img').removeClass('animated fadeInRight');
}
