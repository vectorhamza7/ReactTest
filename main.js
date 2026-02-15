const modelViewer = document.getElementById('model-viewer');
const loadingOverlay = document.getElementById('loading-overlay');
const arButton = document.getElementById('ar-button');
const instructionsOverlay = document.getElementById('instructions-overlay');
const errorMessage = document.getElementById('error-message');

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showInstructions() {
    instructionsOverlay.classList.add('visible');
    setTimeout(() => {
        instructionsOverlay.classList.remove('visible');
    }, 8000);
}

async function enterAR() {
    try {
        if (modelViewer.canActivateAR) {
            await modelViewer.activateAR();
            showInstructions();
        } else {
            showError('AR not supported on this device or browser');
            arButton.style.display = 'none';
        }
    } catch (error) {
        console.error('AR activation failed:', error);
        showError('Could not enter AR mode. Please tap the button again.');
    }
}

arButton.addEventListener('click', enterAR);

modelViewer.addEventListener('load', async () => {
    console.log('Model loaded successfully');
    loadingOverlay.classList.add('hidden');

    await new Promise(resolve => setTimeout(resolve, 500));

    if (modelViewer.canActivateAR) {
        arButton.classList.add('visible');

        try {
            await enterAR();
        } catch (error) {
            console.log('Auto-enter AR blocked by browser, showing button');
        }
    } else {
        showError('AR not available on this device');
    }
});

modelViewer.addEventListener('error', (event) => {
    console.error('Model loading error:', event);
    loadingOverlay.classList.add('hidden');
    showError('Failed to load 3D model. Please check your connection.');
});

modelViewer.addEventListener('ar-status', (event) => {
    console.log('AR Status:', event.detail.status);
    if (event.detail.status === 'not-presenting') {
        arButton.classList.add('visible');
    }
});

modelViewer.addEventListener('ar-tracking', (event) => {
    if (event.detail.status === 'tracking') {
        showInstructions();
    }
});

setTimeout(() => {
    if (loadingOverlay.classList.contains('hidden') === false) {
        console.warn('Model load timeout');
        loadingOverlay.classList.add('hidden');
        showError('Model loading timed out. Please refresh the page.');
    }
}, 30000);