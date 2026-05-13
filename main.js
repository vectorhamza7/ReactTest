
const modelViewer = document.querySelector('#model-viewer');
const loadingOverlay = document.querySelector('#loading-overlay');

// Set scale using setAttribute for better compatibility and hide loader
modelViewer.addEventListener('load', () => {
    modelViewer.setAttribute('scale', '0.1 0.1 0.1');
    loadingOverlay.classList.add('hidden');
});

const arButton = document.querySelector('#ar-button');

// Show/Hide button based on AR status
modelViewer.addEventListener('ar-status', (e) => {
    if (e.detail.status === 'not-presenting') {
        arButton.classList.add('visible');
    } else {
        arButton.classList.remove('visible');
    }
});

// Launch AR when button clicked
arButton.addEventListener('click', () => {
    modelViewer.activateAR();
});