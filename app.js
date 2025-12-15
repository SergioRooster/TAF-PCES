// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado!', reg))
            .catch(err => console.log('Erro no Service Worker:', err));
    });
}

// === LOGICA DE INSTALAÇÃO (PWA) ===
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const iosInstall = document.getElementById('iosInstall');

// Detectar se é dispositivo iOS (iPhone/iPad)
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

// Detectar se já está rodando como App (Standalone)
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Se for iOS e não estiver instalado, mostra instruções
if (isIos() && !isInStandaloneMode()) {
    iosInstall.hidden = false;
}

// Captura o evento "beforeinstallprompt" (apenas Android/Chrome/Desktop)
window.addEventListener('beforeinstallprompt', (e) => {
    // Impede o Chrome de mostrar a barra automaticamente logo de cara (opcional)
    e.preventDefault();
    // Guarda o evento para usar depois
    deferredPrompt = e;
    // Mostra o nosso botão
    installBtn.hidden = false;
});

// Ação do Botão
installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Mostra o prompt nativo do navegador
        deferredPrompt.prompt();
        // Espera a escolha do usuário
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Usuário escolheu: ${outcome}`);
        // Limpa a variável
        deferredPrompt = null;
        // Esconde o botão novamente
        installBtn.hidden = true;
    }
});

// === LÓGICA DAS ABAS ===
function openPhase(phaseName) {
    const contents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }

    const buttons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    document.getElementById(phaseName).classList.add('active');

    if(phaseName === 'phase1') {
        buttons[0].classList.add('active');
    } else {
        buttons[1].classList.add('active');
    }
}