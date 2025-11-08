// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    console.log('Veloce Fashion AR App Initialized');
    
    // Hide loading screen when AR is ready
    const scene = document.querySelector('a-scene');
    const loadingScreen = document.getElementById('loadingScreen');
    const statusText = document.getElementById('status');
    
    scene.addEventListener('loaded', function() {
        statusText.textContent = 'AR ready! Point camera at artwork...';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2000);
    });
    
    // Handle vibration for haptic feedback
    if ('vibrate' in navigator) {
        scene.addEventListener('markerFound', function() {
            // Phone will vibrate when marker is found
            navigator.vibrate(200);
        });
    }
});