import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// Custom Hook for Intersection Observer
function useIntersectionObserver(options) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [options]);

    return [ref, isIntersecting];
}

const Divider = () => <hr className="section-divider" />;

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <header className="hero">
            <div className="hero-bg"></div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className={`display-name ${isVisible ? 'visible' : ''}`}>WELCOME</h1>
                <p className={`subtitle ${isVisible ? 'visible' : ''}`}>independent developer</p>
            </div>
        </header>
    );
};

const SkillsStrip = () => {
    const skills = ['Android', 'Kotlin', 'Jetpack Compose', 'Rust', '.NET', 'Zig', 'MPV', 'Avalonia', 'Astro'];
    const [isPaused, setIsPaused] = useState(false);
    
    const renderSkills = () => {
        return skills.map((skill, index) => (
            <React.Fragment key={index}>
                <div className="skill-item">{skill}</div>
                <div className="skill-separator">|</div>
            </React.Fragment>
        ));
    };

    return (
        <section 
            className="skills-strip"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={`skills-track ${isPaused ? 'paused' : ''}`}>
                <div className="marquee-block">
                    {renderSkills()}
                    {renderSkills()}
                    {renderSkills()}
                </div>
                <div className="marquee-block">
                    {renderSkills()}
                    {renderSkills()}
                    {renderSkills()}
                </div>
            </div>
        </section>
    );
};



const About = () => {
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://api.github.com/users/tapman104')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                setGithubData(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    return (
        <section className="about">
            <div className="about-container">
                <div className="about-left">
                    <h2 className="about-heading">About</h2>
                    <p className="about-body">
                        Independent developer building tools people actually want to use. 
                        I work across Android, Rust, .NET, and Zig — whatever fits the problem.
                        Currently shipping Potato Player, RemCtrl, and XDown.
                    </p>
                </div>
                <div className="about-right">
                    {loading ? (
                        <div className="github-card skeleton">
                            <div className="skeleton-avatar"></div>
                            <div className="skeleton-text-block">
                                <div className="skeleton-text-1"></div>
                                <div className="skeleton-text-2"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <a href="https://github.com/tapman104" target="_blank" rel="noopener noreferrer" className="github-card error">
                            github.com/tapman104
                        </a>
                    ) : (
                        <a href="https://github.com/tapman104" target="_blank" rel="noopener noreferrer" className="github-card">
                            <img src={githubData.avatar_url} alt="Avatar" className="github-avatar" />
                            <div className="github-stats">
                                <div className="github-username">{githubData.login}</div>
                                <div className="github-numbers">
                                    <span>{githubData.public_repos} repos</span>
                                    <span>•</span>
                                    <span>{githubData.followers} followers</span>
                                </div>
                            </div>
                        </a>
                    )}
                    
                    <a href="https://buymeacoffee.com/tapman" target="_blank" rel="noopener noreferrer" className="support-btn">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM2 21h18v-2H2v2z" fill="currentColor"/>
                        </svg>
                        Buy me a coffee
                    </a>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <a href="https://github.com/tapman104" target="_blank" rel="noopener noreferrer" className="footer-link">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                github
            </a>
            <a href="https://www.buymeacoffee.com/tapman" target="_blank" rel="noopener noreferrer" className="footer-link">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM2 21h18v-2H2v2z"/>
                </svg>
                support
            </a>
            <div className="footer-year">© {year}</div>
        </footer>
    );
};

const App = () => {
    return (
        <React.Fragment>
            <Hero />
            <SkillsStrip />
            <Divider />
            <About />
            <Footer />
        </React.Fragment>
    );
};

export default App;
