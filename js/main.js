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


