// Vibration test function - must be in global scope
function testVibration() {
    console.log('Testing vibration...');
    if ('vibrate' in navigator) {
        // Vibrate pattern: vibrate for 200ms, pause 100ms, vibrate 200ms
        navigator.vibrate([200, 100, 200]);
        alert('Vibration test activated! You should feel two short vibrations.');
    } else {
        alert('Vibration not supported on this device/browser.');
    }
}

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
    
    let markerFound = false;
    
    scene.addEventListener('loaded', function() {
        console.log('✅ AR Scene loaded successfully');
        statusText.innerHTML = '✅ AR ready!';
        arStatus.textContent = 'Ready - Point camera at Hiro marker';
        arStatus.style.color = '#FFFF00'; // Yellow for ready
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 3000);
    });
    
    // Marker events - using event delegation for A-Frame
    scene.addEventListener('markerFound', function(e) {
        console.log('🎯 MARKER FOUND!', e.target);
        markerFound = true;
        arStatus.textContent = '✅ Marker Detected! AR Working!';
        arStatus.style.color = '#00FF00'; // Green for detected
        
        // Vibrate when marker found - using proper user gesture context
        if ('vibrate' in navigator) {
            // Use a simple vibration pattern
            try {
                navigator.vibrate(300);
            } catch (e) {
                console.log('Vibration failed:', e);
            }
        }
        
        // Add some visual feedback
        e.target.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 2000');
    });
    
    scene.addEventListener('markerLost', function(e) {
        console.log('❌ MARKER LOST', e.target);
        markerFound = false;
        arStatus.textContent = 'Point camera at Hiro marker';
        arStatus.style.color = '#FF0000'; // Red for lost
    });
    
    // Error handling
    scene.addEventListener('error', function(e) {
        console.error('AR Scene error:', e);
        arStatus.textContent = '❌ AR Error - Refresh page';
        arStatus.style.color = '#FF0000';
    });
    
    // Camera events
    scene.addEventListener('camera-error', function(e) {
        console.error('Camera error:', e);
        arStatus.textContent = '❌ Camera error - Check permissions';
        arStatus.style.color = '#FF0000';
    });
    
    // Hide instructions button
    document.getElementById('hideInstructions').addEventListener('click', function() {
        document.getElementById('permanentInstructions').style.display = 'none';
    });
    
    // Add debug info to screen
    const debugInfo = document.createElement('div');
    debugInfo.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1000;
        max-width: 200px;
    `;
    debugInfo.innerHTML = `
        <div>FPS: <span id="fpsCounter">--</span></div>
        <div>Marker: <span id="markerState">None</span></div>
        <div>Vibration: <span id="vibrationState">${'vibrate' in navigator ? 'Supported' : 'Not Supported'}</span></div>
    `;
    document.body.appendChild(debugInfo);
    
    // Update debug info
    setInterval(() => {
        document.getElementById('markerState').textContent = markerFound ? 'Detected' : 'Searching';
    }, 1000);
});