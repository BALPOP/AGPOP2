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
        const availableWidth = containerWidth - padding - 4; // Extra 4px safety margin
        
        // Detect mobile (screen width <= 480px)
        const isMobile = window.innerWidth <= 480;
        
        // Get the base font size from CSS (respecting media queries)
        const baseFontSize = parseFloat(getComputedStyle(element).fontSize);
        
        // Reset styles for measurement
        mainText.style.letterSpacing = '';
        mainText.style.fontSize = '';
        
        // Create measurement element
        const tempMain = document.createElement('span');
        tempMain.style.visibility = 'hidden';
        tempMain.style.position = 'absolute';
        tempMain.style.whiteSpace = 'nowrap';
        tempMain.style.fontWeight = getComputedStyle(mainText).fontWeight;
        tempMain.style.fontFamily = getComputedStyle(mainText).fontFamily;
        tempMain.style.textTransform = getComputedStyle(mainText).textTransform;
        tempMain.textContent = mainText.textContent.trim();
        document.body.appendChild(tempMain);
        
        // Binary search for optimal font size that fits
        let minSize = 8;
        let maxSize = baseFontSize;
        let finalFontSize = baseFontSize;
        let iterations = 0;
        const maxIterations = 20;
        
        while (iterations < maxIterations && Math.abs(maxSize - minSize) > 0.5) {
            finalFontSize = (minSize + maxSize) / 2;
            tempMain.style.fontSize = finalFontSize + 'px';
            const textWidth = tempMain.offsetWidth;
            
            if (textWidth <= availableWidth) {
                minSize = finalFontSize; // This size fits, try larger
            } else {
                maxSize = finalFontSize; // Too big, try smaller
            }
            iterations++;
        }
        
        // Final check - ensure it definitely fits
        tempMain.style.fontSize = finalFontSize + 'px';
        const finalWidth = tempMain.offsetWidth;
        if (finalWidth > availableWidth) {
            finalFontSize = finalFontSize * (availableWidth / finalWidth) * 0.98;
        }
        
        document.body.removeChild(tempMain);
        
        // Calculate letter-spacing for desktop if text fits
        const textLength = mainText.textContent.trim().length;
        let letterSpacing = 0;
        
        if (!isMobile && textLength > 1) {
            tempMain.style.fontSize = finalFontSize + 'px';
            document.body.appendChild(tempMain);
            const textWidthAtSize = tempMain.offsetWidth;
            document.body.removeChild(tempMain);
            
            if (textWidthAtSize < availableWidth) {
                letterSpacing = (availableWidth - textWidthAtSize) / (textLength - 1);
                const maxSpacing = availableWidth / textLength;
                letterSpacing = Math.min(letterSpacing, maxSpacing * 0.5);
            }
        }
        
        // CRITICAL: Ensure white-space: nowrap is ALWAYS set
        mainText.style.whiteSpace = 'nowrap';
        recebaText.style.whiteSpace = 'nowrap';
        
        // Apply final styles - BOTH TEXTS GET EXACT SAME FONT SIZE
        const fontSizeString = finalFontSize + 'px';
        mainText.style.setProperty('font-size', fontSizeString, 'important');
        mainText.style.letterSpacing = letterSpacing + 'px';
        mainText.style.textAlign = 'center';
        
        // RECEBA TEXT MUST MATCH MAIN TEXT FONT SIZE EXACTLY
        recebaText.style.setProperty('font-size', fontSizeString, 'important');
        recebaText.style.textAlign = 'center';
        recebaText.style.letterSpacing = '0px'; // No letter spacing for receba
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