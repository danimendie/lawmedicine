/* ============================================
   LAW & MEDICINE - Landing Page JavaScript
   Premium Futuristic Landing - Interactive Behaviors
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // Mobile Navigation Toggle
    // -----------------------------------------
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // -----------------------------------------
    // Sticky Header on Scroll
    // -----------------------------------------
    const hero = document.getElementById('inicio');
    let lastScrollY = 0;
    
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    // -----------------------------------------
    // Smooth Scroll for Anchor Links
    // -----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // -----------------------------------------
    // FAQ Accordion
    // -----------------------------------------
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
    });
    
    // -----------------------------------------
    // Scroll Reveal Animations (IntersectionObserver)
    // -----------------------------------------
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // -----------------------------------------
    // Coverage Tabs Functionality
    // -----------------------------------------
    const coverageTabs = document.querySelectorAll('.coverage-tabs__btn');
    const coverageTabPanels = document.querySelectorAll('.coverage-tab');
    
    coverageTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update tab button states
            coverageTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update tab panel visibility
            coverageTabPanels.forEach(panel => {
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                    panel.style.animation = 'fadeIn 0.3s ease forwards';
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
    
    // -----------------------------------------
    // Pain Card Hover Effects
    // -----------------------------------------
    const painCards = document.querySelectorAll('.pain-card');
    
    painCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'painPulse 2s ease infinite';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
        });
    });
    
    // -----------------------------------------
    // Coverage Card Hover Effects
    // -----------------------------------------
    const coverageCards = document.querySelectorAll('.coverage-card');
    
    coverageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const badge = card.querySelector('.coverage-card__badge');
            if (badge) {
                badge.style.animation = 'badgePulse 1.5s ease infinite';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const badge = card.querySelector('.coverage-card__badge');
            if (badge) {
                badge.style.animation = '';
            }
        });
    });
    
    // -----------------------------------------
    // Plan Card Hover Effects
    // -----------------------------------------
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            planCards.forEach(c => {
                if (c !== card && !c.classList.contains('plan-card--featured')) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            planCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // -----------------------------------------
    // WhatsApp Floating Button Animation
    // -----------------------------------------
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', () => {
            whatsappBtn.style.animation = 'none';
        });
        
        whatsappBtn.addEventListener('mouseleave', () => {
            whatsappBtn.style.animation = 'floatPulse 2s infinite';
        });
    }
    
    // -----------------------------------------
    // Active Nav Link Highlight on Scroll
    // -----------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    const highlightNav = () => {
        const scrollY = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav, { passive: true });
    
    // -----------------------------------------
    // Prevent Spacebar Scroll on Accordion
    // -----------------------------------------
    document.querySelectorAll('.faq__question').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.keyCode === 32) {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    // -----------------------------------------
    // Hero Title Glow Animation
    // -----------------------------------------
    const heroTitle = document.querySelector('.hero__title');
    
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.style.textShadow = '0 0 80px var(--primary-glow)';
        });
        
        heroTitle.addEventListener('mouseleave', () => {
            heroTitle.style.textShadow = '0 0 60px var(--primary-glow)';
        });
    }
    
    // -----------------------------------------
    // Buttons Ripple Effect
    // -----------------------------------------
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // -----------------------------------------
    // Parallax Effect for Glow Elements
    // -----------------------------------------
    const glowElements = document.querySelectorAll('.hero__glow, .cta-final__glow');
    
    if (glowElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            glowElements.forEach(el => {
                const speed = 0.3;
                el.style.transform = `translate(-50%, calc(-50% + ${scrollY * speed}px))`;
            });
        }, { passive: true });
    }
    
    // -----------------------------------------
    // Quiz Interactive
    // -----------------------------------------
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizProgressDots = document.querySelectorAll('.quiz-progress__dot');
    const quizResult = document.querySelector('.quiz-result');
    let currentQuestion = 0;
    let totalScore = 0;
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected from siblings
            const parent = this.closest('.quiz-question');
            parent.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
            
            // Select this option
            this.classList.add('selected');
            
            // Add value to score
            const value = parseInt(this.dataset.value);
            totalScore += value;
            
            // Next question after delay
            setTimeout(() => {
                if (currentQuestion < 3) {
                    quizQuestions[currentQuestion].classList.remove('active');
                    quizProgressDots[currentQuestion].classList.remove('active');
                    quizProgressDots[currentQuestion].classList.add('completed');
                    
                    currentQuestion++;
                    quizQuestions[currentQuestion].classList.add('active');
                    quizProgressDots[currentQuestion].classList.add('active');
                } else {
                    // Show result
                    quizQuestions[currentQuestion].classList.remove('active');
                    quizProgressDots[currentQuestion].classList.remove('active');
                    quizProgressDots[currentQuestion].classList.add('completed');
                    
                    quizResult.classList.add('active');
                    quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Calculate and display score
                    const riskScore = document.getElementById('risk-score');
                    const riskDesc = document.getElementById('risk-description');
                    
                    let score, desc;
                    if (totalScore < 100) {
                        score = totalScore;
                        desc = 'Tenés una exposición baja, pero cualquier día puede cambiar. Es mejor estar preparado.';
                    } else if (totalScore < 200) {
                        score = totalScore;
                        desc = 'Tu nivel de riesgo es moderado. Con más de 15 años de experiencia, te recomendamos cobertura completa.';
                    } else if (totalScore < 300) {
                        score = totalScore;
                        desc = 'Alta exposición detectada. Con tu perfil, necesitás protección total. Cada día sin cobertura es un riesgo.';
                    } else {
                        score = totalScore;
                        desc = 'Exposición crítica. Sin cobertura, tu patrimonio y carrera están en peligro real. Actuá ya.';
                    }
                    
                    riskScore.innerHTML = score;
                    riskDesc.textContent = desc;
                }
            }, 500);
        });
    });
});

// -----------------------------------------
// CSS Keyframes for Animations
// -----------------------------------------
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes painPulse {
        0%, 100% { box-shadow: 0 20px 40px rgba(229, 62, 62, 0.2); }
        50% { box-shadow: 0 20px 40px rgba(229, 62, 62, 0.35); }
    }
    
    @keyframes badgePulse {
        0%, 100% { opacity: 1; transform: translateY(0); }
        50% { opacity: 0.8; transform: translateY(-3px); }
    }
    
    @keyframes rippleEffect {
        to {
            transform: translate(-50%, -50%) scale(40);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);
