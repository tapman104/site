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
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px' 
        });

        reveals.forEach(reveal => {
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

    // Dynamic Mermaid.js Rendering
    const mermaidElements = document.querySelectorAll('pre code.language-mermaid, pre.language-mermaid, div.language-mermaid pre, .language-mermaid');
    if (mermaidElements.length > 0) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
        script.onload = () => {
            mermaidElements.forEach((el) => {
                // Determine target node to replace
                let targetNode = el;
                if (el.tagName === 'CODE') {
                    targetNode = el.parentElement;
                }
                if (targetNode.parentElement && targetNode.parentElement.classList.contains('highlighter-rouge')) {
                    targetNode = targetNode.parentElement;
                }
                
                const code = el.textContent.trim();
                if (!code) return;

                const container = document.createElement('div');
                container.className = 'mermaid';
                container.style.background = '#0e0e0f';
                container.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                container.style.borderRadius = '16px';
                container.style.padding = '2rem 1.5rem';
                container.style.margin = '2.5rem 0';
                container.style.display = 'flex';
                container.style.justifyContent = 'center';
                container.style.overflow = 'auto';
                container.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                container.textContent = code;
                
                if (targetNode.parentNode) {
                    targetNode.parentNode.replaceChild(container, targetNode);
                }
            });
            
            mermaid.initialize({
                theme: 'dark',
                startOnLoad: true,
                securityLevel: 'loose',
                themeVariables: {
                    darkMode: true,
                    background: '#0e0e0f',
                    primaryColor: '#00f0ff',
                    primaryTextColor: '#f0f0f2',
                    primaryBorderColor: 'rgba(255, 255, 255, 0.08)',
                    lineColor: '#7000ff',
                    secondaryColor: '#ccff00',
                    tertiaryColor: '#141416'
                }
            });
        };
        document.head.appendChild(script);
    }
});
