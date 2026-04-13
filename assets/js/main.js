document.addEventListener('DOMContentLoaded', () => {
    // Typewriter Effect
    const typeWriter = (selector, text, speed = 100) => {
        const element = document.querySelector(selector);
        if (!element) return;
        
        let i = 0;
        element.innerHTML = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            // Use client coordinates (viewport-relative) to match getBoundingClientRect()
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Temporary disable transition for immediate response
            btn.style.transition = 'transform 0.1s linear';
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // Bento Spotlight Effect
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            item.style.setProperty('--mouse-x', `${x}%`);
            item.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Reveal on Scroll
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.bento-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(reveal => {
            reveal.style.opacity = '0';
            reveal.style.transform = 'translateY(20px)';
            reveal.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(reveal);
        });
    };

    // Initialize components
    const heroTitle = document.querySelector('#hero-title');
    if (heroTitle) {
        const text = heroTitle.innerText;
        typeWriter('#hero-title', text, 80);
    }
    
    // Always start reveal independent of typewriter
    revealOnScroll();
});
