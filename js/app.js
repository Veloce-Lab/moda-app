// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    console.log('Veloce Fashion AR App Initialized');
    
    // Hide loading screen when AR is ready
    const scene = document.querySelector('a-scene');
    const loadingScreen = document.getElementById('loadingScreen');
    const statusText = document.getElementById('status');
    
    scene.addEventListener('loaded', function() {
        console.log('AR Scene loaded successfully');
        statusText.textContent = 'AR ready! Point camera at artwork...';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2000);
    });
    
    // Add marker found/lost events
    const marker = document.querySelector('a-marker');
    marker.addEventListener('markerFound', function() {
        console.log('🎯 MARKER FOUND!');
        statusText.textContent = 'Marker detected!';
    });
    
    marker.addEventListener('markerLost', function() {
        console.log('❌ MARKER LOST');
        statusText.textContent = 'Marker lost - point camera at Hiro marker';
    });
    
    // Handle vibration for haptic feedback
    if ('vibrate' in navigator) {
        scene.addEventListener('markerFound', function() {
            console.log('📱 Triggering vibration');
            navigator.vibrate(200);
        });
    }
    
    // Log any errors
    scene.addEventListener('error', function(e) {
        console.error('AR Scene error:', e.detail);
        statusText.textContent = 'Error: ' + e.detail;
    });
});