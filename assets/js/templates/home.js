$(document).ready(function() {

  // Le scroll automatique s'arrête au hover sur un contenu

  $('.media').hover( function() {
    $('#container-left').stop();
    $('#container-right').stop();
  })

  // Le scroll automatique reprend au mouseleave

  $('.media').on('mouseleave', function() {
    autoScroll();
  })

  // 1. Skew les div container et contents
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

  window.addEventListener('load',function() { changeSkew(); });
  window.addEventListener('resize',function() { changeSkew(); });

  // 2. Synchronize scroll of two containers

  var containerLeft = document.getElementById('container-left');
  var containerRight = document.getElementById('container-right');

  var activeTouch = null;
  var touchStartY = 0;
  var containerLeftStartScrollTop = 0;
  var containerRightscrollSyncFactor = 0;

  document.addEventListener('touchstart', function(event) {
      event.preventDefault();
      
      var touch = event.changedTouches[0];
     
      if ( activeTouch == null ) {
          activeTouch = touch;
          touchStartY = touch.screenY;
          containerLeftStartScrollTop = containerLeft.scrollTop;
          // if scroll content does not change do this calculation only once to safe compute time while animating
          calcSyncFactor();
      }
  });

  function calcSyncFactor()
  {
    containerRightscrollSyncFactor = (containerRight.scrollHeight - containerRight.clientHeight) / (containerLeft.scrollHeight - containerLeft.clientHeight);    
  }

  containerLeft.addEventListener('touchend', touchEnd);
  containerLeft.addEventListener('touchcancel', touchEnd);

  function touchEnd(event) {
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
              containerLeft.scrollTop = containerLeftStartScrollTop + (0 - yOffset);
              syncScroll();
              break;
          }
      }    
  });

  function syncScroll()
  {
      containerRight.scrollTop = Math.round(containerLeft.scrollTop * containerRightscrollSyncFactor);
  }

  var touchSupported = 'ontouchstart' in document.documentElement;

  if ( !touchSupported ) {
    calcSyncFactor();
    containerLeft.addEventListener('scroll', syncScroll);    
  } 

  // Fade In

  $('.fade').css('opacity', 1);

  // Charles new scroll loop

  const setScroll = (side) => {
    // scrollable div
    var contentDiv = document.getElementById(`container-${side}`);
    const children = Array.from(contentDiv.childNodes); // Convert childNodes list to an array

    children.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) { // Ensure we're cloning element nodes
        const clone = child.cloneNode(true); // Clone the child node deeply
        contentDiv.appendChild(clone); // Append the cloned node to the div
      }
    });

    window.addEventListener("wheel", function (event) {
      event.preventDefault;

      var newScrollPosition = contentDiv.scrollTop += event.deltaY;

      // Apply the new scroll position to your div
      contentDiv.scrollTop = newScrollPosition;

      if (contentDiv.scrollTop >= contentDiv.offsetHeight) {
        contentDiv.scrollTop = 0;
      } else if (contentDiv.scrollTop <= 0) {
        contentDiv.scrollTop = contentDiv.offsetHeight;
      }
    });
  }

  setScroll('left');
  setScroll('right');

  // Initialize scroll

  const initScroll = (side) => {
    document.getElementById(`container-${side}`).scrollTop = 0;
  }

  initScroll('left');
  initScroll('right');

  // Debug : check scroll 

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
      console.log('Container-left bottom atteint');
      // BUG HERE
      $('#container-left').animate({ scrollTop: 0 }, 0, function(){
        autoScroll();
      });
    }
    if(containerRightScroll == containerRightScrollMax ){
      console.log('Container right bottom atteint');
      // BUG HERE
      $('#container-right').animate({ scrollTop: 0 }, 0, function(){
        autoScroll();
      });
    }
  }

  // Le scroll automatique s'arrête au scroll manuel puis reprend

  $('.container').on('mousewheel', function(){
    $('#container-left').stop();
    $('#container-right').stop();
    clearTimeout($.data(this, 'scrollTimer'));
      $.data(this, 'scrollTimer', setTimeout(function() {
          autoScroll();
          // console.log("Haven't scrolled in 25ms!");
      }, 25));
  });

  // Même scrollHeight pour les deux containers
  
  var lowerDivHeight = $("#container-right").scrollHeight;
  var upperDivHeight = $("#container-left").scrollHeight;

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

                // $('#header').addClass('not-hovered').addClass('blurry');
                lowerDiv.addClass('hovered').removeClass('not-hovered');
                upperDiv.addClass('not-hovered').removeClass('hovered');
            } else {
                currentDiv.on('mouseleave', function() {
                  $('#header').removeClass('not-hovered').removeClass('blurry');
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

  // Scroll automatique

  function autoScroll(){
    $('#container-left').animate({ scrollTop: $('#container-left').get(0).scrollHeight }, 80000, 'linear', function(){
      autoScroll();
    });
    $('#container-right').animate({ scrollTop: $('#container-right').get(0).scrollHeight }, 80000, 'linear', function(){
      autoScroll();
    });
    $('#header').removeClass('not-hovered').removeClass('blurry');
  };

  autoScroll();

  // Loader

  var fadeInDelay;

  function hideLoader(){
    $('#loader').removeClass('loading');
    $('#loader').addClass('hide');
    $('#main').addClass('loaded');
    $('#container-left').stop();
    $('#container-right').stop();
    autoScroll();
  }

  function displayLoader(){
    $('#loader').addClass('loading')

    $('#loader').on('click', function(){
      hideLoader();
    })

    setTimeout(function() {
      hideLoader();
    }, 5000)
  }
  
  if (sessionStorage.getItem('isNewSession')) {
    hideLoader();
    fadeInDelay = 0;
    console.log('isNewSession: no')
  } else {
    sessionStorage.setItem('isNewSession', 'true');
    displayLoader();
    fadeInDelay = 1900; 
    console.log('isNewSession: yes')
  }
   
  setTimeout(fadeInDelay);

});