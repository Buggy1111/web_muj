document.addEventListener("DOMContentLoaded", function() {
  // Souřadnice pro Odry Kamenka 114
  var lat = 49.7342493;
  var lon = 17.795874;
  var map = L.map('premium-map').setView([lat, lon], 15); // Přiblížení na adresu

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> | Design Michal Bürgermeister',
    maxZoom: 17,
    minZoom: 7
  }).addTo(map);

  // Prémiová zlatá custom ikona (SVG)
  var goldIcon = L.divIcon({
    html: `<svg width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="17" fill="#1e2340" stroke="#d8a44d" stroke-width="3"/>
      <text x="18" y="24" text-anchor="middle" font-size="20" fill="#ffd76b" font-family="Inter, Arial, sans-serif" font-weight="bold">M</text>
    </svg>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 34],
    popupAnchor: [0, -36]
  });

  // Marker s popupem na adresu Odry Kamenka 114 + odkaz na navigaci
  L.marker([lat, lon], {icon: goldIcon}).addTo(map)
    .bindPopup(
      '<b>Michal Bürgermeister</b><br>Odry Kamenka 114<br>Moravskoslezský kraj<br><br>' +
      '<a href="https://www.google.com/maps/dir/?api=1&destination=49.7342493,17.795874" target="_blank" rel="noopener" style="color:#d8a44d;font-weight:bold;text-decoration:underline;">Navigovat sem</a>'
    );

  // Animace přiblížení
});

document.addEventListener("DOMContentLoaded", function() {
  // Otevření modal při kliknutí na certifikát
  document.querySelectorAll(".cert-clickable").forEach(function(item) {
    item.addEventListener("click", function() {
      document.getElementById("cert-modal-img").src = item.getAttribute("data-img");
      document.querySelector(".cert-modal-title").innerHTML = item.getAttribute("data-title");
      document.querySelector(".cert-modal-caption").innerHTML = item.getAttribute("data-caption");
      document.getElementById("cert-modal").style.display = "flex";
    });
  });
  // Zavírání modal
  document.querySelector(".cert-modal-close").onclick = function() {
    document.getElementById("cert-modal").style.display = "none";
  };
  document.querySelector(".cert-modal-overlay").onclick = function() {
    document.getElementById("cert-modal").style.display = "none";
  };
  document.addEventListener("keydown", function(e) {
    if(e.key === "Escape") document.getElementById("cert-modal").style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Modal pro potvrzení odeslání kontaktního formuláře (pouze pro demo!)
  const form = document.querySelector(".premium-form");
  if(form) {
    form.addEventListener("submit", function(e) {
      document.getElementById("contact-modal").style.display = "flex";
    });
  }
  document.querySelector(".contact-modal-close").onclick = function() {
    document.getElementById("contact-modal").style.display = "none";
  };
  document.querySelector(".contact-modal-overlay").onclick = function() {
    document.getElementById("contact-modal").style.display = "none";
  };
  document.addEventListener("keydown", function(e) {
    if(e.key === "Escape") document.getElementById("contact-modal").style.display = "none";
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.bottom-nav a');
  const navHeight = document.querySelector('.bottom-nav').offsetHeight || 90;

  function onScroll() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let winHeight = window.innerHeight;

    let currentSectionId = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionBottom = rect.bottom;
      const sectionTop = rect.top;
      // sekce je "aktivní", pokud její spodní okraj je nad spodní hranou okna mínus výška nav, a zároveň její horní okraj je pod horní hranou okna
      if (sectionTop < winHeight - navHeight && sectionBottom > navHeight) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentSectionId && link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  // zavolat na začátek pro správný stav při načtení
  onScroll();
});

document.addEventListener('DOMContentLoaded', function() {
  const darkClass = 'dark';

  function isNight() {
    const now = new Date();
    const h = now.getHours();
    return (h >= 19 || h < 6); // noc = 19:00–5:59
  }

  function applyAutoTheme() {
    if (isNight()) {
      document.body.classList.add(darkClass);
    } else {
      document.body.classList.remove(darkClass);
    }
  }

  // Nastav režim při načtení stránky
  applyAutoTheme();

  // Kontroluj každých 5 minut, jestli se nezměnil čas režimu
  setInterval(applyAutoTheme, 5 * 60 * 1000);
});


document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuClose = document.getElementById('menu-close');
  const menuLinks = menuOverlay.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  menuClose.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  menuOverlay.addEventListener('click', e => {
    if(e.target === menuOverlay) {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', function(e) {
    if(e.key === "Escape") {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  // **Tady je novinka: všechny odkazy menu po kliknutí zavřou overlay**
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const scrollBtn = document.getElementById('scroll-top-btn');

  // Zobrazit tlačítko, když je uživatel níže než 200px od vrchu
  window.addEventListener('scroll', () => {
    if (window.scrollY > 220) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  // Kliknutí na šipku: hladké posunutí nahoru
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const svg = `
    <svg width="18" height="18" viewBox="0 0 20 20" style="vertical-align:-3px;margin-left:7px;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3H17C17.55 3 18 3.45 18 4V17C18 17.55 17.55 18 17 18H4C3.45 18 3 17.55 3 17V4C3 3.45 3.45 3 4 3H7" stroke="#d8a44d" stroke-width="1.4"/>
      <path d="M8 9L17 3M17 3V7M17 3H13" stroke="#d8a44d" stroke-width="1.4"/>
    </svg>`;
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.innerHTML.includes('svg')) {
      link.innerHTML += svg;
      link.title = "Otevře se v nové záložce";
    }
  });
});

document.querySelectorAll('.portfolio-card a[target="_blank"]').forEach(link => {
  if (!link.innerHTML.includes('svg')) {
    link.innerHTML += svg;
    link.title = "Otevře se v nové záložce";
  }
});

  document.addEventListener("DOMContentLoaded", function() {
    window.openChat = function() {
      document.getElementById('chat-window').classList.add('open');
      document.getElementById('asistent-open').style.display = 'none';
    };
    document.getElementById('chat-close').onclick = function() {
      document.getElementById('chat-window').classList.remove('open');
      document.getElementById('asistent-open').style.display = '';
    };
  });

