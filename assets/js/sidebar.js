// -------------------------------
// SIDEBAR DINAMICA CON YOUTUBE COOKIE
// -------------------------------
async function loadSidebar() {
  try {
    const response = await fetch('assets/data/sidebar.json'); // percorso corretto
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = ''; // pulisce eventuali contenuti

    // Controlla se l'utente ha accettato i cookie YouTube
    const accepted = localStorage.getItem('youtubeCookiesAccepted') === 'true';

    data.forEach(item => {
      const chapter = document.createElement('div');
      chapter.className = 'chapter';

      // Struttura immagine + titolo
      chapter.innerHTML = `
  <div class="vertical-column">

    <!-- PRIMO BLOCCO: titolo -->
    <h3>${item.title}</h3>

    <!-- SECONDO BLOCCO: immagine + video -->
    <div class="chapter">
      <div class="chapter-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="chapter-text">
        ${
          accepted
            ? `<iframe src="${item.youtube}" class="youtube-preview" allowfullscreen></iframe>`
            : `<div class="youtube-cookie-banner">
                 <p>To view YouTube previews, please accept cookies.</p>
                 <button class="btn-accept-cookies">Accept</button>
               </div>`
        }
      </div>
    </div>

  </div>
`;

      sidebar.appendChild(chapter);
    });

    // Aggiunge listener ai pulsanti "Accept"
    sidebar.querySelectorAll('.btn-accept-cookies').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem('youtubeCookiesAccepted', 'true');
        loadSidebar(); // ricarica la sidebar con iframe
      });
    });

  } catch (error) {
    console.error('Errore caricamento sidebar:', error);
  }
}

// Avvia al caricamento della pagina
document.addEventListener('DOMContentLoaded', loadSidebar);