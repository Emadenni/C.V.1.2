import overlays from "./overlays.js";

const menuIcons = document.querySelectorAll(".menuIcon");
const menuListItems = document.querySelectorAll(".menuList li");
const menuList = document.querySelector(".menuList");
const startBtn = document.querySelector(".startBtn");

menuIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    setTimeout(() => {
      menuIcons[0].classList.add("hidden");
    }, 20);

    // Nascondi il secondo frame dopo 400 millisecondi
    setTimeout(() => {
      menuIcons[1].classList.add("hidden");
    }, 40);

    // Mostra il terzo frame dopo 600 millisecondi
    setTimeout(() => {
      menuIcons[2].classList.remove("hidden");
    }, 40);

    // Nascondi il terzo frame dopo 800 millisecondi
    setTimeout(() => {
      menuIcons[2].classList.add("hidden");
    }, 60);

    // Mostra il quarto frame dopo 1000 millisecondi
    setTimeout(() => {
      menuIcons[3].classList.remove("hidden");

      // Rimuovi la classe "hidden" da menuList
      menuList.classList.remove("hidden");

      // Mostra gli elementi della lista uno per volta
      menuListItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("hidden");
        }, 140 * (index + 1)); // Ritardo di 500 millisecondi tra ciascun elemento
      });
    }, 50);
  });
});

function resetMenu() {
  // Nascondi la lista e gli elementi della lista
  menuListItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("hidden");
    }, 20 * (menuListItems.length - index));
  });

  // Nascondi la lista dopo un ritardo
  setTimeout(() => {
    menuList.classList.add("hidden");
  }, 30 * menuListItems.length);

  menuIcons.forEach((icon, index) => {
    if (index === 0) {
      // Mantieni visibile solo il primo menuIcon
      icon.classList.remove("hidden");
    } else {
      // Nascondi gli altri menuIcon dopo un ritardo
      setTimeout(() => {
        icon.classList.add("hidden");
      }, 0 * (index + menuListItems.length));
    }
  });
}

document.querySelector("#resetBtn").addEventListener("click", resetMenu);
function typeWriter(text, i, elementId, callback, delay = 80) {
  const element = document.getElementById(elementId);
  if (i < text.length) {
    if (text.charAt(i) === "<") {
      const endIndex = text.indexOf(">", i);
      element.insertAdjacentHTML("beforeend", text.substring(i, endIndex + 1));
      i = endIndex + 1;
    } else {
      element.insertAdjacentHTML("beforeend", text.charAt(i));
      i++;
    }

    setTimeout(function () {
      typeWriter(text, i, elementId, callback, delay);
    }, delay);
  } else {
    if (callback) callback();
  }
}
// Avvia l'animazione 3 secondi dopo il caricamento della pagina
setTimeout(function () {
  const text1 = `If you're here, it's probably because, for some reason, you want to know a bit more about me.`;
  const typedTextElement = document.getElementById("typedText");
  typedTextElement.innerHTML = ""; // Resetta il testo
  typeWriter(text1, 0, "typedText", function () {
    setTimeout(function () {
      startBtn.classList.remove("notVisible");
      startBtn.classList.add("visible");
    }, 4000);
  });
}, 2000);

setTimeout(function () {
  const text2 = `If that's the
  case, then LET'S GET DO IT!`;
  const typedTextElement = document.getElementById("typedText2");
  typeWriter(text2, 0, "typedText2", function () {
    setTimeout(function () {}, 80);
  });
}, 11000);

/* startBtn.addEventListener("click", () => {
  console.log("Clicked start button");
}); */



// Funzione per visualizzare l'overlay
let overlayIndex = 0; // Indice per tenere traccia dell'overlay corrente

function createOverlay(overlay) {
  return `
    <section id="overlay-content">
      <figure class="pic"><img class="argumentsIcons" src="${overlay.img}" alt="pic" /></figure>
      <article>
        <h2 id="overlayTitle">${overlay.title}</h2>
        <div id="overlayInfoBox">
          ${overlay.info.paragraph ? `<p id="overlayParagraph">${overlay.info.paragraph}</p>` : ""}
          ${
            overlay.info.list
              ? `<ul id="overlayList">${overlay.info.list.map((item) => `<li>${item}</li>`).join("")}</ul>`
              : ""
          }
        </div>
        <aside id="buttonsBox">
          <button id="backBtn" class="navigationBtn">Back</button>
          <button id="continueBtn" class="navigationBtn">Next</button>
          <button id="skipBtn" class="navigationBtn">Skip</button>
        </aside>
      </article>
    </section>
  `;
}

// Aggiungi una funzione per creare la barra di progresso
function createProgressBar() {
  return `<div id="progress-bar-container">
            <div id="progress-bar"></div>
          </div>`;
}

// Aggiorna la funzione showOverlay
function showOverlay() {
  const mainContent = document.getElementById('main-content');

  // Svuota completamente mainContent
  mainContent.innerHTML = '';

  // Controlla se abbiamo più overlay da mostrare
  if (overlayIndex < overlays.length) {
    const overlay = overlays[overlayIndex];

    if (overlay && overlay.img && overlay.title && overlay.info) {
      const overlayContainer = document.createElement('div');
      overlayContainer.innerHTML = createOverlay(overlay);
      overlayContainer.innerHTML += createProgressBar();

      // Aggiungi gestione eventi per i bottoni (back, next, skip) e altre logiche necessarie
      const backBtn = overlayContainer.querySelector('#backBtn');
      const continueBtn = overlayContainer.querySelector('#continueBtn');
      const skipBtn = overlayContainer.querySelector('#skipBtn');

      backBtn.addEventListener('click', handleBack);
      continueBtn.addEventListener('click', handleContinue);
      skipBtn.addEventListener('click', handleSkip);

      // Mostra l'overlay
      mainContent.appendChild(overlayContainer);
      updateProgressBar(); // Aggiorna la barra di progresso iniziale
    } else {
      console.error('Dati overlay non validi o mancanti.');
    }
  } else {
    // Mostriamo tutti gli overlay, fai qualcosa quando hai finito
    console.log('Hai mostrato tutti gli overlay!');
  }
}

// Funzione per aggiornare la barra di progresso
function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = (overlayIndex + 1) / overlays.length * 100; // Calcola la percentuale di progresso
  progressBar.style.width = `${progressPercentage}%`;
}

// Restante codice rimane invariato
// ...

// Aggiungi la logica per mostrare l'overlay quando si clicca su "Start"
startBtn.addEventListener('click', showOverlay);

function handleBack() {
  
  // Logica per tornare all'overlay precedente
  overlayIndex--;
  updateProgressBar()
  showOverlay();
  console.log("Back button clicked");
}

function handleContinue() {
  // Logica per passare all'overlay successivo
  overlayIndex++;
  updateProgressBar()
  showOverlay(); // Mostra il prossimo overlay
}

function handleSkip() {
  // Logica per saltare agli ultimi overlay
  overlayIndex = overlays.length; // Imposta l'indice all'ultimo overlay
  showOverlay(); // Mostra l'ultimo overlay
}

// Aggiungi la logica per mostrare l'overlay quando si clicca su "Start"
startBtn.addEventListener("click", showOverlay);
