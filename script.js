document.addEventListener('DOMContentLoaded', () => {
    
    // Défilement fluide (smooth scroll)
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

    // Formulaire de contact
    // Sans service d'envoi configuré (data-endpoint vide), le message ouvre le client mail prérempli.
    // Pour un envoi direct, renseigner data-endpoint avec une URL Formspree dans index.html.
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const EMAIL_CONTACT = 'salifouanbid@gmail.com';

    function afficherStatut(cle, erreur) {
        if (!formStatus) return;
        formStatus.textContent = TRADUCTIONS[langueActuelle][cle] || '';
        formStatus.classList.toggle('is-error', !!erreur);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            const endpoint = contactForm.dataset.endpoint;

            if (!endpoint) {
                const sujet = encodeURIComponent('Message depuis le portfolio — ' + data.get('name'));
                const corps = encodeURIComponent(data.get('message') + '\n\n' + data.get('name') + ' (' + data.get('email') + ')');
                window.location.href = 'mailto:' + EMAIL_CONTACT + '?subject=' + sujet + '&body=' + corps;
                afficherStatut('form_mailto');
                return;
            }

            const bouton = contactForm.querySelector('button[type="submit"]');
            bouton.disabled = true;
            afficherStatut('form_envoi_cours');
            fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
                .then((reponse) => {
                    if (!reponse.ok) throw new Error('envoi refusé');
                    contactForm.reset();
                    afficherStatut('form_ok');
                })
                .catch(() => afficherStatut('form_erreur', true))
                .finally(() => { bouton.disabled = false; });
        });
    }

    // Animation au défilement (scroll reveal)
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
    // Menu mobile (hamburger)
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinksList = document.getElementById('nav-links');

    if (hamburgerBtn && navLinksList) {
        hamburgerBtn.addEventListener('click', () => {
            const ouvert = navLinksList.classList.toggle('open');
            hamburgerBtn.classList.toggle('active', ouvert);
            hamburgerBtn.setAttribute('aria-expanded', String(ouvert));
        });

        // Ferme le menu mobile après un clic sur un lien
        navLinksList.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                navLinksList.classList.remove('open');
            });
        });
    }

    // Changement de langue (FR / EN)
    const TRADUCTIONS = {
        fr: {
            nav_accueil: "Accueil", nav_parcours: "Parcours", nav_competences: "Compétences",
            nav_projets: "Projets", nav_contact: "Contact",
            changer_langue: "Changer la langue",
            theme_vers_clair: "Mode clair", theme_vers_sombre: "Mode sombre", haut_de_page: "Haut de page",
            portrait_alt: "Portrait d'Anbid Salifou",
            strength_1: "Boursier national", strength_2: "Club IA de l'IMSP", strength_3: "Prépa MPSI-PCSI-Info",
            strength_4: "Objectif : école d'ingénieurs en IA (ECC 2027)",
            stk_langages_titre: "Langages", stk_web_titre: "Web", stk_ia_titre: "IA &amp; données", stk_outils_titre: "Outils",
            stk_c: "intermédiaire, jeu Snake", stk_python: "machine learning : intermédiaire · Django : débutant",
            stk_js: "débutant à intermédiaire", stk_html: "site du collège, boutique en ligne, ce portfolio",
            stk_flask: "interface du tuteur IA", stk_ml: "sept mini-projets du cahier de vacances",
            stk_rag: "assistant local avec RAG", stk_data: "visualisation et bases de données", stk_office: "utilisation avancée",
            projet_boutique_titre: "Boutique en ligne", projet_boutique_desc: "Utiliser les technologies web pour créer une boutique en ligne fonctionnelle.",
            projet_portfolio_titre: "Ce portfolio", projet_portfolio_desc: "Site statique en HTML, CSS et JavaScript, bilingue (français / anglais) avec thème clair et sombre.",
            form_ok: "Merci ! Votre message a bien été envoyé.", form_erreur: "Le message n'a pas pu être envoyé. Écrivez-moi directement par e-mail.",
            form_mailto: "Votre application de messagerie s'ouvre avec le message prérempli.",
            hero_badge: "Étudiant en CPGE",
            hero_btn_projets: "Voir mes projets", hero_btn_contact: "Me contacter",
            hero_title: "Anbid Salifou",
            hero_text: "Étudiant en classe préparatoire (MPSI-PCSI-Info) à l'IMSP, au Bénin. Je programme en C et en Python, et je construis des projets web et d'IA : un tuteur de maths en local, le site d'un collège, sept mini-projets de machine learning.",

            parcours_titre: "Mon parcours",
            achievement_titre: "1ère année de CPGE réussie sans rattrapage",
            achievement_desc: "Moyenne générale de <strong>14,42/20</strong>",
            timeline_bourse: "Lauréat de la bourse d'excellence du baccalauréat au Bénin.",
            timeline_bac: "Mention Très Bien au Baccalauréat béninois, avec une moyenne de 15 en classe de terminale indépendamment des examens nationaux et une 3e place à l'appui.",
            timeline_cpge_desc: "<p>Actuellement en classe préparatoire aux grandes écoles (CPGE),</p><p>je me spécialise en mathématiques et informatique.</p>",

            antecedents_titre: "Antécédents académiques",
            timeline_1ere: "Moyenne en 1ère C : 14,73",
            timeline_2nde: "Moyenne en Seconde C : 15,89 avec une deuxième place, témoignant de la rigueur, de la discipline et de l'excellence.",
            timeline_bepc: "Moyenne de 16,38 au BEPC béninois.",

            engagements_titre: "Engagements",
            engagement_sport: "Engagement sportif : membre actif du club de football de l'Institut de Mathématiques et de Sciences Physiques (IMSP).",
            engagement_sci: "Engagement scientifique : membre actif du club d'intelligence artificielle de l'IMSP.",

            langues_titre: "Langues",
            langue_fr: "Français : niveau intermédiaire",
            langue_en: "Anglais : niveau B1",

            about_titre: "À propos de moi",
            about_texte: "Lauréat de la bourse d'excellence au Bénin, je cultive la rigueur et la discipline. Entre le football et l'intelligence artificielle à l'IMSP, je forge mon profil technique au quotidien.",
            info_nom: "<strong>Nom</strong> SOULE SALIFOU Ola Anbid",
            info_email: "<strong>Email</strong> salifouanbid@gmail.com",
            info_langues: "<strong>Langues</strong> Français, Anglais (B1)",
            info_age: "<strong>Âge</strong> 17 ans",
            info_lieu: "<strong>Localisation</strong> Bénin",
            cv_intro: "Mon parcours détaillé est disponible ici :",
            cv_bouton: "Télécharger mon CV (PDF)",

            competences_titre: "Mes Compétences",

            projets_titre: "Mes Projets",
            projet_agent_titre: "Tuteur IA de Mathématiques & Code", projet_agent_desc: "Assistant local (Ollama + RAG) pour aider aux exercices, avec historique de conversation et analyse d'images/documents.",
            projet_snake_titre: "Jeu Snake", projet_snake_desc: "Recréation du jeu classique du serpent, logique de collision et score en temps réel.",
            projet_college_titre: "Site du Collège Jean Piaget", projet_college_desc: "Site complet développé en collaboration avec un ami pour l'établissement.",
            projet_vacances_titre: "Cahier de Vacances — 7 mini-projets Machine Learning", projet_vacances_desc: "7 projets conçus de A à Z avec des technologies nouvelles, dans le cadre d'une formation à distance avec Guillaume Saint-Cyr, en collaboration internationale autour du machine learning et du deep learning.",
            projet_lien_github: "Voir le dépôt GitHub",

            contact_titre: "Contactez-moi",
            contact_texte: "Une suggestion ou un projet ? Parlons-en.",
            contact_pays: "Bénin",
            contact_tel: "+229 0155873800",
            form_nom: "Nom complet",
            form_email: "Votre Email",
            form_message: "Votre message...",
            form_envoyer: "Envoyer le message",
            form_envoi_cours: "Envoi en cours…",

            footer_texte: "© 2026 Anbid Salifou",

        },
        en: {
            nav_accueil: "Home", nav_parcours: "Journey", nav_competences: "Skills",
            nav_projets: "Projects", nav_contact: "Contact",
            changer_langue: "Change language",
            theme_vers_clair: "Light mode", theme_vers_sombre: "Dark mode", haut_de_page: "Back to top",
            portrait_alt: "Portrait of Anbid Salifou",
            strength_1: "National scholarship holder", strength_2: "IMSP AI Club", strength_3: "MPSI-PCSI-Info prep class",
            strength_4: "Goal: an AI engineering school (ECC 2027)",
            stk_langages_titre: "Languages", stk_web_titre: "Web", stk_ia_titre: "AI &amp; data", stk_outils_titre: "Tools",
            stk_c: "intermediate, Snake game", stk_python: "machine learning: intermediate · Django: beginner",
            stk_js: "beginner to intermediate", stk_html: "school website, online shop, this portfolio",
            stk_flask: "AI tutor interface", stk_ml: "seven mini-projects of the summer notebook",
            stk_rag: "local assistant with RAG", stk_data: "visualization and databases", stk_office: "advanced use",
            projet_boutique_titre: "Online shop", projet_boutique_desc: "Using web technologies to build a working online shop.",
            projet_portfolio_titre: "This portfolio", projet_portfolio_desc: "Static site in HTML, CSS and JavaScript, bilingual (French / English) with light and dark themes.",
            form_ok: "Thank you! Your message was sent.", form_erreur: "The message could not be sent. Please email me directly.",
            form_mailto: "Your mail app is opening with the message pre-filled.",
            hero_badge: "CPGE Student",
            hero_btn_projets: "View my projects", hero_btn_contact: "Contact me",
            hero_title: "Anbid Salifou",
            hero_text: "Preparatory-class student (MPSI-PCSI-Info) at IMSP, Benin. I write C and Python and build web and AI projects: a local maths tutor, a school website, seven machine-learning mini-projects.",

            parcours_titre: "My Journey",
            achievement_titre: "Passed 1st year of CPGE with no resit exams",
            achievement_desc: "Overall average of <strong>14.42/20</strong>",
            timeline_bourse: "Awarded the Baccalauréat excellence scholarship in Benin.",
            timeline_bac: "Graduated with High Honors at the Beninese Baccalauréat, with a 15/20 average in final year independently of national exams, and ranked 3rd.",
            timeline_cpge_desc: "<p>Currently in a preparatory class for top engineering schools (CPGE),</p><p>specializing in mathematics and computer science.</p>",

            antecedents_titre: "Academic Background",
            timeline_1ere: "11th grade average: 14.73/20",
            timeline_2nde: "10th grade average: 15.89/20, ranked 2nd — a reflection of rigor, discipline and excellence.",
            timeline_bepc: "16.38/20 average at the Beninese BEPC exam.",

            engagements_titre: "Involvements",
            engagement_sport: "Sports involvement: active member of the football club at the Institute of Mathematics and Physical Sciences (IMSP).",
            engagement_sci: "Scientific involvement: active member of the IMSP AI club.",

            langues_titre: "Languages",
            langue_fr: "French: intermediate level",
            langue_en: "English: B1 level",

            about_titre: "About Me",
            about_texte: "Winner of the excellence scholarship in Benin, I cultivate rigor and discipline. Between football and AI at IMSP, I sharpen my technical profile every day.",
            info_nom: "<strong>Name</strong> SOULE SALIFOU Ola Anbid",
            info_email: "<strong>Email</strong> salifouanbid@gmail.com",
            info_langues: "<strong>Languages</strong> French, English (B1)",
            info_age: "<strong>Age</strong> 17",
            info_lieu: "<strong>Location</strong> Benin",
            cv_intro: "My detailed background is available here:",
            cv_bouton: "Download my CV (PDF)",

            competences_titre: "My Skills",

            projets_titre: "My Projects",
            projet_agent_titre: "AI Tutor for Math & Code", projet_agent_desc: "Local assistant (Ollama + RAG) to help with exercises, with conversation history and image/document analysis.",
            projet_snake_titre: "Snake Game", projet_snake_desc: "Recreation of the classic Snake game, with collision logic and real-time scoring.",
            projet_college_titre: "Collège Jean Piaget Website", projet_college_desc: "Full website built in collaboration with a friend for the school.",
            projet_vacances_titre: "Summer Notebook — 7 Machine Learning mini-projects", projet_vacances_desc: "7 projects built from scratch with new technologies, as part of remote training with Guillaume Saint-Cyr, in international collaboration around machine learning and deep learning.",
            projet_lien_github: "View GitHub repo",

            contact_titre: "Get in Touch",
            contact_texte: "A suggestion or a project? Let's talk.",
            contact_pays: "Benin",
            contact_tel: "+229 0155873800",
            form_nom: "Full name",
            form_email: "Your email",
            form_message: "Your message...",
            form_envoyer: "Send message",
            form_envoi_cours: "Sending...",

            footer_texte: "© 2026 Anbid Salifou",

        }
    };

    const langToggleBtn = document.getElementById('lang-toggle');
    let langueActuelle = localStorage.getItem('langue') || 'fr';

    function appliquerLangue(langue) {
        langueActuelle = langue;
        localStorage.setItem('langue', langue);
        document.documentElement.lang = langue;
        if (langToggleBtn) langToggleBtn.textContent = langue.toUpperCase();

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const cle = el.getAttribute('data-i18n');
            const traduction = TRADUCTIONS[langue][cle];
            if (traduction === undefined) return;
            if (traduction.includes('<')) {
                el.innerHTML = traduction;
            } else {
                el.textContent = traduction;
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const cle = el.getAttribute('data-i18n-title');
            if (TRADUCTIONS[langue][cle] !== undefined) el.title = TRADUCTIONS[langue][cle];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const cle = el.getAttribute('data-i18n-placeholder');
            if (TRADUCTIONS[langue][cle] !== undefined) el.placeholder = TRADUCTIONS[langue][cle];
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const cle = el.getAttribute('data-i18n-alt');
            if (TRADUCTIONS[langue][cle] !== undefined) el.alt = TRADUCTIONS[langue][cle];
        });

        majBoutonTheme();
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            appliquerLangue(langueActuelle === 'fr' ? 'en' : 'fr');
        });
    }

    // Thème clair / sombre
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-theme');

    function majBoutonTheme() {
        if (!themeToggleBtn) return;
        const cle = document.body.classList.contains('light-theme') ? 'theme_vers_sombre' : 'theme_vers_clair';
        themeToggleBtn.setAttribute('data-i18n', cle);
        themeToggleBtn.textContent = TRADUCTIONS[langueActuelle][cle];
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const clair = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', clair ? 'light' : 'dark');
            majBoutonTheme();
        });
    }
    majBoutonTheme();

    if (langueActuelle !== 'fr') appliquerLangue(langueActuelle);

    // Bouton "haut de page"
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const toggleBackToTop = () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 400);
        };
        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop);
    }
});

