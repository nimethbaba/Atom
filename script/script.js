// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const mobileNav = document.querySelector('.nav-links-mobile');
    
    if (menuIcon && mobileNav) {
        const navLinksInMobileMenu = mobileNav.querySelectorAll('.nav-link');

        menuIcon.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        navLinksInMobileMenu.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    const icon = menuIcon.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (mobileNav.classList.contains('active')) {
                const isClickInsideNav = mobileNav.contains(event.target);
                const isClickOnMenuIcon = menuIcon.contains(event.target);
                if (!isClickInsideNav && !isClickOnMenuIcon) {
                    mobileNav.classList.remove('active');
                    const icon = menuIcon.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }

    // Feature Showcase Logic
    const featureShowcaseImage = document.getElementById('featureShowcaseImage');
    const featureTabs = document.querySelectorAll('.feature-tab');

    const featuresData = [
        {
            imageSrc: "assets/Feature-image/Feature_1.png",
            // title and description are already in HTML, could be fetched here if needed
        },
        {
            imageSrc: "assets/Feature-image/Feature_2.jpg",
        },
        {
            imageSrc: "assets/Feature-image/Feature_3.jpg",
        }
    ];

    let currentFeatureIndex = 0;
    const autoSlideIntervalTime = 5000; // 5 seconds
    let autoSlideTimerId;
    let progressIntervalId;

    function updateFeatureDisplay(index) {
        // Update image
        if (featureShowcaseImage && featuresData[index]) {
             // Fade out old image
            featureShowcaseImage.style.opacity = '0';
            setTimeout(() => {
                featureShowcaseImage.src = featuresData[index].imageSrc;
                featureShowcaseImage.alt = `Feature ${index + 1}`; // Update alt text
                 // Fallback for image loading error
                featureShowcaseImage.onerror = function() {
                    this.onerror=null;
                    this.src='https://placehold.co/800x500/FFCCCB/B91C1C?text=Image+Error';
                };
                // Fade in new image
                featureShowcaseImage.style.opacity = '1';
            }, 250); // Half of image transition time
        }

        // Update active tab
        featureTabs.forEach((tab, i) => {
            const progressBar = tab.querySelector('.tab-progress-bar');
            if (i === index) {
                tab.classList.add('active');
                if (progressBar) {
                    // Reset and start progress for the new active tab
                    progressBar.style.transition = 'none'; // Disable transition for reset
                    progressBar.style.width = '0%';
                    // Force reflow/repaint before re-enabling transition
                    void progressBar.offsetWidth; 
                    progressBar.style.transition = `width ${autoSlideIntervalTime / 1000}s linear`;
                    progressBar.style.width = '100%';
                }
            } else {
                tab.classList.remove('active');
                if (progressBar) {
                    // Reset progress for inactive tabs
                    progressBar.style.transition = 'none';
                    progressBar.style.width = '0%';
                }
            }
        });
    }

    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing timer
        autoSlideTimerId = setInterval(() => {
            currentFeatureIndex = (currentFeatureIndex + 1) % featuresData.length;
            updateFeatureDisplay(currentFeatureIndex);
        }, autoSlideIntervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideTimerId);
        clearInterval(progressIntervalId); // Also clear any old style progress interval
         // Reset progress on all tabs when auto-slide is manually interrupted
        featureTabs.forEach(tab => {
            const progressBar = tab.querySelector('.tab-progress-bar');
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
            }
        });
    }

    featureTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            stopAutoSlide();
            currentFeatureIndex = parseInt(tab.dataset.index);
            updateFeatureDisplay(currentFeatureIndex);
            startAutoSlide(); // Restart auto-slide after manual selection
        });
    });

    // Initial load
    if (featureTabs.length > 0 && featureShowcaseImage) {
        updateFeatureDisplay(currentFeatureIndex);
        startAutoSlide();
    }
});


// Preloader logic
window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});



// script.js

// Get references to the popup elements
const popupOverlay = document.getElementById('popup-overlay');
const popupContentBox = document.getElementById('popup-content-box');

/**
 * Shows the popup by adding the 'show' class for CSS transitions.
 */
function showPopup() {
    if (popupOverlay && popupContentBox) {
        popupOverlay.style.display = 'flex'; // Make the overlay visible using flexbox
        // Use a small delay to allow the 'display' change to register before starting the opacity/transform transition
        setTimeout(() => {
            popupOverlay.classList.add('show');
        }, 10); // A very small delay
    } else {
        console.error("Popup elements not found. Ensure 'popup-overlay' and 'popup-content-box' IDs exist.");
    }
}

/**
 * Hides the popup by removing the 'show' class and then setting display to 'none'.
 */
function hidePopup() {
    if (popupOverlay && popupContentBox) {
        popupOverlay.classList.remove('show'); // Start fade-out and pop-out animation
        // Hide the overlay completely after the animation duration (match CSS transition duration)
        setTimeout(() => {
            popupOverlay.style.display = 'none';
        }, 300); // This should match the transition duration in CSS for popup-overlay and popup-content-box
    }
}

// Show the popup automatically when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // You can adjust this delay (in milliseconds) as needed
    setTimeout(showPopup, 900); // Popup appears after 2.5 seconds
});

// Close the popup when clicking outside the content box
if (popupOverlay) {
    popupOverlay.addEventListener('click', (event) => {
        // Check if the click occurred directly on the overlay, not on its children
        if (event.target === popupOverlay) {
            hidePopup();
        }
    });
}
