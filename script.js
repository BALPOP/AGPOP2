/**
 * ===== BANNER SLIDER INITIALIZATION =====
 * This script handles the sliding banner animation with light sweep effects.
 * The CSS handles the main animation, this script ensures smooth seamless looping.
 */

/**
 * ===== MENTOR BIO TEXT AUTO-RESIZE =====
 * Dynamically adjusts font size and letter-spacing to fit text on one line
 * and fill the container width (left-right justified).
 */

// Function to adjust mentor bio text to fit container
function adjustMentorBioText() {
    const bioTexts = document.querySelectorAll('.mentor-bio-text');
    
    bioTexts.forEach(element => {
        // Get container width (accounting for padding)
        const containerWidth = element.offsetWidth;
        const padding = parseFloat(getComputedStyle(element).paddingLeft) + 
                       parseFloat(getComputedStyle(element).paddingRight);
        const availableWidth = containerWidth - padding;
        
        // Reset to base size for measurement
        element.style.fontSize = '';
        element.style.letterSpacing = '';
        
        // Create a temporary span to measure text width
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.style.fontWeight = getComputedStyle(element).fontWeight;
        tempSpan.style.fontFamily = getComputedStyle(element).fontFamily;
        tempSpan.style.textTransform = getComputedStyle(element).textTransform;
        tempSpan.textContent = element.textContent.trim();
        
        document.body.appendChild(tempSpan);
        
        // Binary search for optimal font size
        let minSize = 8;
        let maxSize = 24;
        let optimalSize = 13;
        
        for (let i = 0; i < 20; i++) {
            const testSize = (minSize + maxSize) / 2;
            tempSpan.style.fontSize = testSize + 'px';
            const textWidth = tempSpan.offsetWidth;
            
            if (textWidth <= availableWidth) {
                optimalSize = testSize;
                minSize = testSize;
            } else {
                maxSize = testSize;
            }
        }
        
        // Apply optimal font size
        element.style.fontSize = optimalSize + 'px';
        
        // Measure text width at optimal size
        tempSpan.style.fontSize = optimalSize + 'px';
        const finalTextWidth = tempSpan.offsetWidth;
        
        // Calculate letter-spacing to justify (fill width)
        if (finalTextWidth < availableWidth && element.textContent.trim().length > 1) {
            const spacing = (availableWidth - finalTextWidth) / (element.textContent.trim().length - 1);
            element.style.letterSpacing = spacing + 'px';
        } else {
            element.style.letterSpacing = '0px';
        }
        
        document.body.removeChild(tempSpan);
    });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const bannerTrack = document.querySelector('.banner-track');
    
    if (bannerTrack) {
        // Reset animation on each loop for seamless experience
        bannerTrack.addEventListener('animationiteration', function() {
            // Animation loops seamlessly via CSS
        });
    }
    
    // Adjust mentor bio text on load
    adjustMentorBioText();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustMentorBioText);
});