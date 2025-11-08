// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    console.log('Veloce Fashion AR App Initialized');
    
    const scene = document.querySelector('a-scene');
    const loadingScreen = document.getElementById('loadingScreen');
    const statusText = document.getElementById('status');
    const arStatus = document.getElementById('arStatus');
    
    // Show detailed status
    statusText.innerHTML = 'Loading AR.js library...';
    arStatus.textContent = 'Loading...';
    
    scene.addEventListener('loaded', function() {
        console.log('✅ AR Scene loaded successfully');
        statusText.innerHTML = '✅ AR ready!';
        arStatus.textContent = 'Ready - Point camera at marker';
        arStatus.style.color = '#00FF00';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2000);
    });
    
    // Marker events
    const marker = document.querySelector('a-marker');
    
    marker.addEventListener('markerFound', function() {
        console.log('🎯 MARKER FOUND!');
        arStatus.textContent = '✅ Marker Detected!';
        arStatus.style.color = '#00FF00';
        
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    });
    
    marker.addEventListener('markerLost', function() {
        console.log('❌ MARKER LOST');
        arStatus.textContent = 'Point camera at marker';
        arStatus.style.color = '#FF0000';
    });
    
    // Error handling
    scene.addEventListener('error', function(e) {
        console.error('AR Scene error:', e);
        arStatus.textContent = '❌ AR Error - Refresh page';
        arStatus.style.color = '#FF0000';
    });
    
    // Hide instructions button
    document.getElementById('hideInstructions').addEventListener('click', function() {
        document.getElementById('permanentInstructions').style.display = 'none';
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