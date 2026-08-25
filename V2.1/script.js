document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. EFFET MACHINE À ÉCRIRE (LETTRE PAR LETTRE)
    // ==========================================
    const titleElement = document.getElementById('typewriter-title');
    const textElement = document.getElementById('typewriter-text');

    // Les textes exacts de ton portfolio
    const titleText = "Exploration de mon univers numérique";
    const paragraphText = "Développeur junior passionné par le code propre et l'innovation. Actuellement en plein perfectionnement des technologies web, ce portfolio est mon laboratoire.";

    // Vitesses de frappe (en millisecondes par lettre)
    const titleSpeed = 60; // Vitesse pour le titre
    const textSpeed = 30;  // Vitesse pour le paragraphe (un peu plus rapide)

    function typeWriter(element, text, speed, callback) {
        if (!element) return; // Sécurité si l'élément n'existe pas
        let index = 0;
        element.innerHTML = ""; // On vide l'élément au départ
        
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                // Dès que le titre est fini, on déclenche le callback (le paragraphe)
                callback();
            }
        }
        type();
    }

    // Lancement automatique après un mini délai de 300ms au chargement
    setTimeout(() => {
        typeWriter(titleElement, titleText, titleSpeed, () => {
            typeWriter(textElement, paragraphText, textSpeed);
        });
    }, 300);


    // ==========================================
    // 2. DÉFILEMENT FLUIDE (SMOOTH SCROLL)
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-container a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // 3. GESTION DU FORMULAIRE DE CONTACT
    // ==========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Merci ! Votre message a été envoyé avec succès. 🚀');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 2000);
        });
    }


    // ==========================================
    // 4. ANIMATION AU DÉFILEMENT (SCROLL REVEAL)
    // ==========================================
    const revealElements = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .glass-card');
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 
    // ==========================================
    // 5. GESTION DU MODE SOMBRE / CLAIR
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Si l'utilisateur a déjà choisi le mode clair auparavant, on l'applique
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggleBtn.textContent = "🌙 Mode Sombre";
    }

    // Écouteur de clic sur le bouton
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // On bascule la classe light-theme sur le body
            document.body.classList.toggle('light-theme');
            
            // On vérifie si le mode clair est actif pour changer le texte du bouton et sauvegarder
            if (document.body.classList.contains('light-theme')) {
                themeToggleBtn.textContent = "🌙 Mode Sombre";
                localStorage.setItem('theme', 'light');
            } else {
                themeToggleBtn.textContent = "☀️ Mode Clair";
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});