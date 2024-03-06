window.onload = function() {

  // Screensaver responsive

  function checkDevice(){
    if(window.matchMedia("(max-width: 600px)").matches){
      $('#ascii').html($('#ascii-mobile').html())
    } else {
      $('#ascii').html($('#ascii-desktop').html())
    }
  }

  checkDevice();

  window.addEventListener('resize',function() { 
    checkDevice();
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

  // Screensaver apparition

  function hideScreensaver(){
    $('#screensaver').removeClass('fade-in');
    setTimeout(function(){
      $('#screensaver').removeClass('display');
    }, 300)
    $('#main').addClass('loaded');
  }

  function displayScreensaver(){
    $('#screensaver').addClass('display');
    $('#screensaver').addClass('fade-in');
  }

  function fadeInScreensaver(){
    $('#screensaver').addClass('display');
    setTimeout(function(){
      $('#screensaver').addClass('fade-in');
    }, 10)
  }

  $('#screensaver').on('click', function(){
    hideScreensaver();
  })

  // Show screensaver when user unactive for 2 minutes

  onInactive(120000, function () {
    displayScreensaver();
  });

  function onInactive(ms, cb) {
      var wait = setTimeout(cb, ms);

      document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
          clearTimeout(wait);
          wait = setTimeout(cb, ms);
      };
  }

  document.addEventListener("visibilitychange", () => {
    displayScreensaver();   
  });

  // when the user loses focus
  window.addEventListener("blur", () => {
    displayScreensaver();
  });
  
  // Click on background go to home

  $('#index-of-projects').on('click', function(){
    window.location.href = "./";
  })

  // Fade In

  $('#index-of-projects').addClass('fade-in');
}