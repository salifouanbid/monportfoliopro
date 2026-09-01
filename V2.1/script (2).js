document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. EFFET MACHINE À ÉCRIRE (LETTRE PAR LETTRE)
    // ==========================================
    const titleElement = document.getElementById('typewriter-title');
    const textElement = document.getElementById('typewriter-text');

    // Les textes exacts de ton portfolio (respecte la langue déjà choisie si le visiteur revient)
    const languePref = localStorage.getItem('langue') || 'fr';
    const titleText = languePref === 'en'
        ? "Exploring my digital universe"
        : "Exploration de mon univers numérique";
    const paragraphText = languePref === 'en'
        ? "Junior developer passionate about clean code and innovation. Currently sharpening my web development skills, this portfolio is my lab."
        : "Développeur junior passionné par le code propre et l'innovation. Actuellement en plein perfectionnement des technologies web, ce portfolio est mon laboratoire.";

    // Vitesses de frappe (en millisecondes par lettre)
    const titleSpeed = 60; // Vitesse pour le titre
    const textSpeed = 30;  // Vitesse pour le paragraphe (un peu plus rapide)

    function typeWriter(element, text, speed, callback) {
        if (!element) return; // Sécurité si l'élément n'existe pas
        let index = 0;
        element.innerHTML = ""; // On vide l'élément au départ
        element.dataset.animating = "true";

        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                delete element.dataset.animating;
                if (callback) callback();
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

    // ==========================================
    // 6. MENU MOBILE (HAMBURGER)
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinksList = document.getElementById('nav-links');

    if (hamburgerBtn && navLinksList) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navLinksList.classList.toggle('open');
        });

        // Ferme le menu mobile après un clic sur un lien
        navLinksList.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinksList.classList.remove('open');
            });
        });
    }

    // ==========================================
    // 7. CHANGEMENT DE LANGUE (FR / EN)
    // ==========================================
    const TRADUCTIONS = {
        fr: {
            nav_accueil: "Accueil", nav_parcours: "Parcours", nav_competences: "Compétences",
            nav_projets: "Projets", nav_contact: "Contact",
            hero_badge: "Étudiant en CPGE",
            hero_btn_projets: "Voir mes projets", hero_btn_contact: "Me contacter",
            hero_title: "Exploration de mon univers numérique",
            hero_text: "Développeur junior passionné par le code propre et l'innovation. Actuellement en plein perfectionnement des technologies web, ce portfolio est mon laboratoire.",
            parcours_titre: "Mon parcours",
            achievement_titre: "1ère année de CPGE réussie sans rattrapage",
            achievement_desc_html: "Moyenne générale de <strong>14,51/20</strong> — Rang : <em>(à ajouter)</em>",
            competences_titre: "Mes Compétences",
            projets_titre: "Mes Projets",
            chat_titre: "💬 Une question sur mon profil ?",
            chat_bienvenue: "Salut ! Je peux répondre à quelques questions sur le parcours, les compétences ou les projets d'Anbid.",
            chat_placeholder: "Pose ta question...",
            chat_incompris: "Je n'ai pas bien saisi. Essaie une des questions suggérées, ou écris directement à salifouanbid@gmail.com."
        },
        en: {
            nav_accueil: "Home", nav_parcours: "Journey", nav_competences: "Skills",
            nav_projets: "Projects", nav_contact: "Contact",
            hero_badge: "CPGE Student",
            hero_btn_projets: "View my projects", hero_btn_contact: "Contact me",
            hero_title: "Exploring my digital universe",
            hero_text: "Junior developer passionate about clean code and innovation. Currently sharpening my web development skills, this portfolio is my lab.",
            parcours_titre: "My Journey",
            achievement_titre: "Passed 1st year of CPGE with no resit exams",
            achievement_desc_html: "Overall average of <strong>14.51/20</strong> — Rank: <em>(to be added)</em>",
            competences_titre: "My Skills",
            projets_titre: "My Projects",
            chat_titre: "💬 A question about my profile?",
            chat_bienvenue: "Hi! I can answer a few questions about Anbid's journey, skills or projects.",
            chat_placeholder: "Ask your question...",
            chat_incompris: "I didn't quite catch that. Try one of the suggested questions, or email salifouanbid@gmail.com directly."
        }
    };

    const langToggleBtn = document.getElementById('lang-toggle');
    let langueActuelle = localStorage.getItem('langue') || 'fr';

    function appliquerLangue(langue) {
        langueActuelle = langue;
        localStorage.setItem('langue', langue);
        if (langToggleBtn) langToggleBtn.textContent = langue === 'fr' ? '🌐 FR' : '🌐 EN';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const cle = el.getAttribute('data-i18n');
            if (TRADUCTIONS[langue][cle] !== undefined) {
                el.textContent = TRADUCTIONS[langue][cle];
            }
        });

        const achievementDesc = document.querySelector('[data-i18n="achievement_desc"]');
        if (achievementDesc) achievementDesc.innerHTML = TRADUCTIONS[langue].achievement_desc_html;

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const cle = el.getAttribute('data-i18n-placeholder');
            if (TRADUCTIONS[langue][cle] !== undefined) el.placeholder = TRADUCTIONS[langue][cle];
        });

        // Met aussi à jour le titre/texte de l'effet machine à écrire s'il a déjà fini de s'afficher
        if (titleElement && !titleElement.dataset.animating) {
            titleElement.textContent = TRADUCTIONS[langue].hero_title;
        }
        if (textElement && !textElement.dataset.animating) {
            textElement.textContent = TRADUCTIONS[langue].hero_text;
        }

        rafraichirSuggestionsChat();
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            appliquerLangue(langueActuelle === 'fr' ? 'en' : 'fr');
        });
    }

    // ==========================================
    // 8. CHATBOT HORS LIGNE (FAQ, 100% local, aucune connexion requise)
    // ==========================================
    const BASE_CONNAISSANCES = [
        {
            motsCles: ["parcours", "cpge", "classe préparatoire", "études", "école", "prepa", "journey", "school", "studies"],
            reponse: {
                fr: "Anbid est actuellement en classe préparatoire (CPGE) à l'IMSP au Bénin, spécialisé en mathématiques et informatique. Il a réussi sa 1ère année sans rattrapage avec 14,51/20 de moyenne.",
                en: "Anbid is currently in a preparatory class (CPGE) at IMSP in Benin, specializing in mathematics and computer science. He passed his 1st year with no resit exams, averaging 14.51/20."
            }
        },
        {
            motsCles: ["compétence", "competence", "langage", "python", "javascript", "html", "css", "skill", "skills"],
            reponse: {
                fr: "Ses compétences techniques incluent le langage C, JavaScript, Python (avec Django), et le développement web (HTML/CSS moderne). Section 'Compétences' pour le détail !",
                en: "His technical skills include C, JavaScript, Python (with Django), and modern web development (HTML/CSS). Check the 'Skills' section for details!"
            }
        },
        {
            motsCles: ["projet", "github", "agent ia", "snake", "portfolio", "project", "projects"],
            reponse: {
                fr: "Anbid a réalisé plusieurs projets : des agents IA (tuteur maths/code), un jeu Snake, le site du Collège Jean Piaget (en collaboration), et ce portfolio. Va voir la section 'Projets' !",
                en: "Anbid has built several projects: AI agents (math/code tutor), a Snake game, the Collège Jean Piaget website (as a collaboration), and this portfolio. Check the 'Projects' section!"
            }
        },
        {
            motsCles: ["contact", "email", "mail", "téléphone", "linkedin", "joindre", "reach"],
            reponse: {
                fr: "Tu peux contacter Anbid par email à salifouanbid@gmail.com, via le formulaire de la section Contact, ou sur LinkedIn (lien en haut de page).",
                en: "You can reach Anbid by email at salifouanbid@gmail.com, via the Contact section form, or on LinkedIn (link at the top of the page)."
            }
        },
        {
            motsCles: ["moyenne", "note", "résultat", "bac", "baccalauréat", "grade", "average", "results"],
            reponse: {
                fr: "Anbid a obtenu la Mention Très Bien au Baccalauréat, avec 16,38/20 au BEPC, et 14,51/20 en 1ère année de CPGE — réussie sans aucun rattrapage.",
                en: "Anbid graduated with High Honors at the Baccalauréat, scored 16.38/20 at the BEPC, and 14.51/20 in his 1st year of CPGE — passed with no resits."
            }
        },
        {
            motsCles: ["cv", "curriculum", "télécharger", "download", "resume"],
            reponse: {
                fr: "Tu peux télécharger le CV complet d'Anbid dans la section 'À propos', juste sous ses informations personnelles.",
                en: "You can download Anbid's full CV in the 'About' section, right under his personal information."
            }
        },
         {
            motsCles: ["nom","prenom","age"],
            reponse: {
                fr: "L'auteur de ce Portfolio porte le nom de SOULE SALIFOU ola Anbid et a 17 ans",
                en: "This portfolio author's Anbid  SOULE SALIFOU and he's 17  "
            }
        }
    ];

    // "Questions fréquentes" : suggestions cliquables (liste choisie, pas une
    // vraie statistique inter-visiteurs — un site 100% statique/hors-ligne
    // n'a pas de serveur pour compter les questions de tous les visiteurs).
    const QUESTIONS_SUGGEREES = {
        fr: ["Quel est son parcours ?", "Quelles sont ses compétences ?", "Quels projets a-t-il réalisés ?", "Comment le contacter ?","Parle nous de lui"],
        en: ["What's his journey?", "What are his skills?", "What projects has he built?", "How to contact him?","Talk of him"]
    };

    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWidget = document.getElementById('chat-widget');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatSuggestions = document.getElementById('chat-suggestions');

    function ajouterMessageChat(texte, expediteur) {
        const div = document.createElement('div');
        div.className = `chat-msg chat-msg-${expediteur}`;
        div.textContent = texte;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function trouverReponse(question) {
        const q = question.toLowerCase();
        let meilleur = null;
        let meilleurScore = 0;

        BASE_CONNAISSANCES.forEach(entree => {
            const score = entree.motsCles.filter(mot => q.includes(mot)).length;
            if (score > meilleurScore) {
                meilleurScore = score;
                meilleur = entree;
            }
        });

        if (meilleur) return meilleur.reponse[langueActuelle];
        return TRADUCTIONS[langueActuelle].chat_incompris;
    }

    function envoyerQuestionChat(texte) {
        if (!texte.trim()) return;
        ajouterMessageChat(texte, 'user');
        chatInput.value = '';
        setTimeout(() => {
            ajouterMessageChat(trouverReponse(texte), 'bot');
        }, 300);
    }

    function rafraichirSuggestionsChat() {
        if (!chatSuggestions) return;
        chatSuggestions.innerHTML = '';
        QUESTIONS_SUGGEREES[langueActuelle].forEach(question => {
            const chip = document.createElement('button');
            chip.className = 'chat-chip';
            chip.textContent = question;
            chip.addEventListener('click', () => envoyerQuestionChat(question));
            chatSuggestions.appendChild(chip);
        });
    }

    if (chatToggleBtn && chatWidget) {
        chatToggleBtn.addEventListener('click', () => {
            chatWidget.classList.toggle('open');
        });
    }
    if (chatCloseBtn && chatWidget) {
        chatCloseBtn.addEventListener('click', () => chatWidget.classList.remove('open'));
    }
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', () => envoyerQuestionChat(chatInput.value));
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') envoyerQuestionChat(chatInput.value);
        });
    }

    rafraichirSuggestionsChat();
    if (langueActuelle !== 'fr') appliquerLangue(langueActuelle);
});