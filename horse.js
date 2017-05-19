$(document).ready(function() {

//initialize variables populate lists
  let trueNames, falseNames, correct, pictures, data1, data2, data3;
  let score = 0;
  let pictureMode = false;
  $.getJSON('truenames.json', function(data) {
    trueNames = data;
  })
  $.getJSON('falsenames.json', function(data) {
    falseNames = data;
  })

//create events
  $('.footer-text').click(function() {
    getGraphics();
    pictureMode = !pictureMode;
    pictureMode ? $('.footer-text').text('disable API mode') : $('.footer-text').text('enable API mode')
  })

  $('#start').click(function() {

    $('.jumbotron').addClass('animated fadeOutUp');
    $('.fig-right').addClass('animated fadeOutRight');
    $('.fig-left').addClass('animated fadeOutLeft');

    fadeIn();
    $('.figure').click(function(event) {
      if ($(event.target).hasClass('correct')) {
        score++;
        $('.jumbo').html(`<h1>${score}</h1>`)
        $('.jumbo').css('color', 'green')
      } else {
        $('.jumbo').css('color', 'red')
      }
      fadeOut();
      fadeIn();
    })
  })

//picks names from lists and appends to page
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

//animations and timers for fading in horses and scoreboard
  function fadeIn() {
    window.setTimeout(function() {
      setGraphics();
      if ($('.jumbotron').hasClass('fadeOutUp')) {
        $('.jumbotron').prop('class', 'jumbotron animated fadeInDown');
        $('.jumbo').html(`<h1>${score}</h1>`)
      }
      resetAnimation();
      setNames()
      $('.fig-left').addClass('animated fadeInLeft');
      $('.fig-right').addClass('animated fadeInRight');
    }, 2500);
  }

//animations and timers for fading out horses
//boolean to determine winner
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
    $('.figure').removeClass('correct');
  }

//resets animation classes
//TODO phase out using .prop on other functions
  function resetAnimation() {
    $('.fig-left').removeClass('animated fadeOutLeft');
    $('.fig-right').removeClass('animated fadeOutRight');
    $('.fig-left').removeClass('animated fadeInLeft');
    $('.fig-right').removeClass('animated fadeInRight');
  }

//get requests for api mode
  function getGraphics() {
    var first = $.getJSON("https://api.flickr.com/services/feeds/groups_pool.gne?jsoncallback=?", {
        id: '289685@N25',
        format: "json",
      },
      function(data) {
        data1 = data['items'];
      });
    var second = $.getJSON("https://api.flickr.com/services/feeds/groups_pool.gne?jsoncallback=?", {
        id: '75029738@N00',
        format: "json",
      },
      function(data) {
        data2 = data['items'];
      });
    var third = $.getJSON("https://api.flickr.com/services/feeds/groups_pool.gne?jsoncallback=?", {
        id: '44159230@N00',
        format: "json",
      },
      function(data) {
        data3 = data['items'];
      });

    $.when(first, second, third).done(function() {
      pictures = data1.concat(data2, data3);
    })
  }

//get random graphics if api mode is on or reset
//TODO user can still get the same image twice (splice?)
  function setGraphics() {
    if (pictureMode) {
      $('.fig-left').css(`background-image`, `url('${pictures[getRand()]['media']['m'].replace("_m", "_b")}')`);
      $('.fig-right').css(`background-image`, `url('${pictures[getRand()]['media']['m'].replace("_m", "_b")}')`);
    } else {
      $('.fig-left').css(`background-image`, `url(img/horse_left.png`);
      $('.fig-right').css(`background-image`, `url('img/horse_right.png`);
    }
  }

  function getRand() {
    return Math.floor(Math.random() * pictures.length);
  }

})
