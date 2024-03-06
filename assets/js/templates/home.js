$(document).ready(function() {

  // Skew les div container et contents
  // en fonction du ratio de la fenêtre pour l'alignement diagonal

  function radians_to_degrees(radians){
    var pi = Math.PI;
    return radians * (180/pi);
  }

  var ratio;
  var angle;
  var invertAngle;

  function setAngle(){
    ratio =  window.innerWidth / window.innerHeight;
    angle = radians_to_degrees(Math.atan(ratio));
    invertAngle = - angle;
  }

  setAngle();
  changeSkew();

  function changeSkew(){
    setAngle();

    $('.skew.left').css('transform', 'skew(' + angle + 'deg)');
    $('.skew.left > *').css('transform', 'scale(0.98) skew(' + invertAngle + 'deg)');

    $('.skew.right').css('transform', 'skew(' + invertAngle + 'deg)');
    $('.skew.right > *').css('transform', 'scale(0.98) skew(' + angle + 'deg)');
  }

  window.addEventListener('load',function() { 
    changeSkew();
  });

  window.addEventListener('resize',function() { 
    changeSkew();
    checkDevice();
  });

  // Scroll loop

  const setScroll = (side) => {
    // scrollable div
    var contentDiv = document.getElementById(`container-${side}`);

    contentDiv.scrollTop = 0;

    const children = Array.from(contentDiv.childNodes); // Convert childNodes list to an array

    let i = 0;

    for (i = 0; i < 1; i++){
      children.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains('content') ) { // Ensure we're cloning element nodes
          const clone = child.cloneNode(true); // Clone the child node deeply
          contentDiv.appendChild(clone); // Append the cloned node to the div
        }
      });
    }

    var oldScroll = contentDiv.scrollTop;

    window.addEventListener("wheel", function (event) {
      event.preventDefault;

      var newScrollPosition = contentDiv.scrollTop += event.deltaY;

      // Apply the new scroll position to your div
      contentDiv.scrollTop = newScrollPosition;

      if (contentDiv.scrollTop >= contentDiv.scrollHeight / 2) {
        contentDiv.scrollTop = 0;
      } else if (contentDiv.scrollTop <= 0) {
        if(oldScroll < contentDiv.scrollTop){
          contentDiv.scrollTop = contentDiv.scrollHeight;
        }
        else {
          contentDiv.scrollTop = (contentDiv.scrollHeight / 3) - 30;
        }
        oldScroll = contentDiv.scrollTop;
      }
    });

    /* On Mobile */

    window.addEventListener("touchstart", touchStart, false);
    window.addEventListener("touchend", touchEnd, false);

    var start = {};

    function touchStart(event) {
      start = event.changedTouches[0].pageY;
    }

    function touchEnd(event) {
      var offset = {};

      offset = start - event.changedTouches[0].pageY;
      
      var newScrollPosition = contentDiv.scrollTop += offset;

      contentDiv.animate({
        scrollTop: newScrollPosition
      }, 100)

    }
  }

  setScroll('left');
  setScroll('right');

  // Scroll automatique

  const autoScroll = (side) => {
    var contentDiv = $(`#container-${side}`);
    var scrollPosition = contentDiv.scrollTop();
    var scrollHeight = contentDiv[0].scrollHeight;
    var scrollTarget = scrollPosition + scrollHeight
    var speed = scrollHeight * 25

    function animate(){
      contentDiv.animate({
        scrollTop: scrollTarget
      }, speed, 'linear', function() {
          contentDiv.animate({
            scrollTop: 0
          }, 0)
          animate()
          console.log(contentDiv.scrollTop)
      });
    }
    animate();
  }

  autoScroll('left');
  autoScroll('right');

  // Stop auto scroll when manual scroll then auto scroll

  $('.container').on('mousewheel', function(){
    stopScroll();

    clearTimeout($.data(this, 'scrollTimer'));

    $.data(this, 'scrollTimer', setTimeout(function() {
        autoScroll('left');
        autoScroll('right');
    }, 50));
  })

  /* Mobile */

  $('.container').on('touchstart', function(){
    stopScroll();
  })

  $('.container').on('touchend', function(){
    autoScroll('left');
    autoScroll('right');
  })

  // Pause scroll
  function stopScroll(){
    $('#container-left').stop();
    $('#container-right').stop();
  }

  // Check scroll

  var interval = self.setInterval(function(){ checkScroll() }, 1);

  function checkScroll(){

    // console.log(
    //   'scrollTop of container-left:',
    //   $('#container-left').scrollTop(),
    //   'scrollHeight of container-left:',
    //   $('#container-left').get(0).scrollHeight)

    // console.log(
    //   'scrollTop of container-right:',
    //   $('#container-right').scrollTop(),
    //   'scrollHeight of container-right:',
    //   $('#container-right').get(0).scrollHeight)

    var containerLeftScroll = Math.round( $('#container-left').scrollTop() + $('#container-left').innerHeight() );
    var containerRightScroll = Math.round( $('#container-right').scrollTop() + $('#container-right').innerHeight() );

    var containerLeftScrollMax = $('#container-left').get(0).scrollHeight;
    var containerRightScrollMax = $('#container-right').get(0).scrollHeight;


    if(containerLeftScroll == containerLeftScrollMax ){
      // console.log('Container-left bottom atteint');
      // BUG HERE
      // $('#container-left').animate({ scrollTop: 0 }, 0, function(){
        // autoScroll();
      //});
    }
    if(containerRightScroll == containerRightScrollMax ){
      // console.log('Container right bottom atteint');
      // BUG HERE
      //$('#container-right').animate({ scrollTop: 0 }, 0, function(){
        // autoScroll();
      //});
    }
  }

  // Même scrollHeight pour les deux containers
  
  var lowerDivHeight = $("#container-right").scrollHeight;
  var upperDivHeight = $("#container-left").scrollHeight;

  var lowerDiv = $("#container-right");
  var upperDiv = $("#container-left");

  // if(lowerDivHeight > upperDivHeight){
  //   var difference = lowerDivHeight - upperDivHeight;
  //   upperDiv.find('.content').last().css('margin', difference);
  //   console.log(lowerDiv.get(0).scrollHeight, upperDiv.get(0).scrollHeight)
  // }

  // if(upperDivHeight > lowerDivHeight){
  //   var difference = upperDivHeight - lowerDivHeight;
  //   lowerDiv.find('.content').last().css('margin', difference);
  //   console.log(lowerDiv.get(0).scrollHeight, upperDiv.get(0).scrollHeight)
  // }

  // Gestionnaire d'événement pour ajouter les classes au survol sur la div container inférieure
  // (pour détecter le mouseenter sur le contenu même si la div container a un z-index inférieur)

  const main = document.getElementById('main');
  const lowerDivContents = document.getElementById('container-right').querySelectorAll('.content');

  main.addEventListener('mousemove', function (event) {
    lowerDivContents.forEach(function (content) {
      const rect = content.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      if (
          mouseX >= rect.left && mouseX <= rect.right &&
          mouseY >= rect.top && mouseY <= rect.bottom
      ) {
          lowerDiv.addClass('hovered');
      }
    });
  });

  // Hovering content

  $('.content').on('mouseover',function() {
    stopScroll();

    var contentDiv = $(this);
    var otherDivs = $('.content').not(this);

    setAngle();
    otherDivs.each(function(){
      $(this).addClass('not-hovered').addClass('blurry');
    });

    contentDiv.addClass('hovered' );

    $('#header').addClass('not-hovered').addClass('blurry');

    contentDiv.parent().find('black-filter').addClass('hovered');
  });

  $('.content' ).on('mouseleave', function() {
    $('.content').not(this).each(function(){
      $(this).removeClass('not-hovered').removeClass('blurry');
    });

    $(this).removeClass('hovered');

    $('#header').removeClass('not-hovered').removeClass('blurry');

    lowerDiv.removeClass('hovered');

    autoScroll('left');
    autoScroll('right');
  });

  // Screensaver animation

  var asciiElement = document.getElementById('ascii');

  // Fonction pour changer les lettres à intervalles de 400ms
    function animateAscii() {
        setTimeout(function() {
            asciiElement.textContent = asciiElement.textContent.replace(/D/g, 'O');
            setTimeout(function() {
                asciiElement.textContent = asciiElement.textContent.replace(/O/g, 'U');
                setTimeout(function() {
                    asciiElement.textContent = asciiElement.textContent.replace(/U/g, 'B');
                    setTimeout(function() {
                        asciiElement.textContent = asciiElement.textContent.replace(/B/g, 'L');
                        setTimeout(function() {
                            asciiElement.textContent = asciiElement.textContent.replace(/L/g, 'E');
                            setTimeout(function() {
                                asciiElement.textContent = asciiElement.textContent.replace(/E/g, 'D');
                                setTimeout(function() {
                                    asciiElement.textContent = asciiElement.textContent.replace(/D/g, 'R');
                                    setTimeout(function() {
                                        asciiElement.textContent = asciiElement.textContent.replace(/R/g, 'A');
                                        setTimeout(function() {
                                            asciiElement.textContent = asciiElement.textContent.replace(/A/g, 'G');
                                            setTimeout(function() {
                                                asciiElement.textContent = asciiElement.textContent.replace(/G/g, 'O');
                                                setTimeout(function() {
                                                    asciiElement.textContent = asciiElement.textContent.replace(/O/g, 'N');
                                                    setTimeout(function() {
                                                        asciiElement.textContent = asciiElement.textContent.replace(/N/g, 'D');
                                                        animateAscii(); // Répéter l'animation
                                                    }, 400);
                                                }, 400);
                                            }, 400);
                                        }, 400);
                                    }, 400);
                                }, 400);
                            }, 400);
                        }, 400);
                    }, 400);
                }, 400);
            }, 400);
        }, 400);
    }

    // Lancer l'animation au chargement de la page
    animateAscii();

  // Lancer l'animation au chargement de la page
  animateAscii();

  // Screensaver responsive

  function checkDevice(){
    if(window.matchMedia("(max-width: 600px)").matches){
      $('#ascii').html($('#ascii-mobile').html())
    } else {
      $('#ascii').html($('#ascii-desktop').html())
    }
  }

  checkDevice();

  // Screensaver apparition

  function hideScreensaver(){
    $('#screensaver').removeClass('fade-in');
    setTimeout(function(){
      $('#screensaver').removeClass('display');
    }, 300)
    $('#main').addClass('loaded');
  }

  function displayScreensaver(){
    stopScroll();

    $('#screensaver').addClass('display');
    $('#screensaver').addClass('fade-in');
  }

  function fadeInScreensaver(){
    stopScroll();

    $('#screensaver').addClass('display');
    setTimeout(function(){
      $('#screensaver').addClass('fade-in');
    }, 10)
  }

  $('#screensaver').on('click', function(){
    hideScreensaver();
    autoScroll('left');
    autoScroll('right');
  })

  // Show screensaver when user unactive for 2 minutes

  onInactive(60000, function () {
    displayScreensaver();
  });

  function onInactive(ms, cb) {
      var wait = setTimeout(cb, ms);

      document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
          clearTimeout(wait);
          wait = setTimeout(cb, ms);
      };
  }

  document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState == "visible") {
      // console.log("tab is active")
    } else {
      displayScreensaver();
    }
  });

  // Loader and fade-in

  function loading(){
    $('.logo').addClass('loading');
  }

  function loaded(){
    $('.logo').removeClass('loading');
    $('.logo').addClass('loaded');
    $('.nav').addClass('fade-in');
    containerFadeIn();
  }

  function containerFadeIn(){
    $('#container-left').addClass('fade-in');
    $('#container-right').addClass('fade-in');
  }

  var images = document.querySelectorAll('img');
  var videos = document.querySelectorAll('video');
  var totalElements = images.length + videos.length;
  var elementsLoaded = 0;

  function checkAllElementsLoaded() {
    loading();
    elementsLoaded++;
    if (elementsLoaded === totalElements) {
      loaded();
    }
  }

  // Ajouter des écouteurs d'événements pour les images et les vidéos
  images.forEach(function(image) {
    if (image.complete) {
      checkAllElementsLoaded();
    } else {
      image.addEventListener('load', checkAllElementsLoaded);
    }
  });

  videos.forEach(function(video) {
    if (video.readyState >= 1) {
      checkAllElementsLoaded();
    } else {
      video.addEventListener('loadedmetadata', checkAllElementsLoaded);
    }
  });

  // On mobile, juste les images

  function checkFeedForMobile() {
    if(window.matchMedia("(max-width: 600px)").matches){
      loading();
      setTimeout(function(){
        loaded();
      }, 8000)
    }
  }

  checkFeedForMobile();


  // Favico dark mode change

  var favico = document.querySelector('[rel=icon]');

  var favicoLight16x16 = document.getElementById("favicon-light-16x16"); 
  var favicoLight32x32 = document.getElementById("favicon-light-32x32");

  var favicoDark16x16 = document.getElementById("favicon-dark-16x16"); 
  var favicoDark32x32 = document.getElementById("favicon-dark-32x32");

  const runColorMode = (fn) => {
    if (!window.matchMedia) {
      return;
    }
    
    const query = window.matchMedia('(prefers-color-scheme: dark)');

    fn(query.matches);

    query.addEventListener('change', (event) => fn(event.matches));
  }

  runColorMode((isDarkMode) => {
    if (isDarkMode) {
      // favico.setAttribute("href", favicoDark16x16.src );
      //favico32x32.setAttribute("href", favicoDark32x32.href );
    } else {
      // favico.setAttribute("href", favicoLight16x16.src );
      //favico32x32.setAttribute("href", favicoLight32x32.href );
    }
  })
});