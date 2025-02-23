function validarFormulario(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const fecha = document.getElementById("fecha").value;
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  const introScreen = document.getElementById("intro-screen");
  const introSound = document.getElementById("intro-sound");

  if (nombre !== "Skarleth") {
    modalText.textContent = "Ni sé quién eres, sal de aquí";
    modal.classList.remove("hidden");
    return;
  }

  if (fecha !== "2025-02-13") {
    modalText.textContent = "Esa no es la fecha especial";
    modal.classList.remove("hidden");
    return;
  }

  // Mostrar pantalla de intro
  introScreen.classList.remove("hidden");
  introSound.play();

  setTimeout(() => {
    window.location.href = "perfil.html";
  }, 3000);
}

function cerrarModal() {
  document.getElementById("modal").classList.add("hidden");
}

function seleccionarPerfil(perfil) {
  window.location.href = "pelis.html";
}


/** @module MainScript */

/**
 * this add height for every line on write tweet textarea
 * @param {*} element 
 */
function textAreaAdjust(element) {
  element.style.height = "40px";
  element.style.height = (25+element.scrollHeight)+"px";
}

/**
* mobile nav flag
*/
let isOpen = false


let sidenav = $("#mobile-left-nav")
let wrapper = $(".wrapper")

/**
* event that handle mobile nav on to show 
*/
$("#mobile-nav-open").on("click", ()=>{
  if(!isOpen){
      sidenav.removeClass("-translate-x-[30rem] ")
      sidenav.addClass("z-[999999] translate-x-0")
      wrapper.addClass("blur-sm")
      isOpen = true
  }
})

/**
* event that handle mobile nav on to dismiss 
*/
$("#mobile-nav-close, #dismiss-side").on("click", ()=>{
  if(isOpen){
      sidenav.removeClass("z-[999999] translate-x-0")
      wrapper.removeClass("blur-sm")
      sidenav.addClass("-translate-x-[30rem]")
      isOpen = false
  }
})

/**
* mobile top nav slightly translated to top on scroll
*/
let topbar = $("#topbar")
var prevScrollpos = window.pageYOffset;
// Create a media condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(max-width: 648px)')

const navScroll =  () => {
  if (mediaQuery.matches) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
          if(topbar.hasClass("-translate-y-12")){
              $("#topbar").removeClass("-translate-y-12")
          }
      } else {
          if(!topbar.hasClass("-translate-y-12")){
              $("#topbar").addClass("-translate-y-12")
          }
      }
      prevScrollpos = currentScrollPos;
  }
}

window.onscroll = navScroll