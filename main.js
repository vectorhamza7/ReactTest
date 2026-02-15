

const modelViewer = document.querySelector('#model-viewer');

// Set scale after model loads
modelViewer.addEventListener('load', () => {
    modelViewer.scale = '0.1 0.1 0.1';
});

 const modelViewer = document.querySelector('#model-viewer');
        const arButton = document.querySelector('#ar-button');

        // Show button when AR is available
        modelViewer.addEventListener('ar-status', (e) => {
            if (e.detail.status === 'not-presenting') {
                arButton.style.display = 'inline-block';
            }
        });

        // Launch AR when button clicked
        arButton.addEventListener('click', () => {
            modelViewer.activateAR();
        });