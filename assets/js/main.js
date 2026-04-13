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
                revealOnScroll();
            }
        }, speed);
    };

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
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

    // Initialize Typewriter with the site title from config (if applicable)
    const heroTitle = document.querySelector('#hero-title');
    if (heroTitle) {
        const text = heroTitle.innerText;
        typeWriter('#hero-title', text, 80);
    } else {
        revealOnScroll();
    }
});
