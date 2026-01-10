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
        tempMain.style.fontSize = getComputedStyle(element).fontSize;
        tempMain.textContent = mainText.textContent.trim();
        document.body.appendChild(tempMain);
        const baseTextWidth = tempMain.offsetWidth;
        document.body.removeChild(tempMain);
        
        // Calculate letter-spacing to fill the width on first line
        const textLength = mainText.textContent.trim().length;
        if (textLength > 1 && baseTextWidth < availableWidth) {
            const spacing = (availableWidth - baseTextWidth) / (textLength - 1);
            mainText.style.letterSpacing = spacing + 'px';
        } else if (baseTextWidth > availableWidth) {
            // If text is too wide, reduce font size slightly to fit
            const scaleFactor = availableWidth / baseTextWidth;
            const currentFontSize = parseFloat(getComputedStyle(element).fontSize);
            mainText.style.fontSize = (currentFontSize * scaleFactor * 0.95) + 'px';
            mainText.style.letterSpacing = '0px';
        } else {
            mainText.style.letterSpacing = '0px';
        }
        
        // "Receba agora" stays on second line, left-aligned, no adjustments needed
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