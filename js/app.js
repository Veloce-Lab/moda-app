// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    console.log('Veloce Fashion AR App Initialized');
    
    const scene = document.querySelector('a-scene');
    const loadingScreen = document.getElementById('loadingScreen');
    const statusText = document.getElementById('status');
    
    // Show detailed status
    statusText.innerHTML = 'Loading AR.js library...';
    
    scene.addEventListener('loaded', function() {
        console.log('✅ AR Scene loaded successfully');
        statusText.innerHTML = '✅ AR ready!<br>Open the test marker link below and point your camera at it';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 4000);
    });
    
    // Marker events
    const marker = document.querySelector('a-marker');
    
    marker.addEventListener('markerFound', function() {
        console.log('🎯 MARKER FOUND!');
        statusText.innerHTML = '✅ Marker detected!<br>AR is working!';
        statusText.style.color = '#00FF00';
        
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    });
    
    marker.addEventListener('markerLost', function() {
        console.log('❌ MARKER LOST');
        statusText.innerHTML = 'Point camera at the test marker<br>(black and white grid pattern)';
        statusText.style.color = 'white';
    });
    
    // Error handling
    scene.addEventListener('error', function(e) {
        console.error('AR Scene error:', e);
        statusText.innerHTML = '❌ Error loading AR<br>Try refreshing the page';
        statusText.style.color = '#FF0000';
    });
    
    // Add a manual test button
    const testButton = document.createElement('button');
    testButton.textContent = 'Test Vibration';
    testButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1001;
        padding: 10px;
        background: #FF0000;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    testButton.onclick = function() {
        if ('vibrate' in navigator) {
            navigator.vibrate(200);
            alert('Vibration test - if you felt this, haptics work!');
        }
    };
    document.body.appendChild(testButton);
});