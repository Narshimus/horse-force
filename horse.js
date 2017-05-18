$(document).ready(function() {

  //get name arrays
  let trueNames, falseNames, correct;
  $.getJSON('truenames.json', function(data) {
    trueNames = data;
  })
  $.getJSON('falsenames.json', function(data) {
    falseNames = data;
  })

  $.getJSON("https://api.flickr.com/services/feeds/groups_pool.gne?jsoncallback=?", {
      id: '289685@N25',
      format: "json",
    },
    function(data) {
      var rnd = Math.floor(Math.random() * data.items.length);
      var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
      // $('body').css('background-image', "url('" + image_src + "')");

    });

  $('#start').click(function() {

    $('.jumbotron').addClass('animated fadeOutUp');
    $('.fig-right').addClass('animated fadeOutRight');
    $('.fig-left').addClass('animated fadeOutLeft');
    fadeIn();
    $('figure').click(function() {

      fadeOut();
      fadeIn();
    })
  })

  function setNames() {
    let arr = ['name-left', 'name-right'];
    correct = arr.splice(Math.round(Math.random()), 1)
    $(`#${correct}`).text(trueNames[Math.floor(Math.random() * trueNames.length)])
    $(`#${arr}`).text(falseNames[Math.floor(Math.random() * falseNames.length)])
    $(`#${correct}`).parent().addClass("correct");

    while ($(`#${correct}`).text() == $(`#${arr}`).text()) {
      $(`#${correct}`).text(trueNames[Math.floor(Math.random() * trueNames.length)])
      $(`#${arr}`).text(falseNames[Math.floor(Math.random() * falseNames.length)])
    }
  }

  function fadeIn() {
    window.setTimeout(function() {
      resetAnimation();
      setNames()
      $('.fig-left').addClass('animated fadeInLeft');
      $('.fig-right').addClass('animated fadeInRight');
    }, 2500);
  }

  function fadeOut() {
    resetAnimation();
    if ($('.fig-right').hasClass('correct')) {
      $('.fig-left').addClass('animated fadeOutLeft');
      window.setTimeout(function() {
        $('.fig-right').addClass('animated fadeOutRight');
      }, 1500);
    } else {
      $('.fig-right').addClass('animated fadeOutRight');
      window.setTimeout(function() {
        $('.fig-left').addClass('animated fadeOutLeft');
      }, 1500);
    }
    $('figure').removeClass('correct');
  }

  function resetAnimation() {
    $('.fig-left').removeClass('animated fadeOutLeft');
    $('.fig-right').removeClass('animated fadeOutRight');
    $('.fig-left').removeClass('animated fadeInLeft');
    $('.fig-right').removeClass('animated fadeInRight');
    // $('.fig-left').removeClass('correct');
    // $('.fig-right').removeClass('correct');
  }

})
