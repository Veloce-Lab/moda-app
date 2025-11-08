// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    console.log('Veloce Fashion AR App Initialized - Barcode Version');
    
    // Hide loading screen when AR is ready
    const scene = document.querySelector('a-scene');
    const loadingScreen = document.getElementById('loadingScreen');
    const statusText = document.getElementById('status');
    
    scene.addEventListener('loaded', function() {
        console.log('AR Scene loaded successfully');
        statusText.textContent = 'AR ready! Point camera at barcode marker 5...';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 3000);
    });
    
    // Add marker found/lost events for ALL markers
    const markers = document.querySelectorAll('a-marker');
    
    markers.forEach((marker, index) => {
        marker.addEventListener('markerFound', function() {
            console.log(`🎯 MARKER ${marker.getAttribute('value')} FOUND!`);
            statusText.textContent = `Marker ${marker.getAttribute('value')} detected!`;
            
            // Vibrate when marker found
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }
        });
        
        marker.addEventListener('markerLost', function() {
            console.log(`❌ MARKER ${marker.getAttribute('value')} LOST`);
            statusText.textContent = 'Point camera at barcode marker 5';
        });
    });
    
    // Log any errors
    scene.addEventListener('error', function(e) {
        console.error('AR Scene error:', e.detail);
        statusText.textContent = 'Error: ' + e.detail;
        statusText.style.color = '#FF0000';
    });
    
    // Camera events
    scene.addEventListener('camera-error', function(e) {
        console.error('Camera error:', e);
        statusText.textContent = 'Camera error: ' + e.detail;
        statusText.style.color = '#FF0000';
    });
    
    // Add click event to show loading screen again for testing
    loadingScreen.addEventListener('click', function() {
        loadingScreen.style.display = 'none';
    });
});