/* Bouton flottant WhatsApp — coordonnées personnelles d'Anbid */
const SITE_SHARED = {
  contact: {
    whatsapp: "2290155873800"
  }
};
 setTimeout(() => {
    const langueWa = localStorage.getItem('langue') || 'fr';
    const waNumber = (SITE_SHARED.contact.whatsapp || "").replace(/[^0-9+]/g, '');
    const waMessage = encodeURIComponent(langueWa === 'en'
      ? "Hello Anbid, I saw your portfolio and would like to get in touch."
      : "Bonjour Anbid, j'ai vu ton portfolio et j'aimerais échanger avec toi.");
    const waUrl = waNumber ? `https://wa.me/${waNumber}?text=${waMessage}` : '#';

    const waBtn = document.createElement('a');
    waBtn.href = waUrl;
    waBtn.className = 'whatsapp-float';
    waBtn.setAttribute('aria-label', 'Nous contacter sur WhatsApp');
    waBtn.setAttribute('target', '_blank');
    waBtn.setAttribute('rel', 'noopener noreferrer');
    waBtn.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`;
    document.body.appendChild(waBtn);
    requestAnimationFrame(() => waBtn.classList.add('is-visible'));
  }, 1200);

// ==========================================
// 7. EFFET DE TILT 3D AU SURVOL (cartes projets & compétences)
//    — suit la position du curseur, désactivé sur écrans tactiles
// ==========================================
(function () {
    const supportsHoverTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHoverTilt) return;

    const tiltCards = document.querySelectorAll('.project-card, .skill-card');

    tiltCards.forEach((card) => {
        card.style.willChange = 'transform';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const maxTilt = 5; // degrés
            const rotateX = (-y * maxTilt).toFixed(2);
            const rotateY = (x * maxTilt).toFixed(2);
            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

// Diaporama cahier de vacances (une image toutes les 1s)
(function () {
    const sliders = document.querySelectorAll('.vacances-slider');
    if (!sliders.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll('.vacances-slide');
        if (slides.length < 2 || prefersReducedMotion) return;

        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('is-active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('is-active');
        }, 3000);
    });
})();
