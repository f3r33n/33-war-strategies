// script.js

// IIFE to avoid polluting global scope
(function() {
    'use strict';

    // --- DOM Element Selection ---
    const header = document.getElementById('site-header');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const grid = document.getElementById('strategies-grid');

    // --- State ---
    const strategies = [
        { num: 1, title: 'Declare War On Your Enemies: The Polarity Strategy', desc: 'Identify your enemies clearly. Ambiguity is a luxury you cannot afford in conflict.', example: 'Napoleon Bonaparte masterfully polarized situations, forcing nations to choose a side and simplifying the battlefield.', icon: `<path d="M12 2L1 21h22L12 2zm0 4.5l6.38 11.5H5.62L12 6.5z"/>`},
        { num: 2, title: 'Do Not Fight the Last War: The Guerrilla-War-of-the-Mind Strategy', desc: 'What succeeded before will not succeed again. Adapt your mind to the present moment.', example: 'The Viet Cong defied conventional US tactics with guerrilla methods that rendered superior firepower less effective.', icon: `<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>`},
        { num: 3, title: 'Amidst Turmoil, Do Not Lose Presence of Mind: The Counterbalance Strategy', desc: 'In the heat of battle, the calmest mind prevails. Maintain your mental balance.', example: 'Marcus Aurelius faced constant betrayal and war, yet his Stoic practice gave him clarity to rule effectively.', icon: `<path d="M12 3C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10S17.52 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>`},
        { num: 4, title: 'Create a Sense of Urgency: The Death-Ground Strategy', desc: 'Place your troops where they have no choice but to win. Fear of death is a powerful motivator.', example: 'Hernán Cortés scuttled his ships upon arriving in Mexico, forcing his men into a win-or-die mindset.', icon: `<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>`},
        { num: 5, title: 'Avoid the Traps of Groupthink: The Command-and-Control Strategy', desc: 'Maintain a singular vision. A committee of generals will lead to confusion and disaster.', example: 'Margaret Thatcher’s resolute leadership during the Falklands War defied committee advice and led to victory.', icon: `<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>`},
        { num: 6, title: 'Segment Your Forces: The Controlled-Chaos Strategy', desc: 'Divide your goals into smaller, manageable parts. Flexibility allows you to adapt to any situation.', example: 'Genghis Khan’s Mongol army was divided into self-sufficient units, allowing for rapid, coordinated, and flexible attacks.', icon: `<path d="M12.5 8c-2.65 0-5.18.99-7.2 2.63L1 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C20.36 10.36 16.71 8 12.5 8z"/>`},
        { num: 7, title: 'Transform Your War into a Crusade: The Morale Strategy', desc: 'Fight for a cause, not just a battle. A motivated army can achieve the impossible.', example: 'Joan of Arc transformed a dynastic squabble into a holy war, inspiring the French to repel the English.', icon: `<path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>`},
        { num: 8, title: 'Pick Your Battles Carefully: The Economy-of-Force Strategy', desc: 'Conserve your energy and resources for decisive moments. Not every conflict is worth fighting.', example: 'Warren Buffett’s investment philosophy is to wait for the perfect "fat pitch" rather than swinging at every opportunity.', icon: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 16.17l7.59-7.59L19 10l-9 9z"/>`},
        { num: 9, title: 'Turn the Tables: The Counterattack Strategy', desc: 'Let your opponent make the first move. An attack often reveals weaknesses to exploit.', example: 'At the Battle of Austerlitz, Napoleon feigned weakness to lure the Russo-Austrian army into a trap, then counterattacked.', icon: `<path d="M8 9v6h8V9H8zm2 2h4v2h-4v-2z" opacity=".3"/><path d="M2 7v10h20V7H2zm16 8H6V9h12v6z"/>`},
        { num: 10, title: 'Create a Threatening Presence: The Deterrence Strategy', desc: 'Project an image of strength and confidence that makes others hesitant to attack you.', example: 'The Cold War was defined by the deterrence of "Mutually Assured Destruction" between the US and the Soviet Union.', icon: `<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z"/>`},
        { num: 11, title: 'Trade Space for Time: The Nonengagement Strategy', desc: 'When overwhelmed, retreat and let the enemy overextend. Time is your greatest ally.', example: 'The Russian scorched-earth retreat against Napoleon’s 1812 invasion stretched his supply lines to the breaking point.', icon: `<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>`},
        { num: 12, title: 'Lose Battles but Win the War: The Grand-Strategy', desc: 'Focus on your ultimate objective. Tactical losses can be acceptable if they serve a larger strategic goal.', example: 'George Washington lost many battles to the British but kept the Continental Army intact, ultimately winning the war.', icon: `<path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"/>`},
        { num: 13, title: 'Know Your Enemy: The Intelligence Strategy', desc: 'The more you know about your rival, the greater your advantage. Information is power.', example: 'Sun Tzu emphasized that supreme excellence consists in breaking the enemy\'s resistance without fighting, through intelligence.', icon: `<path d="M12 6.5c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5M12 4.5c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z"/>`},
        { num: 14, title: 'Overwhelm Resistance with Speed: The Blitzkrieg Strategy', desc: 'A swift and surprising attack can shatter an enemy’s morale and ability to respond.', example: 'Germany’s Blitzkrieg tactics in WWII used concentrated force and speed to cause psychological shock and disorganization.', icon: `<path d="M6.3 11.3l8.4 8.4 1.4-1.4-8.4-8.4-1.4 1.4zM4.5 9.5l1 1 5.6-5.6-1-1zM3 21h18v-2H3v2zM13.56 5.56l-1.41-1.41 4.24-4.24 1.41 1.41z"/>`},
        { num: 15, title: 'Control the Dynamic: The Forcing Strategy', desc: 'Make your opponents react to you. Control the tempo and terms of the engagement.', example: 'Chess grandmaster Bobby Fischer controlled games by making unconventional moves that forced his opponents into unfamiliar territory.', icon: `<path d="M4 11v2h8v-2H4zm15.71-4.71L12 14.01V22h2v-7.5l7.71-7.71c.39-.39.39-1.02 0-1.41l-2.59-2.59c-.39-.39-1.02-.39-1.41 0zM12 2l-3.03 3.03L12 8.06l3.03-3.03L12 2z"/>`},
        { num: 16, title: 'Hit Them Where It Hurts: The Center-of-Gravity Strategy', desc: 'Every enemy has a source of strength. Identify and neutralize it, and the entire structure will collapse.', example: 'The Allied focus on destroying Germany’s oil production in WWII crippled its war machine at its core.', icon: `<path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>`},
        { num: 17, title: 'Defeat Them in Detail: The Divide-and-Conquer Strategy', desc: 'Never face a united enemy. Create divisions and attack them one by one.', example: 'Julius Caesar conquered Gaul by exploiting rivalries between Gallic tribes, preventing them from forming a unified front.', icon: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/>`},
        { num: 18, title: 'Expose and Attack Their Soft Flank: The Unconventional-Warfare Strategy', desc: 'Attack from unexpected angles. People protect their front, not their sides.', example: 'Hannibal’s crossing of the Alps to attack Rome was a move so audacious the Romans never anticipated it.', icon: `<path d="M21 9c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 3.14 1.62 5.89 4 7.49V19c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2.51c2.38-1.6 4-4.35 4-7.49zm-9-7c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7z"/>`},
        { num: 19, title: 'Envelop the Enemy: The Annihilation Strategy', desc: 'Create a multi-front attack that surrounds your opponent, cutting off their escape and support.', example: 'The Battle of Cannae is a textbook example where Hannibal’s smaller army completely encircled and destroyed a larger Roman force.', icon: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM8 11h8v2H8v-2z"/>`},
        { num: 20, title: 'Maneuver Them into Weakness: The Ripening-for-the-Sickle Strategy', desc: 'Don’t attack prematurely. Position yourself and manipulate events until victory is guaranteed.', example: 'Fabius Maximus’s strategy against Hannibal involved avoiding direct battle, harassing him to gradually wear down his army.', icon: `<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>`},
        { num: 21, title: 'Negotiate While Advancing: The Diplomatic-War Strategy', desc: 'Maintain pressure while negotiating. A position of strength yields the best terms.', example: 'The Cuban Missile Crisis was resolved when JFK combined a naval blockade (advancing) with secret negotiations (diplomacy).', icon: `<path d="M21 11.01L3 11v2h18zM3 16h18v2H3zM21 6H3v2.01L21 8z"/>`},
        { num: 22, title: 'Know How to End Things: The Exit Strategy', desc: 'A victory is not a victory if you cannot consolidate it. Plan your exit before you enter the conflict.', example: 'The lack of a clear exit strategy in the Vietnam and Iraq wars led to prolonged conflicts with devastating consequences.', icon: `<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>`},
        { num: 23, title: 'Weave a Seamless Blend of Fact and Fiction: The Misperception Strategy', desc: 'Control what your enemy sees. A lie is most effective when it is wrapped in a layer of truth.', example: 'During WWII, the Allies created a phantom army (Operation Fortitude) to deceive the Germans about the D-Day landing location.', icon: `<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>`},
        { num: 24, title: 'Take the Line of Least Expectation: The Ordinary-Extraordinary Strategy', desc: 'Adopt a simple, conventional front to hide your brilliant, unconventional maneuvers.', example: 'Steve Jobs presented the iPod as just a "1,000 songs in your pocket," an ordinary idea that hid the extraordinary disruption of the music industry.', icon: `<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>`},
        { num: 25, title: 'Occupy the Moral High Ground: The Righteousness Strategy', desc: 'Frame your cause as just and noble. Moral superiority is a powerful weapon for rallying support.', example: 'Martin Luther King Jr. masterfully occupied the moral high ground, framing the Civil Rights Movement as a fight for American ideals.', icon: `<path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>`},
        { num: 26, title: 'Deny Them Targets: The Strategy of the Void', desc: 'Make yourself invisible and unreadable. An enemy cannot attack what it cannot locate.', example: 'The elusive nature of groups like Al-Qaeda denies conventional armies a clear target, making them difficult to fight.', icon: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" opacity=".3"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.4-.38L12 6.1l1.68 4.04 4.4.38-3.32 2.88 1 4.28L12 15.4z"/>`},
        { num: 27, title: 'Seem to Work for the Interests of Others While Furthering Your Own: The Alliance Strategy', desc: 'Create alliances where your partners do most of the work while you reap the rewards.', example: 'Otto von Bismarck engineered wars where Prussia seemed to be aiding other German states, while actually using them to unify Germany under his control.', icon: `<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>`},
        { num: 28, title: 'Give Your Rivals Enough Rope to Hang Themselves: The One-Upmanship Strategy', desc: 'Do not stop your opponents from making mistakes. Sometimes the best move is no move at all.', example: 'In the "Rumble in the Jungle," Muhammad Ali let George Foreman exhaust himself with punches (rope-a-dope) before knocking him out.', icon: `<path d="M6.54 5c.06-.89.21-1.76.45-2.59l-1.2-1.2c-.41-.41-1.09-.41-1.5 0l-.88.88c-.41.41-.41 1.09 0 1.5l1.2 1.2C4.78 5.21 5.65 5.06 6.54 5zM4 9.04l-1.2 1.2c-.41.41-.41 1.09 0 1.5l.88.88c.41.41 1.09.41 1.5 0l1.2-1.2C6.06 10.79 5.91 9.92 5.85 9.04H4z"/>`},
        { num: 29, title: 'Take Small Bites: The Fait Accompli Strategy', desc: 'Advance incrementally. By the time your opponents realize your ambition, it’s already too late.', example: 'China’s gradual expansion in the South China Sea through island-building presents the world with established facts that are hard to reverse.', icon: `<path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>`},
        { num: 30, title: 'Penetrate Their Minds: The Communication Strategy', desc: 'Infiltrate your rivals’ thinking. Shape their perceptions with carefully crafted messages.', example: 'Propaganda, from wartime posters to modern social media campaigns, is designed to influence enemy morale and public opinion.', icon: `<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>`},
        { num: 31, title: 'Destroy from Within: The Inner-Front Strategy', desc: 'Exploit internal divisions in the enemy camp. An enemy fighting itself cannot fight you.', example: 'The British supported Lawrence of Arabia to foment an Arab revolt against the Ottoman Empire, weakening it from within during WWI.', icon: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>`},
        { num: 32, title: 'Dominate While Seeming to Submit: The Passive-Aggression Strategy', desc: 'Appear to comply while subtly undermining your opponent’s authority and progress.', example: 'Mahatma Gandhi’s campaign of nonviolent civil disobedience appeared passive but was a powerful tool that paralyzed British rule in India.', icon: `<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 14h-2v-4H9V7h2v4h2v6zm-4-8h2V7H9v2z"/>`},
        { num: 33, title: 'Sow Uncertainty and Panic: The Chain-Reaction Strategy', desc: 'Create an unpredictable and terrifying situation that causes your enemy to collapse from fear.', example: 'The 9/11 attacks were designed not just for physical destruction but to create a chain reaction of fear and overreaction in the West- by the west itself!', icon: `<path d="M2 22h20V2L2 22zm18-2H6.83L20 6.83V20z"/>`}
    ];

    // --- Core Functions ---

    /**
     * Toggles the theme between light and dark mode.
     * Saves the preference to localStorage.
     */
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }

    /**
     * Initializes the theme based on user preference or system settings.
     */
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
        }
    }

    /**
     * Toggles the mobile navigation menu.
     */
    function toggleMobileMenu() {
        document.body.classList.toggle('nav-open');
    }

    /**
     * Dynamically creates and renders all strategy cards.
     */
    function renderStrategies() {
        strategies.forEach((strategy, index) => {
            const card = document.createElement('div');
            card.className = 'strategy-card animate-on-scroll';
            card.style.setProperty('--card-index', index);

            card.innerHTML = `
                <div class="card-header">
                    <span class="strategy-number">${strategy.num}</span>
                    <h3 class="strategy-title">${strategy.title}</h3>
                    <div class="visual-metaphor">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${strategy.icon}</svg>
                    </div>
                </div>
                <div class="card-content">
                    <p class="strategy-description">${strategy.desc}</p>
                </div>
                <div class="card-details">
                    <h4>Historical Example:</h4>
                    <p>${strategy.example}</p>
                </div>
            `;
            
            card.addEventListener('click', () => card.classList.toggle('is-expanded'));
            grid.appendChild(card);
        });
    }

    // --- Observers ---

    // Observer for fade-in animations on scroll
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observer for active navigation link highlighting
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    // --- Event Listeners & Initialization ---

    document.addEventListener('DOMContentLoaded', () => {
        // Initialize theme
        initializeTheme();

        // Render strategy cards and prepare them for animation
        renderStrategies();
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => scrollObserver.observe(el));
        
        // Observe sections for active nav link highlighting
        sections.forEach(section => navObserver.observe(section));

        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);
        
        // Mobile menu toggle
        menuToggle.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (document.body.classList.contains('nav-open')) {
                    toggleMobileMenu();
                }
            });
        });

        // Sticky header
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    });

})();
// --- Custom Cursor Clock (Final Corrected Version) ---

const cursorClock = document.getElementById('cursor-clock');
const hourHand = cursorClock.querySelector('.hour-hand');
const minuteHand = cursorClock.querySelector('.minute-hand');
const secondHand = cursorClock.querySelector('.second-hand');

// 1. Function to move the clock with the cursor
window.addEventListener('mousemove', e => {
    // We use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
        cursorClock.style.left = `${e.clientX}px`;
        cursorClock.style.top = `${e.clientY}px`;
    });
});

// 2. Function to update the clock hands with corrected rotation
function setClockHands() {
    const now = new Date();

    const seconds = now.getSeconds();
    // The "+ 90" offset has been removed for the correct orientation.
    const secondsDegrees = ((seconds / 60) * 360);
    secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    // The "+ 90" offset has been removed.
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6);
    minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;

    const hours = now.getHours();
    const hoursForClock = hours % 12 || 12;
    // The "+ 90" offset has been removed.
    const hoursDegrees = ((hoursForClock / 12) * 360) + ((minutes / 60) * 30);
    hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;
}

// 3. Update the clock every second
setInterval(setClockHands, 1000);

// Set the hands immediately on load
setClockHands();