function JSFX_StartEffects() {
  var aboutText = document.getElementById('about-text').innerHTML;
  JSFX.MakeTextFlag(aboutText, "#FFF", "", 4);
}

window.onload = JSFX_StartEffects();