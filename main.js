

const modelViewer = document.querySelector('#model-viewer');

// Set scale after model loads
modelViewer.addEventListener('load', () => {
    modelViewer.scale = '0.1 0.1 0.1';
});