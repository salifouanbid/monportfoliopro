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
            const langueActuelleFormulaire = localStorage.getItem('langue') || 'fr';
            
            submitBtn.textContent = langueActuelleFormulaire === 'en' ? 'Sending...' : 'Envoi en cours...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(langueActuelleFormulaire === 'en'
                    ? 'Thank you! Your message was sent successfully. 🚀'
                    : 'Merci ! Votre message a été envoyé avec succès. 🚀');
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
            changer_langue: "Changer la langue",
            hero_badge: "Étudiant en CPGE",
            hero_btn_projets: "Voir mes projets", hero_btn_contact: "Me contacter",
            hero_title: "Exploration de mon univers numérique",
            hero_text: "Développeur junior passionné par le code propre et l'innovation. Actuellement en plein perfectionnement des technologies web, ce portfolio est mon laboratoire.",

            parcours_titre: "Mon parcours",
            achievement_titre: "1ère année de CPGE réussie sans rattrapage",
            achievement_desc: "Moyenne générale de <strong>14,51/20</strong> — Rang : <em>(à ajouter)</em>",
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
            cv_bouton: "📥 Télécharger mon CV (PDF)",

            competences_titre: "Mes Compétences",
            skill_c_titre: "Langage C", skill_c_desc: "Niveau Intermédiaire",
            skill_js_titre: "JavaScript", skill_js_desc: "Intermédiaire",
            skill_py_titre: "Python", skill_py_desc: "Framework Django / Débutant",skill_py_desc1:"Machine Learning/Intermediaire",
            skill_html_titre: "Web Design", skill_html_desc: "HTML &amp; CSS moderne",
            skill_office_titre: "Pack Office", skill_office_desc: "Utilisation avancée",
            skill_temps_titre: "Gestion du temps", skill_temps_desc: "Organisation efficace et respect des deadlines.",
            skill_oral_titre: "Art oratoire", skill_oral_desc: "Prise de parole en public et communication claire.",
            skill_equipe_titre: "Travail d'équipe", skill_equipe_desc: "Collaboration active sur des projets communs.",

            projets_titre: "Mes Projets",
            projet_recommandation_titre: "IA & Algorithmique", projet_recommandation_desc: "Analyse de données et prédictions.",
            projet_webportfolio_titre: "UI / UX Design", projet_webportfolio_desc: "Interface moderne en Glassmorphism.",
            projet_agent_titre: "Tuteur IA de Mathématiques & Code", projet_agent_desc: "Assistant local (Ollama + RAG) pour aider aux exercices, avec historique de conversation et analyse d'images/documents.",
            projet_snake_titre: "Jeu Snake", projet_snake_desc: "Recréation du jeu classique du serpent, logique de collision et score en temps réel.",
            projet_college_titre: "Site du Collège Jean Piaget", projet_college_desc: "Site complet développé en collaboration avec un ami pour l'établissement.",
            projet_lien_github: "🔗 Voir le dépôt GitHub",

            contact_titre: "Contactez-moi",
            contact_texte: "Une suggestion ou un projet ? Parlons-en.",
            contact_pays: "📍 Bénin",
            contact_tel: "📞 +229 0155873800",
            form_nom: "Nom complet",
            form_email: "Votre Email",
            form_message: "Votre message...",
            form_envoyer: "Envoyer le message",
            form_envoi_cours: "Envoi en cours...",

            footer_texte: "© 2026 SOULE SALIFOU Anbid | Fait avec passion",

            chat_titre: "💬 Une question sur mon profil ?",
            chat_bienvenue: "Salut ! Je peux répondre à quelques questions sur le parcours, les compétences ou les projets d'Anbid.",
            chat_placeholder: "Pose ta question...",
            chat_incompris: "Je n'ai pas bien saisi. Essaie une des questions suggérées, ou écris directement à salifouanbid@gmail.com."
        },
        en: {
            nav_accueil: "Home", nav_parcours: "Journey", nav_competences: "Skills",
            nav_projets: "Projects", nav_contact: "Contact",
            changer_langue: "Change language",
            hero_badge: "CPGE Student",
            hero_btn_projets: "View my projects", hero_btn_contact: "Contact me",
            hero_title: "Exploring my digital universe",
            hero_text: "Junior developer passionate about clean code and innovation. Currently sharpening my web development skills, this portfolio is my lab.",

            parcours_titre: "My Journey",
            achievement_titre: "Passed 1st year of CPGE with no resit exams",
            achievement_desc: "Overall average of <strong>14.51/20</strong> ",
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
            cv_bouton: "📥 Download my CV (PDF)",

            competences_titre: "My Skills",
            skill_c_titre: "C Language", skill_c_desc: "Intermediate level",
            skill_js_titre: "JavaScript", skill_js_desc: "Intermediate",
            skill_py_titre: "Python", skill_py_desc: "Django Framework / Beginner",skill_py_desc1:"Machine Learning/Intermediate",
            skill_html_titre: "Web Design", skill_html_desc: "Modern HTML &amp; CSS",
            skill_office_titre: "Office Suite", skill_office_desc: "Advanced use",
            skill_temps_titre: "Time Management", skill_temps_desc: "Efficient organization and deadline compliance.",
            skill_oral_titre: "Public Speaking", skill_oral_desc: "Public speaking and clear communication.",
            skill_equipe_titre: "Teamwork", skill_equipe_desc: "Active collaboration on shared projects.",

            projets_titre: "My Projects",
            projet_recommandation_titre: "AI & Algorithms", projet_recommandation_desc: "Data analysis and predictions.",
            projet_webportfolio_titre: "UI / UX Design", projet_webportfolio_desc: "Modern Glassmorphism interface.",
            projet_agent_titre: "AI Tutor for Math & Code", projet_agent_desc: "Local assistant (Ollama + RAG) to help with exercises, with conversation history and image/document analysis.",
            projet_snake_titre: "Snake Game", projet_snake_desc: "Recreation of the classic Snake game, with collision logic and real-time scoring.",
            projet_college_titre: "Collège Jean Piaget Website", projet_college_desc: "Full website built in collaboration with a friend for the school.",
            projet_lien_github: "🔗 View GitHub repo",

            contact_titre: "Get in Touch",
            contact_texte: "A suggestion or a project? Let's talk.",
            contact_pays: "📍 Benin",
            contact_tel: "📞 +229 0155873800",
            form_nom: "Full name",
            form_email: "Your email",
            form_message: "Your message...",
            form_envoyer: "Send message",
            form_envoi_cours: "Sending...",

            footer_texte: "© 2026 SOULE SALIFOU Anbid | Made with passion",

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
            const maxTilt = 8; // degrés
            const rotateX = (-y * maxTilt).toFixed(2);
            const rotateY = (x * maxTilt).toFixed(2);
            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();
