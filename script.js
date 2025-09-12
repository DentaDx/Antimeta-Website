const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });

        // Featured Game Slideshow
        const slideshowImages = document.querySelectorAll('.featured-image .slideshow-image');
        let currentImageIndex = 0;

        if (slideshowImages.length > 1) {
            setInterval(() => {
                // Hide the current image
                slideshowImages[currentImageIndex].classList.remove('active');
                // Get the next image index, looping back to the start
                currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
                // Show the next image
                slideshowImages[currentImageIndex].classList.add('active');
            }, 5000); // Change image every 5 seconds
        }

        // Scroll-triggered animations
        const animatedElements = document.querySelectorAll('.fade-in-up');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Hero Section Changing Text
        const changingPhraseEl = document.getElementById('changing-phrase');
        if (changingPhraseEl) {
             const phrases = [
                 "an Everlasting",
                 "a Challenging",
                 "an Expressive",
                 "an Evolving",
                 "a Dynamic",
                 "an Emergent"
             ];
             let currentIndex = 0;
 
             setInterval(() => {
                 // Get current width to animate from
                 const oldWidth = changingPhraseEl.offsetWidth;
 
                 // 1. Animate out
                 changingPhraseEl.style.opacity = '0';
                 changingPhraseEl.style.transform = 'translateY(20px)';
 
                 // 2. Wait for fade-out to finish
                 setTimeout(() => {
                     // 3. Change content and measure new width
                     currentIndex = (currentIndex + 1) % phrases.length;
                     
                     // Temporarily set to auto-width to measure the new content's width
                     changingPhraseEl.style.width = 'auto';
                     changingPhraseEl.textContent = phrases[currentIndex];
                     const newWidth = changingPhraseEl.offsetWidth;
 
                     // Set width to the OLD width to prepare for the transition
                     changingPhraseEl.style.width = `${oldWidth}px`;
 
                     // Force a reflow. This is a robust way to ensure the browser 
                     // processes the style change above before the next one.
                     changingPhraseEl.offsetHeight; 

                     // Prepare the starting state for the 'animate-in'
                     changingPhraseEl.style.transform = 'translateY(-20px)';
                     
                     // 4. On the next frame, trigger the animation to the final state
                     requestAnimationFrame(() => {
                         changingPhraseEl.style.width = `${newWidth}px`;
                         changingPhraseEl.style.opacity = '1';
                         changingPhraseEl.style.transform = 'translateY(0)';
                     });
                 }, 500); // Coraresponds to CSS transition duration
             }, 3000); // Change every 3 seconds
        }

        // Active Nav Link on Scroll
        const sections = document.querySelectorAll('main section[id]');
        const navLinks = document.querySelectorAll('.nav-links a:not(.cta-button)');

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When a section is about halfway through the viewport, activate its link
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        // Check if the link's href matches the section's id
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-40% 0px -60% 0px' }); // This creates an "activation line" slightly above the viewport center

        sections.forEach(section => navObserver.observe(section));