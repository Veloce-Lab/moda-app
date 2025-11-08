// AR-specific functionality
AFRAME.registerComponent('marker-handler', {
    init: function() {
        this.el.addEventListener('markerFound', () => {
            console.log('Marker found!');
            this.handleMarkerFound();
        });
        
        this.el.addEventListener('markerLost', () => {
            console.log('Marker lost');
            this.handleMarkerLost();
        });
    },
    
    handleMarkerFound: function() {
        // Add animations or effects when marker is found
        const box = this.el.querySelector('a-box');
        if (box) {
            box.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 2000');
        }
    },
    
    handleMarkerLost: function() {
        // Clean up when marker is lost
        const box = this.el.querySelector('a-box');
        if (box) {
            box.removeAttribute('animation');
        }
    }
});