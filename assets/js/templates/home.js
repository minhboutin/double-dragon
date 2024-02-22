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

  function changeSkew(){
    setAngle();

    $('.skew.left').css('transform', 'skew(' + angle + 'deg)');
    $('.skew.left > *').css('transform', 'scale(0.98) skew(' + invertAngle + 'deg)');

    $('.skew.right').css('transform', 'skew(' + invertAngle + 'deg)');
    $('.skew.right > *').css('transform', 'scale(0.98) skew(' + angle + 'deg)');
  }

  window.addEventListener('load',function() { changeSkew(); });
  window.addEventListener('resize',function() { changeSkew(); });


  // Synchronize scroll of two containers


  var element1 = document.getElementById('container-left');
  var element2 = document.getElementById('container-right');

  var activeTouch = null;
  var touchStartY = 0;
  var element1StartScrollTop = 0;
  var element2scrollSyncFactor = 0;

  document.addEventListener('touchstart', function(event) {
      event.preventDefault();
      
      var touch = event.changedTouches[0];
     
      if ( activeTouch == null ) {
          activeTouch = touch;
          touchStartY = touch.screenY;
          element1StartScrollTop = element1.scrollTop;
          // if scroll content does not change do this calculation only once to safe compute time while animating
          calcSyncFactor();
      }
  });

  function calcSyncFactor()
  {
    element2scrollSyncFactor = (element2.scrollHeight - element2.clientHeight) / (element1.scrollHeight - element1.clientHeight);    
  }

  element1.addEventListener('touchend', touchEnd);
  element1.addEventListener('touchcancel', touchEnd);

  function touchEnd(event)
  {
      for ( var i = 0; i < event.changedTouches.length; i++ ) {
          var touch = event.changedTouches[i];
          if ( touch === activeTouch ) {
              activeTouch = null;
              break;
          }
      }    
  }

  document.addEventListener('touchmove', function() {
      for ( var i = 0; i < event.changedTouches.length; i++ ) {
          var touch = event.changedTouches[i];
          
          if ( touch === activeTouch ) {
              var yOffset = touch.screenY - touchStartY;
              element1.scrollTop = element1StartScrollTop + (0 - yOffset);
              syncScroll();
              break;
          }
      }    
  });

  function syncScroll()
  {
      element2.scrollTop = Math.round(element1.scrollTop * element2scrollSyncFactor);
  }

  var touchSupported = 'ontouchstart' in document.documentElement;

  if ( !touchSupported ) {
      calcSyncFactor();
      element1.addEventListener('scroll', syncScroll);    
  } 


  // Test pour looper le scroll 
  // à partir de cet exemple : https://codepen.io/vincentorback/pen/OpdNJa


  var doc = window.document,
  context = doc.querySelector('.js-loop.left'),
  items = context.querySelectorAll('.content'),
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0,
  i = 0;

  function cloneContents() {
    const container = $('#container-right');
    const contents = $('.content');

    contents.each(function() {
      const clone = $(this).clone(true);
      clone.addClass('is-clone'); // Add the is-clone class to the clone
      container.append(clone);
    });
  }

  // cloneContents();

  var clones = context.querySelectorAll('.js-clone');

  function getScrollPos () {
    return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
  }

  function setScrollPos (pos) {
    context.scrollTop = pos;
  }

  function getClonesHeight () {
    clonesHeight = 0;

    for (i = 0; i < clones.length; i += 1) {
      clonesHeight = clonesHeight + clones[i].offsetHeight;
    }

    return clonesHeight;
  }

  function reCalc () {
    scrollPos = getScrollPos();
    scrollHeight = context.scrollHeight;
    clonesHeight = getClonesHeight();

    if (scrollPos <= 0) {
      setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
    }
  }

  // console.log(document.getElementById('container-left').scrollHeight)

  function scrollUpdate () {
    if (!disableScroll) {
      scrollPos = getScrollPos();

    if (scrollPos >= 2265) {
      // Scroll to the top when you’ve reached the bottom
      setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
      disableScroll = true;
    } else if (scrollPos <= 0) {
      // Scroll to the bottom when you reach the top
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }

    if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
      window.setTimeout(function () {
        disableScroll = false;
      }, 40);
    }
  }

  window.requestAnimationFrame(reCalc);

  context.addEventListener('scroll', function () {
    window.requestAnimationFrame(scrollUpdate);
  }, false);

  window.addEventListener('resize', function () {
    window.requestAnimationFrame(reCalc);
  }, false);

  // Just for this demo: Center the middle block on page load
  // window.onload = function () {
  // setScrollPos(Math.round(clones[0].getBoundingClientRect().top + getScrollPos() - (context.offsetHeight - clones[0].offsetHeight) / 2));
  // };


  // Fade In

  $('.fade').css('opacity', 1)


  // Même scrollHeight pour les deux containers
  // (non nécessaire si le scroll entre les deux divs est proportionnel)


  /*
  var lowerDivHeight = lowerDiv.get(0).scrollHeight;
  var upperDivHeight = upperDiv.get(0).scrollHeight;

  if(lowerDivHeight > upperDivHeight){
    var difference = lowerDivHeight - upperDivHeight;
    upperDiv.find('.content').last().css('margin', difference);
    console.log(lowerDiv.get(0).scrollHeight, upperDiv.get(0).scrollHeight)
  }

  if(upperDivHeight > lowerDivHeight){
    var difference = upperDivHeight - lowerDivHeight;
    lowerDiv.find('.content').last().css('margin', difference);
    console.log(lowerDiv.get(0).scrollHeight, upperDiv.get(0).scrollHeight)
  }*/



  // Test de scroll automatique


  function autoScroll(){
    $('#container-left').animate({ scrollTop: $('#container-left').get(0).scrollHeight }, 80000,"linear", function(){
      scroll();
    });
  };

  autoScroll();

  // Le scroll automatique s'arrête au hover sur un contenu

  $('.media').hover( function() {
    $('#container-left').stop();
  })

  // Le scroll automatique reprend au mouseleave

  $('.media').on('mouseleave', function() {
    autoScroll();
    $('#header').removeClass('not-hovered').removeClass('blurry');
  })

  // Le scroll automatique s'arrête au scroll manuel puis reprend

  $('.container').on('mousewheel', function(){
    $('#container-left').stop();
    clearTimeout($.data(this, 'scrollTimer'));
      $.data(this, 'scrollTimer', setTimeout(function() {
          autoScroll();
          console.log("Haven't scrolled in 25ms!");
      }, 25));
  });


  // Gestionnaire d'événement pour ajouter les classes au survol sur la div container inférieure
  // (pour détecter le mouseenter sur le contenu même si la div container a un z-index inférieur)


  var lowerDiv = $("#container-right");
  var upperDiv = $("#container-left");

  $(document).on("mousemove", function(event) {

    var mouseX = event.pageX;
    var mouseY = event.pageY;

    var lowerDivOffset = lowerDiv.offset();
    var lowerDivWidth = lowerDiv.outerWidth();
    var lowerDivHeight = lowerDiv.outerHeight();

    if (
        mouseX >= lowerDivOffset.left &&
        mouseX <= lowerDivOffset.left + lowerDivWidth &&
        mouseY >= lowerDivOffset.top &&
        mouseY <= lowerDivOffset.top + lowerDivHeight
    ) {
        lowerDiv.find('.content').find('.media').each(function() {
            var currentDiv = $(this);
            var currentDivOffset = currentDiv.offset();
            var currentDivWidth = currentDiv.outerWidth();
            var currentDivHeight = currentDiv.outerHeight();

            if (
                mouseX >= currentDivOffset.left &&
                mouseX <= currentDivOffset.left + currentDivWidth &&
                mouseY >= currentDivOffset.top &&
                mouseY <= currentDivOffset.top + currentDivHeight
            ) {
                currentDiv.addClass('hovered');
                lowerDiv.find('.content').not(currentDiv).addClass('not-hovered');

                $('#header').addClass('not-hovered').addClass('blurry');
                lowerDiv.addClass('hovered').removeClass('not-hovered');
                upperDiv.addClass('not-hovered').removeClass('hovered');
            } else {
                currentDiv.on('mouseleave', function() {
                  lowerDiv.removeClass('hovered').add('not-hovered');
                  upperDiv.removeClass('not-hovered').add('hovered');
                })
            }
        });
      } else {
          // lowerDiv.find('.content').removeClass('hovered not-hovered');
      }
  });

  $('.content').on('mouseenter',function() {
    setAngle();

    $('.content').not(this).each(function(){
      $(this).addClass('not-hovered').addClass('blurry');
    });
    $(this).addClass('hovered' );

    $('#header').addClass('not-hovered').addClass('blurry');
    // $('.black-filter').addClass('hovered');

    $('#container-left').addClass('hovered').removeClass('not-hovered');
    $('#container-right').addClass('not-hovered').removeClass('hovered');
  });

  $('.content' ).on('mouseleave', function() {
    $('.content').not(this).each(function(){
      $(this).removeClass('not-hovered').removeClass('blurry');
    });
    $(this).removeClass('hovered');

    $('#header').removeClass('not-hovered').removeClass('blurry');
    // $('.black-filter').removeClass('hovered');
  });

});