document.addEventListener('DOMContentLoaded', () => {
    const openBtn   = document.getElementById('chat-open');
    const badge     = document.getElementById('chat-badge');
    const chatWin   = document.getElementById('chat-window');
    const closeBtn  = document.getElementById('chat-close');
    const messages  = document.getElementById('chat-messages');
    const input     = document.getElementById('chat-input');
    const form      = document.getElementById('chat-form');

    let unread = 0;

    const botResponses = [
        { pattern: /ahoj|dobrý|hello/i,
          response: "Ahoj! Jak ti mohu pomoci?" },
        { pattern: /služby|co (děláš|nabízíš)/i,
          response: "Nabízím vývoj AI řešení a webových aplikací v Pythonu." },
        { pattern: /kontakt|email/i,
          response: "Napiš mi na <a href='mailto:michalbugy12@gmail.com'>michalbugy12@gmail.com</a> nebo vyplň kontaktní formulář." },
        { pattern: /kdo jsi|představ/i,
          response: "Jmenuji se Michal Bürgermeister a jsem AI vývojář z Moravskoslezského kraje." },
        { pattern: /.*/,
          response: "Zatím odpovídám na omezenou sadu dotazů. Zkus to prosím jinak." }
    ];
    // === Knowledge base ===
    const knowledgeBase = [
      {
        "keywords": [
          "kdo jsi",
          "jméno",
          "o tobě",
          "o mně",
          "představ",
          "věk"
        ],
        "answer": "Jmenuji se Michal Bürgermeister, je mi 41 let a jsem AI vývojář z Moravskoslezského kraje. Původně jsem autoklempíř, ale v roce 2024 jsem se vrhl do světa umělé inteligence a Pythonu."
      },
      {
        "keywords": [
          "služby",
          "co nabízíš",
          "co děláš",
          "pomůžeš"
        ],
        "answer": "Nabízím vývoj a konzultace v oblasti umělé inteligence, tvorbu webových aplikací v Pythonu a automatizaci procesů přes platformu Make.com."
      },
      {
        "keywords": [
          "make.com",
          "automatizace",
          "integrace"
        ],
        "answer": "Make.com (dříve Integromat) využívám k propojování různých služeb – například automatické zpracování e‑mailů, synchronizaci dat mezi Airtable a Google Sheets nebo notifikace do Slacku. Rád pomohu nastavit váš konkrétní scénář."
      },
      {
        "keywords": [
          "portfolio",
          "projekty",
          "ukázky"
        ],
        "answer": "Moje portfolio najdeš přímo na stránce – obsahuje např. AI asistenta Jarvis, kalkulačku hoření svíčky, plugin Afirmace, prezentační web Stavby Baller a další. Klikni na sekci Portfolio nebo napiš název projektu a já pošlu odkaz."
      },
      {
        "keywords": [
          "certifikát",
          "certifikáty",
          "osvědčení"
        ],
        "answer": "Mám certifikace ‘Master of AI Creativity’ (Talent Innovation) a ‘Umělá inteligence v praxi’ (coalsoft). V současnosti dokončuji kurz tvorby webových aplikací v Pythonu."
      },
      {
        "keywords": [
          "kontakt",
          "email",
          "telefon"
        ],
        "answer": "E‑mail: michalbugy12@gmail.com, telefon: +420 605 954 429. Můžeš také vyplnit kontaktní formulář na stránce."
      },
      {
        "keywords": [
          "kde působíš",
          "lokalita",
          "ostrava",
          "opava",
          "moravskoslezský"
        ],
        "answer": "Působím především v Moravskoslezském kraji – Ostrava, Opava a okolí, ale vzdáleně spolupracuji i s klienty z jiných regionů."
      }
    ];

    function findAnswer(text){
        const lower = text.toLowerCase();
        // simple scoring by keyword presence
        let best = null, score = 0;
        knowledgeBase.forEach(entry=>{
            let s = 0;
            entry.keywords.forEach(kw=>{
                if(lower.includes(kw)) s += 1;
            });
            if(s>score){
                score = s;
                best = entry;
            }
        });
        return score>0 ? best.answer : null;
    }

    function bubbleHTML(text, icon=false, extra='') {
        const svgIcon = icon ? `
        <svg class="bot-avatar premium" width="32" height="32" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: bot-bounce 2.6s infinite cubic-bezier(.6,0,.4,1);vertical-align:middle;">
          <defs>
            <radialGradient id="premium-bg" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stop-color="#fffbe8"/>
              <stop offset="77%" stop-color="#ffd76b"/>
              <stop offset="100%" stop-color="#1f2b57"/>
            </radialGradient>
            <linearGradient id="premium-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fffbe8"/>
              <stop offset="45%" stop-color="#ffd76b"/>
              <stop offset="100%" stop-color="#d8a44d"/>
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.7" flood-color="#d8a44d" flood-opacity="0.45"/>
            </filter>
          </defs>
          <circle cx="28" cy="28" r="22" fill="url(#premium-bg)" stroke="url(#premium-gold)" stroke-width="2.7" filter="url(#glow)"/>
          <ellipse cx="20" cy="20" rx="10" ry="4.6" fill="#fff" fill-opacity="0.13" />
          <ellipse cx="20.6" cy="30" rx="2.1" ry="3.3" fill="#1e2340" />
          <ellipse cx="35.4" cy="30" rx="2.1" ry="3.3" fill="#1e2340" />
          <ellipse cx="21.2" cy="29" rx="0.4" ry="0.7" fill="#fff" fill-opacity="0.85" />
          <ellipse cx="36" cy="29" rx="0.4" ry="0.7" fill="#fff" fill-opacity="0.85" />
          <path d="M22 37 Q28 42 34 37" stroke="url(#premium-gold)" stroke-width="2" fill="none" filter="url(#glow)"/>
          <path d="M25 38.2 Q28 40 31 38.2" stroke="#fffbe8" stroke-width="1" fill="none" opacity="0.6"/>
          <rect x="25.2" y="10.4" width="5.6" height="10.7" rx="2.6" fill="url(#premium-gold)" stroke="#d8a44d" stroke-width="1.3" />
          <circle cx="28" cy="8.2" r="2.4" fill="#fffbe8" stroke="url(#premium-gold)" stroke-width="1.3"/>
        </svg>
        <style>
        @keyframes bot-bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-5px) scale(1.03);}
        }
        </style>
        ` : '';
        return `<div class="bubble ${extra}">${svgIcon}<span>${text}</span></div>`;
    }

    function addMsg(html, sender) {
        const wrap = document.createElement('div');
        wrap.className = 'chat-msg ' + sender;
        wrap.innerHTML = html;
        messages.appendChild(wrap);
        messages.scrollTop = messages.scrollHeight;

        if (sender === 'bot' && !chatWin.classList.contains('open')) {
            unread++;
            badge.textContent = unread;
            badge.classList.add('show');
        }
    }

    function sendBot(text) {
        addMsg(bubbleHTML(text, true), 'bot');
    }

    function showTyping() {
        const typingHTML = `<div class="bubble typing"><svg width="36" height="12" viewBox="0 0 40 12"><circle cx="6" cy="6" r="5"><animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" begin="0s"/></circle><circle cx="20" cy="6" r="5"><animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" begin="0.3s"/></circle><circle cx="34" cy="6" r="5"><animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" begin="0.6s"/></circle></svg></div>`;
        addMsg(typingHTML, 'bot');
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        const userText = input.value.trim();
        if (!userText) return;
        addMsg(bubbleHTML(userText), 'user');
        input.value = '';
        showTyping();

        let reply = findAnswer(userText);
        if(!reply){
            const match = botResponses.find(r => r.pattern.test(userText));
            reply = match ? match.response : "Tomu nerozumím.";
        }

        setTimeout(() => {
            const typing = messages.querySelector('.typing');
            if (typing && typing.parentElement) typing.parentElement.remove();
            sendBot(reply);
        }, 900);
    });

    openBtn.addEventListener('click', () => {
        chatWin.classList.add('open');
        input.focus();
        unread = 0;
        badge.classList.remove('show');
    });

    closeBtn.addEventListener('click', () => {
        chatWin.classList.remove('open');
    });

    /* AUTO OPEN & GREET */
    setTimeout(() => {
        if (!chatWin.classList.contains('open')) {
            chatWin.classList.add('open');
            sendBot("Ahoj! Piš, co tě napadne – žádná otázka není hloupá. Odpovím ti rychle a lidsky");
        }
    }, 2000);
});
