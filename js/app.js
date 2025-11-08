// Vibration test function
function testVibration() {
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
        alert('Vibration test activated!');
    } else {
        alert('Vibration not supported on this device.');
    }
}

// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    console.log('Veloce Fashion AR - Stable Version Loaded');
    
    const scene = document.querySelector('a-scene');
    const loadingScreen = document.getElementById('loadingScreen');
    
    scene.addEventListener('loaded', function() {
        console.log('✅ AR Scene loaded successfully');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 3000);
    });
    
    // Marker events
    scene.addEventListener('markerFound', function() {
        console.log('🎯 Marker Found - AR Active');
        
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
    });
    
    scene.addEventListener('markerLost', function() {
        console.log('📱 Marker Lost - Point camera at marker');
    });
});