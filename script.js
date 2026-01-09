/**
 * ===== BANNER SLIDER INITIALIZATION =====
 * This script handles the sliding banner animation with light sweep effects.
 * The CSS handles the main animation, this script ensures smooth seamless looping.
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const bannerTrack = document.querySelector('.banner-track');
    
    if (bannerTrack) {
        // Reset animation on each loop for seamless experience
        bannerTrack.addEventListener('animationiteration', function() {
            // Animation loops seamlessly via CSS
        });
    }
});