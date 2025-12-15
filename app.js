// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado!', reg))
            .catch(err => console.log('Erro no Service Worker:', err));
    });
}

// Tab Switching Logic
function openPhase(phaseName) {
    // Hide all tab contents
    const contents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }

    // Remove active class from buttons
    const buttons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    // Show specific tab content
    document.getElementById(phaseName).classList.add('active');

    // Add active class to the button that was clicked
    // We find the button by matching the onclick attribute somewhat loosely or simpler logic:
    // Actually, let's just loop and check text or index. 
    // Simpler approach for this scope:
    if(phaseName === 'phase1') {
        buttons[0].classList.add('active');
    } else {
        buttons[1].classList.add('active');
    }
}