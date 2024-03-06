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

  // Cursor trail text

  function JSFX_StartEffects() {
    JSFX.MakeTextFlag(aboutText, "#FFF", "", 4);
  }

  // Fade In

  $('#about').addClass('fade-in');

  // Click on background go to home

  $('#about').on('click', function(){
    window.location.href = "./";
  })

  // Call to action on mobile

  var aboutText = document.getElementById('about-text').innerHTML;

  if(window.matchMedia("(max-width: 600px)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

    const callToActionDiv = document.createElement("div");
    const callToActionP = document.createElement("p");

    callToActionDiv.appendChild(callToActionP);

    callToActionDiv.id = 'call-to-action';

    callToActionP.innerHTML = 'Drag to move'

    const currentDiv = document.getElementById("manifesto");
    document.getElementById('main').appendChild(callToActionDiv);

    function setTouchInteraction(){
      $('#call-to-action').css('display', 'none');
      $('#canvas').css('opacity', 1)
    }

    $('#call-to-action').on('click', setTouchInteraction)

    $('#call-to-action').on('touch', setTouchInteraction)

    $('#call-to-action').on('touchmove', setTouchInteraction)

    // Sentence follow touch 
    paper.install(window);

    var tool1, tool2;
    var word = aboutText;

    function init() {

      paper.setup('canvas');

      var path = new Path();
      var points = word.length;
      var length = word.length;
      var vw = $(window).width()/100;

      var createPointText = function(str, style) {
          var text = new PointText();
          text.content = str;
          text.fillColor = '#FFFFFF';
          if (style) {
              if (style.font) text.font = style.font;
              if (style.fontFamily) text.fontFamily = style.fontFamily;
              if (style.fontSize) text.fontSize = style.fontSize;
              if (style.fontWeight) text.fontWeight = style.fontWeight;
          }
          return text;
      }

      var start = new paper.Point(Math.random()*100,Math.random()*100);
      for(var i = 0; i < points; i++) {
        path.add(new paper.Point(i * length + start.x, 0 + start.y));
        path.smooth();
      }

      var createAlignedText = function(str, path, style) {
          if (str && str.length > 0 && path) {
              // create PointText object for each glyph
              var glyphTexts = [];
              for (var i = 0; i < str.length; i++) {
                  glyphTexts[i] = createPointText(str.substring(i, i+1), style);
                  glyphTexts[i].justification = "center";
              }
              // for each glyph find center xOffset
              var xOffsets = [0];
              for (var i = 1; i < str.length; i++) {
                  var pairText = createPointText(str.substring(i - 1, i + 1), style);
                  pairText.remove();
                  xOffsets[i] = xOffsets[i - 1] + pairText.bounds.width -
                      glyphTexts[i - 1].bounds.width / 2 - glyphTexts[i].bounds.width / 2;
              }
              // set point for each glyph and rotate glyph aorund the point
              for (var i = 0; i < str.length; i++) {
                  var centerOffs = xOffsets[i];
                  if (path.length < centerOffs) {
                      if (path.closed) {
                          centerOffs = centerOffs % path.length;
                      }  else {
                          centerOffs = undefined;
                      }
                  }
                  if (centerOffs === undefined) {
                      glyphTexts[i].remove();
                  } else {
                      var pathPoint = path.getPointAt(centerOffs);
                      glyphTexts[i].point = pathPoint;
                      var tan = path.getTangentAt(centerOffs);
                      glyphTexts[i].rotate(tan.angle, pathPoint);
                  }
              }
          }
      }

      tool1 = new Tool();
      tool1.onMouseMove = function(event) {
        project.clear();
        var x, y;
        path.firstSegment.point = event.point;
        for (var i = 0; i < points - 1; i++) {
            var segment = path.segments[i];
            var nextSegment = segment.next;
            var vector = new paper.Point(segment.point.x - nextSegment.point.x,segment.point.y - nextSegment.point.y);
            vector.length = length;
            nextSegment.point = new paper.Point(segment.point.x - vector.x,segment.point.y - vector.y);
        }

        path.smooth();
        path.strokeColor = 'blue';
        path.smooth({ type: 'continuous' });

          if($(window).width() <= 900 ){
            createAlignedText(word, path, {
              fontSize: 14,
              fontFamily: 'DM Mono'
            });
          } else {
            createAlignedText(word, path, {
              fontSize: 14,
              fontFamily: 'DM Mono'
            });
          }

        path.fullySelected = true;

      }

      tool2 = new Tool();
      tool2.onMouseMove = function(event) {

        var path = new Path.Circle(new Point(event.point, event.point), 20);
        view.onFrame = function(event) {
          project.clear();
          createAlignedText("LOADING", path, {
            fontSize: vw*2,
            fontFamily: 'Arial'
          });
          path.rotate(5);
        }

      }

    }

    init();
    tool1.activate();
  } else {
    JSFX_StartEffects();
  }
}