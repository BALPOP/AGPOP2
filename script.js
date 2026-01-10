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

// Function to adjust mentor bio text to fill container width
function adjustMentorBioText() {
    const bioTexts = document.querySelectorAll('.mentor-bio-text');
    
    bioTexts.forEach(element => {
        const mainText = element.querySelector('.bio-main-text');
        const recebaText = element.querySelector('.bio-receba');
        
        if (!mainText || !recebaText) return;
        
        // Get container width (accounting for padding)
        const containerWidth = element.offsetWidth;
        const padding = parseFloat(getComputedStyle(element).paddingLeft) + 
                       parseFloat(getComputedStyle(element).paddingRight);
        const availableWidth = containerWidth - padding;
        
        // Detect mobile (screen width <= 480px)
        const isMobile = window.innerWidth <= 480;
        
        // Get the base font size from CSS (respecting media queries)
        const baseFontSize = parseFloat(getComputedStyle(element).fontSize);
        
        // Reset styles for measurement
        mainText.style.letterSpacing = '';
        mainText.style.fontSize = '';
        
        // Measure main text at base font size
        const tempMain = document.createElement('span');
        tempMain.style.visibility = 'hidden';
        tempMain.style.position = 'absolute';
        tempMain.style.whiteSpace = 'nowrap';
        tempMain.style.fontWeight = getComputedStyle(mainText).fontWeight;
        tempMain.style.fontFamily = getComputedStyle(mainText).fontFamily;
        tempMain.style.textTransform = getComputedStyle(mainText).textTransform;
        tempMain.style.fontSize = baseFontSize + 'px';
        tempMain.textContent = mainText.textContent.trim();
        document.body.appendChild(tempMain);
        const baseTextWidth = tempMain.offsetWidth;
        document.body.removeChild(tempMain);
        
        // Calculate letter-spacing to fill the width on first line
        const textLength = mainText.textContent.trim().length;
        let finalFontSize = baseFontSize;
        
        if (baseTextWidth > availableWidth) {
            // If text is too wide, reduce font size to fit (CRITICAL for mobile)
            const scaleFactor = availableWidth / baseTextWidth;
            finalFontSize = baseFontSize * scaleFactor * 0.98; // 98% to leave small margin
            mainText.style.fontSize = finalFontSize + 'px';
            mainText.style.letterSpacing = '0px';
        } else if (!isMobile && textLength > 1 && baseTextWidth < availableWidth) {
            // Only use letter-spacing on desktop, not mobile
            const spacing = (availableWidth - baseTextWidth) / (textLength - 1);
            // Cap spacing to prevent overflow
            const maxSpacing = availableWidth / textLength;
            mainText.style.letterSpacing = Math.min(spacing, maxSpacing * 0.5) + 'px';
        } else {
            // Mobile: no letter-spacing, just center
            mainText.style.letterSpacing = '0px';
        }
        
        // Ensure both texts have EXACTLY the same font size and are centered
        mainText.style.fontSize = finalFontSize + 'px';
        mainText.style.textAlign = 'center'; // Ensure main text is centered
        mainText.style.maxWidth = '100%'; // Prevent overflow
        recebaText.style.fontSize = finalFontSize + 'px'; // EXACTLY match main text font size
        recebaText.style.textAlign = 'center'; // Ensure centered
        recebaText.style.maxWidth = '100%'; // Prevent overflow
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