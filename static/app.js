document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const sidebar = document.getElementById('sidebar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const newChatBtn = document.getElementById('new-chat-btn');
    const newChatIconBtn = document.getElementById('new-chat-icon-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const suggestionChips = document.querySelectorAll('.chip');
    
    // Gamification & Export Elements
    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const exportChatBtn = document.getElementById('export-chat-btn');
    const userLevelDisp = document.getElementById('user-level-disp');
    const userXpDisp = document.getElementById('user-xp-disp');
    const userStreakDisp = document.getElementById('user-streak-disp');
    
    // Settings Elements
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const langSelect = document.getElementById('lang-select');
    const themeSelect = document.getElementById('theme-select');
    const modelSelect = document.getElementById('model-select');
    const headerBadgeText = document.getElementById('header-badge-text');
    const desktopSidebarToggle = document.getElementById('desktop-sidebar-toggle');

    const learningContainer = document.getElementById('learning-paths-container');
    const inputContainer = document.getElementById('input-container');
    const lpTabs = document.querySelectorAll('.lp-tab');
    const lpLevelTabs = document.querySelectorAll('.lp-level-tab');
    const lpContent = document.getElementById('lp-content');
    const lpProgressCount = document.getElementById('lp-progress-count');
    const lpProgressPercent = document.getElementById('lp-progress-percent');
    const lpProgressFill = document.getElementById('lp-progress-fill');
    const pinnedSection = document.getElementById('pinned-section');
    const recentsSection = document.getElementById('recents-section');
    const pinnedList = document.getElementById('pinned-list');
    const recentsList = document.getElementById('recents-list');

    // i18n Dictionary
    const i18n = {
        'english': {
            'brand_tag': 'Your offline AI teacher',
            'welcome_title': 'Chat with Apex',
            'chip_cyber_1': 'How do I make my password secure?',
            'chip_cyber_2': 'What are phishing messages?',
            'chip_cyber_3': 'What is the risk of using public WiFi?',
            'chip_ai_1': 'What is Artificial Intelligence?',
            'chip_ai_2': 'How to spot a Deepfake?',
            'chip_ai_3': 'How to use ChatGPT effectively?',
            'chip_programming_1': 'How do I start learning programming?',
            'chip_programming_2': 'What is a loop in Python?',
            'chip_programming_3': 'What to do if my code has an error?',
            'placeholder': 'Type your message here...',
            'quiz_placeholder': 'Quiz mode (use buttons)',
            'scenario_placeholder': 'Practice mode (use buttons)',
            'ai_welcome': "Hi! I am Apex, your cybersecurity teacher. Feel free to ask me anything about online safety.",
            'ai_quiz_start': "Let's start a quick quiz! I'll ask 5 questions. Ready?",
            'ai_scenario_start': "I will give you a real-life scenario, let's see what you do.",
            'quiz_load_err': "Could not load quiz. Please try again.",
            'net_err': "Network error.",
            'quiz_complete': "Quiz completed! Your score:",
            'btn_correct': "Correct!",
            'btn_wrong': "Wrong!",
            'scenario_load_err': "Could not load scenarios.",
            'another_scenario': "Would you like to try another scenario?",
            'yes_scenario': "Yes, another one",
            'untitled': "New Chat",
            'daily_placeholder': 'Daily Challenge',
            'ai_daily_start': "Welcome to the Daily Challenge! Answer correctly for +20 XP.",
            'daily_done': "You've already completed today's challenge. Come back tomorrow!"
        },
        'roman-urdu': {
            'brand_tag': 'Aapka offline AI teacher',
            'welcome_title': 'Apex se baat karein',
            'chip_cyber_1': 'Mera password mehfooz kaise banau?',
            'chip_cyber_2': 'Phishing messages kya hote hain?',
            'chip_cyber_3': 'Public WiFi use karne ka khatra kya hai?',
            'chip_ai_1': 'AI kya hai?',
            'chip_ai_2': 'Deepfake video kaise pehchanu?',
            'chip_ai_3': 'ChatGPT ka sahi istemal kaise karun?',
            'chip_programming_1': 'Programming kahan se seekhna shuru karun?',
            'chip_programming_2': 'Python mein loop kya hota hai?',
            'chip_programming_3': 'Code mein error aaye to kya karun?',
            'placeholder': 'Yahan apna sawal likhein...',
            'quiz_placeholder': 'Quiz mode (options use karein)',
            'scenario_placeholder': 'Practice mode (options use karein)',
            'ai_welcome': "Salam! Main Apex hoon, aapka cybersecurity teacher. Aap cyber hifazat ke baray mein mujh se koi bhi sawal pooch sakte hain.",
            'ai_quiz_start': "Chaliye ek chota sa quiz shuru karte hain! Main aapse 5 sawal poochunga. Tyar hain?",
            'ai_scenario_start': "Main aapko ek asal zindagi ka scenario deta hoon, dekhte hain aap kya karte hain.",
            'quiz_load_err': "Quiz load nahi ho saka. Dobara koshish karein.",
            'net_err': "Network error. Server se rabta nahi ho saka.",
            'quiz_complete': "Quiz mukammal hua! Aapka score:",
            'btn_correct': "Bilkul Sahi!",
            'btn_wrong': "Ghalat Jawab!",
            'scenario_load_err': "Scenarios load nahi ho sake.",
            'another_scenario': "Ek aur scenario try karna chahenge?",
            'yes_scenario': "Haan, ek aur scenario dein",
            'untitled': "New Chat",
            'daily_placeholder': 'Daily Challenge',
            'ai_daily_start': "Daily Challenge mein khush amdeed! Sahi jawab par +20 XP milenge.",
            'daily_done': "Aap aaj ka challenge mukammal kar chuke hain. Kal phir aana!"
        },
        'urdu': {
            'brand_tag': 'آپ کا آف لائن AI ٹیچر',
            'welcome_title': 'ایپکس سے بات کریں',
            'chip_cyber_1': 'میں اپنا پاس ورڈ کیسے محفوظ بناؤں؟',
            'chip_cyber_2': 'فشنگ پیغامات کیا ہوتے ہیں؟',
            'chip_cyber_3': 'پبلک وائی فائی استعمال کرنے کا کیا خطرہ ہے؟',
            'chip_ai_1': 'اے آئی کیا ہے؟',
            'chip_ai_2': 'ڈیپ فیک ویڈیو کیسے پہچانوں؟',
            'chip_ai_3': 'چیٹ جی پی ٹی کا صحیح استعمال کیسے کروں؟',
            'chip_programming_1': 'پروگرامنگ سیکھنا کہاں سے شروع کروں؟',
            'chip_programming_2': 'پائتھون میں لوپ کیا ہوتا ہے؟',
            'chip_programming_3': 'کوڈ میں ایرر آئے تو کیا کروں؟',
            'placeholder': 'یہاں اپنا سوال لکھیں...',
            'quiz_placeholder': 'کوئز موڈ (بٹنز استعمال کریں)',
            'scenario_placeholder': 'پریکٹس موڈ (بٹنز استعمال کریں)',
            'ai_welcome': "سلام! میں ایپکس ہوں، آپ کا سائبر سیکیورٹی ٹیچر۔ آپ مجھ سے آن لائن حفاظت کے بارے میں کچھ بھی پوچھ سکتے ہیں۔",
            'ai_quiz_start': "چلیں ایک چھوٹا سا کوئز شروع کرتے ہیں! میں 5 سوالات پوچھوں گا۔ تیار ہیں؟",
            'ai_scenario_start': "میں آپ کو ایک حقیقی زندگی کی صورتحال دوں گا، دیکھتے ہیں آپ کیا کرتے ہیں۔",
            'quiz_load_err': "کوئز لوڈ نہیں ہو سکا۔ دوبارہ کوشش کریں۔",
            'net_err': "نیٹ ورک کا مسئلہ۔ سرور سے رابطہ نہیں ہو سکا۔",
            'quiz_complete': "کوئز مکمل ہوا! آپ کا اسکور:",
            'btn_correct': "بالکل صحیح!",
            'btn_wrong': "غلط جواب!",
            'scenario_load_err': "سیناریو لوڈ نہیں ہو سکے۔",
            'another_scenario': "کیا آپ ایک اور سیناریو آزمانا چاہیں گے؟",
            'yes_scenario': "جی ہاں، ایک اور",
            'untitled': "New Chat",
            'daily_placeholder': 'Daily Challenge',
            'ai_daily_start': "ڈیلی چیلنج میں خوش آمدید! صحیح جواب پر +20 XP ملیں گے۔",
            'daily_done': "آپ آج کا چیلنج مکمل کر چکے ہیں۔ کل پھر آنا!"
        }
    };

    // Global App State
    let currentMode = 'chat'; 
    let isProcessing = false;
    let currentLang = localStorage.getItem('aegis_lang') || 'roman-urdu';
    let currentTheme = localStorage.getItem('aegis_theme') || 'system';
    let currentModel = localStorage.getItem('aegis_model') || 'gemma2:2b';
    let installedModelsList = [];
    
    // Gamification State
    let userXp = parseInt(localStorage.getItem('aegis_xp')) || 0;
    let userStreak = parseInt(localStorage.getItem('aegis_streak')) || 0;
    let lastActive = localStorage.getItem('aegis_last_active') || '';
    let currentSubject = localStorage.getItem('aegis_subject') || 'cybersecurity';
    
    function initGamification() {
        const today = new Date().toISOString().split('T')[0];
        if (lastActive) {
            const lastDate = new Date(lastActive);
            const todayDate = new Date(today);
            const diffTime = Math.abs(todayDate - lastDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 1) {
                userStreak = 0;
                localStorage.setItem('aegis_streak', userStreak);
            }
        }
        renderStats();
    }
    
    function updateStats(xpGain) {
        userXp += xpGain;
        localStorage.setItem('aegis_xp', userXp);
        
        const today = new Date().toISOString().split('T')[0];
        if (lastActive !== today) {
            if (lastActive) {
                const lastDate = new Date(lastActive);
                const todayDate = new Date(today);
                const diffTime = Math.abs(todayDate - lastDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    userStreak++;
                } else {
                    userStreak = 1;
                }
            } else {
                userStreak = 1;
            }
            lastActive = today;
            localStorage.setItem('aegis_last_active', lastActive);
            localStorage.setItem('aegis_streak', userStreak);
        }
        
        renderStats();
    }
    
    function renderStats() {
        const level = Math.floor(userXp / 100) + 1;
        if(userLevelDisp) userLevelDisp.textContent = `Lvl ${level}`;
        if(userXpDisp) userXpDisp.textContent = `${userXp} XP`;
        if(userStreakDisp) userStreakDisp.textContent = userStreak;
    }
    
    // Learning Paths State
    let learningPathsData = null;
    let currentLevel = 'beginner';
    let completedTopics = JSON.parse(localStorage.getItem('aegis_completed_topics')) || [];
    let allSessions = JSON.parse(localStorage.getItem('aegis_sessions')) || [];
    allSessions = allSessions.filter(s => s.messages && s.messages.length > 0);
    localStorage.setItem('aegis_sessions', JSON.stringify(allSessions));
    let currentSessionId = null;
    
    // Quiz/Scenario temp state
    let quizData = [];
    let currentQIndex = 0;
    let quizScore = 0;
    let scenariosList = [];
    let typingIndicatorRow = null;

    function saveSessions() {
        localStorage.setItem('aegis_sessions', JSON.stringify(allSessions));
        renderSidebarHistory();
    }

    function createNewSession(mode = 'chat') {
        const sessionId = Date.now().toString();
        const newSession = {
            id: sessionId,
            title: i18n[currentLang]['untitled'],
            mode: mode,
            pinned: false,
            timestamp: Date.now(),
            messages: []
        };
        allSessions.push(newSession);
        currentSessionId = sessionId;
        saveSessions();
        return newSession;
    }

    function getCurrentSession() {
        if (!currentSessionId) return null;
        return allSessions.find(s => s.id === currentSessionId);
    }

    function generateTitle(text) {
        if (!text) return i18n[currentLang]['untitled'];
        return text.substring(0, 40) + (text.length > 40 ? '...' : '');
    }

    // --- Settings (Theme & Lang) ---
    function applyTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('aegis_theme', theme);
        document.body.setAttribute('data-theme', theme);
        
        // Update Select UI
        const themeDropdown = document.getElementById('theme-dropdown');
        if (themeDropdown) {
            themeDropdown.querySelectorAll('.custom-dropdown-item').forEach(i => i.classList.remove('selected'));
            const selectedItem = themeDropdown.querySelector(`.custom-dropdown-item[data-value="${theme}"]`);
            if (selectedItem) {
                selectedItem.classList.add('selected');
                document.getElementById('theme-display').textContent = selectedItem.textContent;
            }
        }
    }
    applyTheme(currentTheme);

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('aegis_lang', lang);
        
        // Update Select UI
        const langDropdown = document.getElementById('lang-dropdown');
        if (langDropdown) {
            langDropdown.querySelectorAll('.custom-dropdown-item').forEach(i => i.classList.remove('selected'));
            const selectedItem = langDropdown.querySelector(`.custom-dropdown-item[data-value="${lang}"]`);
            if (selectedItem) {
                selectedItem.classList.add('selected');
                document.getElementById('lang-display').textContent = selectedItem.textContent;
            }
        }

        // Translate Dynamic Content
        const dict = i18n[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) el.setAttribute('placeholder', dict[key]);
        });
        
        if (lang === 'urdu') {
            document.body.style.direction = 'rtl';
            chatInput.style.direction = 'rtl';
            sidebar.style.borderRight = 'none';
            sidebar.style.borderLeft = '1px solid var(--border-color)';
        } else {
            document.body.style.direction = 'ltr';
            chatInput.style.direction = 'ltr';
            sidebar.style.borderLeft = 'none';
            sidebar.style.borderRight = '1px solid var(--border-color)';
        }
        
        renderSidebarHistory();
    }
    
    // --- Subject Logic ---
    const subjectPills = document.querySelectorAll('.subject-pill');
    function applySubject(subject) {
        currentSubject = subject;
        localStorage.setItem('aegis_subject', subject);
        
        if (subjectPills) {
            subjectPills.forEach(p => {
                if (p.getAttribute('data-subject') === subject) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
        }

        // Update chips translations
        if (suggestionChips.length >= 3) {
            suggestionChips[0].setAttribute('data-i18n', `chip_${subject}_1`);
            suggestionChips[1].setAttribute('data-i18n', `chip_${subject}_2`);
            suggestionChips[2].setAttribute('data-i18n', `chip_${subject}_3`);
        }
        
        applyLanguage(currentLang); // Re-render translations
        
        // Update learning paths if active
        const activeTab = document.querySelector(`.lp-tab[data-subject="${subject}"]`);
        if (activeTab) activeTab.click();
    }

    if (subjectPills) {
        subjectPills.forEach(p => {
            p.addEventListener('click', () => {
                applySubject(p.getAttribute('data-subject'));
                // Restart current session context
                startNewSession(currentMode);
            });
        });
    }

    applyLanguage(currentLang);
    applySubject(currentSubject);

    // Fetch and populate models
    async function fetchModels() {
        try {
            const res = await fetch('/api/models');
            const data = await res.json();
            if (data.models && data.models.length > 0 && modelSelect) {
                modelSelect.innerHTML = '';
                installedModelsList = data.models.filter(m => m.installed).map(m => m.name);
                
                data.models.forEach(m => {
                    const opt = document.createElement('option');
                    opt.value = m.name;
                    opt.textContent = m.name + (m.installed ? '' : ' (Not installed)');
                    if (m.name === 'mistral:7b' && !m.installed) {
                         opt.textContent += ' - 4GB+ PC req';
                    }
                    modelSelect.appendChild(opt);
                });
                
                if (installedModelsList.includes(currentModel)) {
                    modelSelect.value = currentModel;
                } else if (installedModelsList.includes('gemma2:2b')) {
                    currentModel = 'gemma2:2b';
                    modelSelect.value = currentModel;
                    localStorage.setItem('aegis_model', currentModel);
                } else if (installedModelsList.length > 0) {
                    currentModel = installedModelsList[0];
                    modelSelect.value = currentModel;
                    localStorage.setItem('aegis_model', currentModel);
                } else {
                    currentModel = 'gemma2:2b';
                    modelSelect.value = currentModel;
                }
                updateHeaderBadge();
            }
        } catch (err) {
            console.error("Failed to fetch models", err);
        }
    }
    fetchModels();

    function updateHeaderBadge() {
        if (headerBadgeText) {
            headerBadgeText.textContent = `${currentModel} • Offline`;
        }
    }
    updateHeaderBadge();

    if (modelSelect) {
        modelSelect.addEventListener('change', (e) => {
            const selectedModel = e.target.value;
            if (installedModelsList.length > 0 && !installedModelsList.includes(selectedModel)) {
                if (currentMode !== 'chat') {
                    startNewSession('chat');
                }
                addMessage(`Ye model install nahi hai. Terminal mein ye command chalao:\n\nollama pull ${selectedModel}\n\nPhir page refresh karo.`, 'ai', false, null, true);
                e.target.value = currentModel;
            } else {
                currentModel = selectedModel;
                localStorage.setItem('aegis_model', currentModel);
                updateHeaderBadge();
            }
        });
    }

    // Settings Modal Event Listeners
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.remove('hidden');
        });
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            settingsModal.classList.add('hidden');
        });
    }
    
    // Close modal on clicking outside
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.add('hidden');
            }
        });

        // Tab Switching Logic
        const navItems = settingsModal.querySelectorAll('.modal-nav-item');
        const pages = settingsModal.querySelectorAll('.settings-page');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.getAttribute('data-target');
                if (!targetId) return;

                // Remove active class from all tabs and hide all pages
                navItems.forEach(n => n.classList.remove('active'));
                pages.forEach(p => {
                    p.classList.add('hidden');
                    p.classList.remove('active');
                });

                // Add active class to clicked tab and show target page
                item.classList.add('active');
                const targetPage = document.getElementById(targetId);
                if (targetPage) {
                    targetPage.classList.remove('hidden');
                    targetPage.classList.add('active');
                }
            });
        });
    }

    // Custom Dropdown Logic
    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        const header = dropdown.querySelector('.custom-dropdown-header');
        header.addEventListener('click', (e) => {
            document.querySelectorAll('.custom-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
            e.stopPropagation();
        });
        
        dropdown.querySelectorAll('.custom-dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                dropdown.querySelectorAll('.custom-dropdown-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                dropdown.querySelector('.custom-dropdown-value').textContent = item.textContent;
                dropdown.classList.remove('open');
                e.stopPropagation();
                
                const val = item.getAttribute('data-value');
                if (dropdown.id === 'theme-dropdown') applyTheme(val);
                if (dropdown.id === 'lang-dropdown') applyLanguage(val);
            });
        });
    });
    
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
    });

    // Mobile & Sidebar Toggle
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
    
    if (desktopSidebarToggle) {
        desktopSidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            startNewSession('chat');
        });
    }

    // Input Handling
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            sendBtn.disabled = this.value.trim().length === 0 || isProcessing;
        });

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!sendBtn.disabled) handleSend();
            }
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            if (!sendBtn.disabled) handleSend();
        });
    }

    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.textContent;
            chatInput.style.height = 'auto';
            sendBtn.disabled = false;
            handleSend();
        });
    });

    if (searchBtn && searchContainer && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchContainer.classList.toggle('hidden');
            if (!searchContainer.classList.contains('hidden')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
                renderSidebarHistory();
            }
        });
        
        searchInput.addEventListener('input', (e) => {
            renderSidebarHistory(e.target.value);
        });
    }

    // --- History Rendering ---
    function renderSidebarHistory(query = "") {
        if (!pinnedList || !recentsList) return;

        pinnedList.innerHTML = '';
        recentsList.innerHTML = '';
        
        let pinnedCount = 0;
        let recentCount = 0;

        let sorted = [...allSessions].sort((a,b) => b.timestamp - a.timestamp);
        
        if (query) {
            const lowerQ = query.toLowerCase();
            sorted = sorted.filter(session => session.title.toLowerCase().includes(lowerQ));
        }
        
        sorted.forEach(session => {
            if (!session.messages || session.messages.length === 0) return;
            if (!session.messages.some(m => m.sender === 'user')) return;
            
            const btn = document.createElement('button');
            btn.className = `history-item ${session.id === currentSessionId ? 'active' : ''}`;
            
            const titleSpan = document.createElement('span');
            titleSpan.className = 'history-item-title';
            titleSpan.textContent = session.title;
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'history-item-actions';
            
            const pinBtn = document.createElement('span');
            pinBtn.className = 'history-action-btn';
            pinBtn.innerHTML = session.pinned 
                ? '<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="1.75" fill="none"><path d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"></path></svg>'
                : '<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="1.75" fill="none"><path d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"></path></svg>'; 
            pinBtn.title = session.pinned ? 'Unpin' : 'Pin';
            pinBtn.onclick = (e) => {
                e.stopPropagation();
                session.pinned = !session.pinned;
                saveSessions();
            };

            const delBtn = document.createElement('span');
            delBtn.className = 'history-action-btn';
            delBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="1.75" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
            delBtn.title = 'Delete';
            delBtn.onclick = (e) => {
                e.stopPropagation();
                allSessions = allSessions.filter(s => s.id !== session.id);
                if (currentSessionId === session.id) {
                    startNewSession('chat');
                } else {
                    saveSessions();
                }
            };

            actionsDiv.appendChild(pinBtn);
            actionsDiv.appendChild(delBtn);

            btn.appendChild(titleSpan);
            btn.appendChild(actionsDiv);

            btn.onclick = () => loadSession(session.id);

            if (session.pinned) {
                pinnedList.appendChild(btn);
                pinnedCount++;
            } else {
                recentsList.appendChild(btn);
                recentCount++;
            }
        });

        if (pinnedCount > 0) {
            pinnedSection.classList.remove('hidden');
        } else {
            pinnedSection.classList.add('hidden');
        }
        
        if (recentCount === 0 && pinnedCount === 0) {
            recentsSection.classList.add('hidden');
        } else {
            recentsSection.classList.remove('hidden');
        }
    }

    // --- Rendering Messages ---
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    async function copyText(text) {
        try { await navigator.clipboard.writeText(text); } catch (err) {}
    }

    function appendMessageDOM(msg) {
        if(welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
            welcomeScreen.classList.add('hidden');
        }

        const row = document.createElement('div');
        row.className = `message-row ${msg.sender}`;
        
        if (msg.sender === 'user') {
            const bubble = document.createElement('div');
            bubble.className = 'user-message';
            bubble.textContent = msg.text;
            row.appendChild(bubble);
        } else {
            const avatar = document.createElement('div');
            avatar.className = 'ai-avatar';
            avatar.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 22h20L12 2z"></path><path d="M12 12l4 10"></path></svg>';
            
            const msgContent = document.createElement('div');
            msgContent.className = 'ai-message';
            if (msg.isHtml) msgContent.innerHTML = msg.text;
            else msgContent.textContent = msg.text;
            
            row.appendChild(avatar);
            row.appendChild(msgContent);

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.title = 'Copy';
            copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
            copyBtn.onclick = () => copyText(msg.plain || msg.text);
            row.appendChild(copyBtn);
        }
        
        chatContainer.appendChild(row);
        scrollToBottom();
        return row;
    }

    function addMessage(text, sender = 'user', isHtml = false, plainTextForCopy = null, skipSave = false) {
        const msgObj = { sender, text, isHtml, plain: plainTextForCopy };
        
        const session = getCurrentSession();
        if (session && !skipSave) {
            session.messages.push(msgObj);
            
            // Auto generate title on first user msg
            if (sender === 'user' && session.title === i18n[currentLang]['untitled']) {
                session.title = generateTitle(text);
            }
            saveSessions();
        }

        return appendMessageDOM(msgObj);
    }

    // Loading indicator
    function showTypingIndicator() {
        if (typingIndicatorRow) return;
        if(welcomeScreen) welcomeScreen.classList.add('hidden');
        typingIndicatorRow = document.createElement('div');
        typingIndicatorRow.className = `message-row ai`;
        
        const avatar = document.createElement('div');
        avatar.className = 'ai-avatar';
        avatar.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 22h20L12 2z"></path><path d="M12 12l4 10"></path></svg>';
        const msgContent = document.createElement('div');
        msgContent.className = 'ai-message';
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        msgContent.appendChild(indicator);
        typingIndicatorRow.appendChild(avatar);
        typingIndicatorRow.appendChild(msgContent);
        
        chatContainer.appendChild(typingIndicatorRow);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        if (typingIndicatorRow) {
            typingIndicatorRow.remove();
            typingIndicatorRow = null;
        }
    }

    function toggleLoading(show) {
        isProcessing = show;
        if (show) {
            showTypingIndicator();
            if (chatInput) chatInput.disabled = true;
            if (sendBtn) sendBtn.disabled = true;
        } else {
            hideTypingIndicator();
            if (chatInput) chatInput.disabled = currentMode !== 'chat'; 
            if (sendBtn) sendBtn.disabled = chatInput.value.trim().length === 0 || currentMode !== 'chat';
        }
    }

    // Loading a session
    function loadSession(id) {
        const session = allSessions.find(s => s.id === id);
        if (!session) return;
        
        currentSessionId = id;
        currentMode = session.mode;
        
        modeBtns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-mode="${currentMode}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Clear chat DOM
        Array.from(chatContainer.children).forEach(child => {
            if (child.id !== 'welcome-screen') child.remove();
        });

        if (session.messages.length === 0) {
            welcomeScreen.classList.remove('hidden');
        } else {
            welcomeScreen.classList.add('hidden');
            session.messages.forEach(msg => appendMessageDOM(msg));
        }

        if (chatInput) {
            if (currentMode === 'chat') {
                chatInput.disabled = false;
                chatInput.placeholder = i18n[currentLang]['placeholder'];
            } else {
                chatInput.disabled = true;
                chatInput.placeholder = i18n[currentLang][`${currentMode}_placeholder`];
            }
        }
        
        if (window.innerWidth <= 768 && sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
        renderSidebarHistory();
    }

    function startNewSession(mode = 'chat') {
        currentMode = mode;
        modeBtns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-mode="${mode}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Clear DOM
        Array.from(chatContainer.children).forEach(child => {
            if (child.id !== 'welcome-screen') child.remove();
        });
        
        createNewSession(mode);
        
        quizData = [];
        quizScore = 0;
        currentQIndex = 0;
        
        if (mode === 'learning') {
            chatContainer.classList.add('hidden');
            learningContainer.classList.remove('hidden');
            inputContainer.classList.add('hidden');
            if (!learningPathsData) fetchLearningPaths();
            else renderLearningPaths();
        } else {
            chatContainer.classList.remove('hidden');
            learningContainer.classList.add('hidden');
            inputContainer.classList.remove('hidden');
        }

        if (mode === 'chat') {
            if (chatInput) {
                chatInput.disabled = false;
                chatInput.placeholder = i18n[currentLang]['placeholder'];
                chatInput.value = '';
                chatInput.focus();
            }
            if (welcomeScreen) welcomeScreen.classList.remove('hidden');
        } 
        else if (mode === 'quiz') {
            if (chatInput) {
                chatInput.disabled = true;
                chatInput.placeholder = i18n[currentLang]['quiz_placeholder'];
                chatInput.value = '';
                chatInput.style.height = 'auto';
            }
            if (welcomeScreen) welcomeScreen.classList.add('hidden');
            addMessage(i18n[currentLang]['ai_quiz_start'], 'ai');
            fetchQuiz();
        }
        else if (mode === 'daily') {
            if (chatInput) {
                chatInput.disabled = true;
                chatInput.placeholder = i18n[currentLang]['daily_placeholder'];
                chatInput.value = '';
                chatInput.style.height = 'auto';
            }
            if (welcomeScreen) welcomeScreen.classList.add('hidden');
            
            const todayStr = new Date().toISOString().split('T')[0];
            const lastDaily = localStorage.getItem('aegis_last_daily');
            
            if (lastDaily === todayStr) {
                addMessage(i18n[currentLang]['daily_done'], 'ai');
            } else {
                addMessage(i18n[currentLang]['ai_daily_start'], 'ai');
                fetchDailyChallenge();
            }
        }
        else if (mode === 'scenario') {
            if (chatInput) {
                if (currentSubject === 'cybersecurity') {
                    chatInput.disabled = true;
                    chatInput.placeholder = i18n[currentLang]['scenario_placeholder'];
                } else {
                    chatInput.disabled = false;
                    chatInput.placeholder = i18n[currentLang]['placeholder'];
                }
                chatInput.value = '';
                chatInput.style.height = 'auto';
            }
            if (welcomeScreen) welcomeScreen.classList.add('hidden');
            fetchScenarios();
        }

        if (window.innerWidth <= 768 && sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    }

    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            if (!isProcessing) startNewSession('chat');
        });
    }
    if (newChatIconBtn) {
        newChatIconBtn.addEventListener('click', () => {
            if (!isProcessing) startNewSession('chat');
        });
    }

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isProcessing) return;
            startNewSession(btn.getAttribute('data-mode'));
        });
    });

    if (exportChatBtn) {
        exportChatBtn.addEventListener('click', () => {
            const session = getCurrentSession();
            if (!session || session.messages.length === 0) return;
            
            let textOutput = `Chat Export - ${session.title}\n\n`;
            session.messages.forEach(m => {
                const sender = m.sender === 'ai' ? 'Apex' : 'You';
                const text = m.plain || m.text.replace(/<[^>]*>?/gm, '');
                textOutput += `${sender}:\n${text}\n\n`;
            });
            
            const blob = new Blob([textOutput], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `aegis-chat-${session.id}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // --- Chat Logic ---
    async function handleSend(topic = null, internalPromptOverride = null) {
        if ((currentMode !== 'chat' && currentMode !== 'scenario') || (!chatInput && !topic && !internalPromptOverride)) return; 
        
        let text = "";
        let promptToSend = internalPromptOverride || "";
        
        if (!topic && !internalPromptOverride && chatInput) {
            text = chatInput.value.trim();
            if (!text) return;
            addMessage(text, 'user');
            chatInput.value = '';
            chatInput.style.height = 'auto';
            promptToSend = text;
            
            // Context injection for practice modes
            if (currentMode === 'scenario' && currentSubject !== 'cybersecurity') {
                const session = getCurrentSession();
                let lastAiMsg = "";
                if (session) {
                    for (let i = session.messages.length - 1; i >= 0; i--) {
                        if (session.messages[i].sender === 'ai') {
                            lastAiMsg = session.messages[i].plain || session.messages[i].text.replace(/<[^>]*>?/gm, '');
                            break;
                        }
                    }
                }
                if (currentSubject === 'programming') {
                    promptToSend = `Task: ${lastAiMsg}\n\nMy Answer: ${text}\n\nEvaluate my answer, tell me if it's correct/wrong and explain why. Keep it brief.`;
                } else if (currentSubject === 'ai') {
                    promptToSend = `Task: ${lastAiMsg}\n\nMy Prompt: ${text}\n\nScore my prompt out of 10 and provide a better version.`;
                }
            }
        }
        
        toggleLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: promptToSend, language: currentLang, model: currentModel, subject: currentSubject, lesson_topic: topic, stream: true })
            });

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let fullReply = "";
            let aiRow = null;
            let aiMsgDiv = null;
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, {stream: true});
                const lines = chunk.split('\n').filter(l => l.trim() !== '');
                
                for(let line of lines) {
                    try {
                        const parsed = JSON.parse(line);
                        if (parsed.message && parsed.message.content) {
                            if (!aiRow) {
                                hideTypingIndicator();
                                aiRow = appendMessageDOM({ sender: 'ai', text: '', isHtml: false });
                                aiMsgDiv = aiRow.querySelector('.ai-message');
                            }
                            fullReply += parsed.message.content;
                            aiMsgDiv.textContent = fullReply;
                            scrollToBottom();
                        }
                    } catch (e) {}
                }
            }
            
            if (!aiRow) {
                addMessage("Empty response from AI", 'ai');
            } else {
                // Save to session history
                const session = getCurrentSession();
                if (session) {
                    session.messages.push({ sender: 'ai', text: fullReply, isHtml: false, plain: fullReply });
                    saveSessions();
                }
                const copyBtn = aiRow.querySelector('.copy-btn');
                if (copyBtn) copyBtn.onclick = () => copyText(fullReply);
            }
        } catch (err) {
            addMessage(i18n[currentLang]['net_err'], 'ai');
        } finally {
            toggleLoading(false);
            if (chatInput && !topic) chatInput.focus();
        }
    }

    // --- Quiz Logic ---
    async function fetchQuiz() {
        toggleLoading(true);
        try {
            const res = await fetch(`/api/quiz/generate?language=${currentLang}&model=${encodeURIComponent(currentModel)}&subject=${currentSubject}`);
            const data = await res.json();
            
            if (data.quiz && data.quiz.length > 0) {
                quizData = data.quiz;
                currentQIndex = 0;
                quizScore = 0;
                showNextQuizQuestion();
            } else {
                addMessage(i18n[currentLang]['quiz_load_err'], 'ai');
            }
        } catch (err) {
            addMessage(i18n[currentLang]['net_err'], 'ai');
        } finally {
            toggleLoading(false);
        }
    }

    function showNextQuizQuestion() {
        if (currentQIndex >= quizData.length || currentQIndex >= 5) {
            addMessage(`${i18n[currentLang]['quiz_complete']} ${quizScore} / 5.`, 'ai');
            return;
        }

        const q = quizData[currentQIndex];
        const prefix = currentLang === 'urdu' ? 'سوال' : 'Sawal';
        const text = `${prefix} ${currentQIndex + 1}/5: ${q.question}`;
        
        const aiRow = addMessage(text, 'ai');
        
        const aiMsgDiv = aiRow.querySelector('.ai-message');
        const optsDiv = document.createElement('div');
        optsDiv.className = 'options-wrapper';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = opt;
            btn.onclick = () => handleQuizAnswer(idx, btn, optsDiv, q);
            optsDiv.appendChild(btn);
        });

        aiMsgDiv.appendChild(optsDiv);
        scrollToBottom();
    }

    function handleQuizAnswer(selectedIndex, selectedBtn, optsDiv, q) {
        const buttons = optsDiv.querySelectorAll('button');
        buttons.forEach(b => b.disabled = true);
        
        addMessage(q.options[selectedIndex], 'user');
        showTypingIndicator();

        let isCorrect = selectedIndex === q.answer;
        if (isCorrect) {
            selectedBtn.classList.add('correct');
            quizScore++;
            updateStats(10);
        } else {
            selectedBtn.classList.add('wrong');
            if (buttons[q.answer]) buttons[q.answer].classList.add('correct');
        }

        setTimeout(() => {
            hideTypingIndicator();
            const correctText = i18n[currentLang]['btn_correct'];
            const wrongText = i18n[currentLang]['btn_wrong'];
            
            const feedbackHtml = `<b>${isCorrect ? correctText : wrongText}</b><br>${q.explanation}`;
            const feedbackPlain = `${isCorrect ? correctText : wrongText}\n${q.explanation}`;
            
            addMessage(feedbackHtml, 'ai', true, feedbackPlain);
            
            currentQIndex++;
            setTimeout(showNextQuizQuestion, 1500);
        }, 800);
    }

    // --- Daily Challenge Logic ---
    async function fetchDailyChallenge() {
        toggleLoading(true);
        try {
            const subjects = ['cybersecurity', 'ai', 'programming'];
            const todayEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
            const subject = subjects[todayEpoch % 3];
            
            const res = await fetch(`/api/quiz/generate?language=${currentLang}&model=${encodeURIComponent(currentModel)}&subject=${subject}&count=1`);
            const data = await res.json();
            
            if (data.quiz && data.quiz.length > 0) {
                showDailyChallenge(data.quiz[0]);
            } else {
                addMessage(i18n[currentLang]['quiz_load_err'], 'ai');
            }
        } catch (err) {
            addMessage(i18n[currentLang]['net_err'], 'ai');
        } finally {
            toggleLoading(false);
        }
    }

    function showDailyChallenge(q) {
        const prefix = currentLang === 'urdu' ? 'سوال' : 'Sawal';
        const text = `${prefix}: ${q.question}`;
        
        const aiRow = addMessage(text, 'ai');
        
        const aiMsgDiv = aiRow.querySelector('.ai-message');
        const optsDiv = document.createElement('div');
        optsDiv.className = 'options-wrapper';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = opt;
            btn.onclick = () => handleDailyAnswer(idx, btn, optsDiv, q);
            optsDiv.appendChild(btn);
        });

        aiMsgDiv.appendChild(optsDiv);
        scrollToBottom();
    }

    function handleDailyAnswer(selectedIndex, selectedBtn, optsDiv, q) {
        const buttons = optsDiv.querySelectorAll('button');
        buttons.forEach(b => b.disabled = true);
        
        addMessage(q.options[selectedIndex], 'user');
        showTypingIndicator();

        let isCorrect = selectedIndex === q.answer;
        if (isCorrect) {
            selectedBtn.classList.add('correct');
            updateStats(20);
        } else {
            selectedBtn.classList.add('wrong');
            if (buttons[q.answer]) buttons[q.answer].classList.add('correct');
        }

        const todayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem('aegis_last_daily', todayStr);

        setTimeout(() => {
            hideTypingIndicator();
            const correctText = i18n[currentLang]['btn_correct'];
            const wrongText = i18n[currentLang]['btn_wrong'];
            
            const feedbackHtml = `<b>${isCorrect ? correctText : wrongText}</b><br>${q.explanation}`;
            const feedbackPlain = `${isCorrect ? correctText : wrongText}\n${q.explanation}`;
            
            addMessage(feedbackHtml, 'ai', true, feedbackPlain);
            
            setTimeout(() => {
                addMessage(i18n[currentLang]['daily_done'], 'ai');
            }, 1000);
        }, 800);
    }

    // --- Scenario / Practice Logic ---
    async function fetchScenarios() {
        if (currentSubject === 'programming') {
            const prompt = currentLang === 'english' 
                ? "Give me a very short Python code with 1 syntax or logic bug. Ask me to find the bug. Include the code in a markdown block." 
                : "Mujhe ek aasan Python code do jisme 1 bug (ghalti) ho, taake main usay dhundun. Code block mein likhna.";
            handleSend(null, prompt);
            return;
        } else if (currentSubject === 'ai') {
            const prompt = currentLang === 'english' 
                ? "Give me a task to write an AI prompt for. Do not write the prompt yourself, just describe the task briefly." 
                : "Mujhe ek task do jiske liye main ek AI prompt likhun. Prompt khud mat likhna, sirf task dena.";
            handleSend(null, prompt);
            return;
        }

        // Cybersecurity existing logic
        addMessage(i18n[currentLang]['ai_scenario_start'], 'ai');
        toggleLoading(true);
        try {
            const res = await fetch('/api/scenarios');
            const data = await res.json();
            scenariosList = data.scenarios || [];
            
            if (scenariosList.length > 0) {
                showRandomScenario();
            } else {
                addMessage(i18n[currentLang]['scenario_load_err'], 'ai');
            }
        } catch (e) {
            addMessage(i18n[currentLang]['net_err'], 'ai');
        } finally {
            toggleLoading(false);
        }
    }

    function showRandomScenario() {
        const randIndex = Math.floor(Math.random() * scenariosList.length);
        const scenario = scenariosList[randIndex];
        
        const titleText = currentLang === 'urdu' ? 'منظر نامہ' : 'Scenario';
        const textHtml = `<b>${titleText}:</b><br>${scenario.situation}`;
        const textPlain = `${titleText}:\n${scenario.situation}`;
        
        const aiRow = addMessage(textHtml, 'ai', true, textPlain);
        
        const aiMsgDiv = aiRow.querySelector('.ai-message');
        const optsDiv = document.createElement('div');
        optsDiv.className = 'options-wrapper';

        scenario.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = opt;
            btn.onclick = () => handleScenarioChoice(opt, btn, optsDiv, scenario);
            optsDiv.appendChild(btn);
        });

        aiMsgDiv.appendChild(optsDiv);
        scrollToBottom();
    }

    async function handleScenarioChoice(choice, btn, optsDiv, scenario) {
        const buttons = optsDiv.querySelectorAll('button');
        buttons.forEach(b => b.disabled = true);
        btn.classList.add('selected');

        addMessage(choice, 'user');
        toggleLoading(true);

        try {
            const res = await fetch('/api/scenario/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    situation: scenario.situation,
                    choice: choice,
                    language: currentLang,
                    model: currentModel
                })
            });
            const data = await res.json();
            
            if (data.error) {
                addMessage("Error: " + data.error, 'ai');
            } else {
                addMessage(data.feedback, 'ai');
                
                setTimeout(() => {
                    const againRow = addMessage(i18n[currentLang]['another_scenario'], 'ai', false, null, true); 
                    const againOpts = document.createElement('div');
                    againOpts.className = 'options-wrapper';
                    
                    const yesBtn = document.createElement('button');
                    yesBtn.className = 'chat-option-btn';
                    yesBtn.textContent = i18n[currentLang]['yes_scenario'];
                    yesBtn.onclick = () => {
                        yesBtn.disabled = true;
                        showRandomScenario();
                    };
                    againOpts.appendChild(yesBtn);
                    
                    againRow.querySelector('.ai-message').appendChild(againOpts);
                    scrollToBottom();
                }, 2000);
            }
        } catch (e) {
            addMessage(i18n[currentLang]['net_err'], 'ai');
        } finally {
            toggleLoading(false);
        }
    }

    // --- Learning Paths Logic ---
    async function fetchLearningPaths() {
        try {
            const res = await fetch('/api/learning-paths');
            learningPathsData = await res.json();
            renderLearningPaths();
        } catch (e) {
            console.error("Failed to fetch learning paths", e);
        }
    }

    function updateLearningProgress() {
        if (!learningPathsData || !learningPathsData[currentSubject]) return;
        
        let total = 0;
        let completed = 0;
        
        const subjectData = learningPathsData[currentSubject];
        ['beginner', 'intermediate', 'advanced'].forEach(level => {
            if(subjectData[level]) {
                subjectData[level].forEach(t => {
                    total++;
                    if (completedTopics.includes(t.id)) completed++;
                });
            }
        });
        
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
        lpProgressCount.textContent = `${completed}/${total} topics complete`;
        lpProgressPercent.textContent = `${pct}%`;
        lpProgressFill.style.width = `${pct}%`;
        
        const getCertBtn = document.getElementById('get-cert-btn');
        if (getCertBtn) {
            if (total > 0 && completed === total) {
                getCertBtn.classList.remove('hidden');
            } else {
                getCertBtn.classList.add('hidden');
            }
        }
    }

    function renderLearningPaths() {
        if (!learningPathsData || !learningPathsData[currentSubject]) return;
        
        lpContent.innerHTML = '';
        const subjectData = learningPathsData[currentSubject];
        
        if(!subjectData[currentLevel] || subjectData[currentLevel].length === 0) return;
        
        const section = document.createElement('div');
        section.className = 'lp-section';
        
        let icon = '';
        if(currentLevel === 'beginner') icon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="#3b82f6" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
        if(currentLevel === 'intermediate') icon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="#f59e0b" stroke-width="2" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>';
        if(currentLevel === 'advanced') icon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="#ef4444" stroke-width="2" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>';
        
        let displayTitle = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);
        section.innerHTML = `<h3 class="lp-section-title">${icon} ${displayTitle}</h3>`;
        
        subjectData[currentLevel].forEach((topic, index) => {
            const isCompleted = completedTopics.includes(topic.id);
            const row = document.createElement('div');
            row.className = `lp-row ${isCompleted ? 'completed' : ''}`;
            
            row.innerHTML = `
                <div class="lp-num">${index + 1}</div>
                <div class="lp-info">
                    <div class="lp-topic-title">${topic.title}</div>
                    <div class="lp-topic-desc">${topic.desc}</div>
                </div>
                <div class="lp-actions">
                    <label class="lp-check">
                        <input type="checkbox" ${isCompleted ? 'checked' : ''} data-id="${topic.id}">
                        <span>Complete</span>
                    </label>
                    <button class="lp-start-btn" data-topic="${topic.title}">
                        Start
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            `;
            
            const chk = row.querySelector('input[type="checkbox"]');
            chk.addEventListener('change', (e) => {
                if (e.target.checked) {
                    completedTopics.push(topic.id);
                    row.classList.add('completed');
                    updateStats(20);
                } else {
                    completedTopics = completedTopics.filter(id => id !== topic.id);
                    row.classList.remove('completed');
                }
                localStorage.setItem('aegis_completed_topics', JSON.stringify(completedTopics));
                updateLearningProgress();
            });
            
            const startBtn = row.querySelector('.lp-start-btn');
            startBtn.addEventListener('click', () => {
                startNewSession('chat');
                handleSend(topic.title);
            });
            
            section.appendChild(row);
        });
        lpContent.appendChild(section);
        
        updateLearningProgress();
    }

    lpTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            lpTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentSubject = tab.getAttribute('data-subject');
            // reset level to beginner on subject change? Optional, let's keep it or reset
            currentLevel = 'beginner';
            lpLevelTabs.forEach(t => t.classList.remove('active'));
            lpLevelTabs[0].classList.add('active'); // set beginner active
            renderLearningPaths();
        });
    });

    if (lpLevelTabs) {
        lpLevelTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                lpLevelTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentLevel = tab.getAttribute('data-level');
                renderLearningPaths();
            });
        });
    }

    // Init App
    initGamification();
    if (allSessions.length === 0) {
        startNewSession('chat');
    } else {
        const latest = allSessions.reduce((a, b) => a.timestamp > b.timestamp ? a : b);
        if (['quiz', 'scenario', 'daily'].includes(latest.mode)) {
            startNewSession('chat');
        } else {
            loadSession(latest.id);
        }
    }
    
    // --- Certificate Logic ---
    function drawCertificateCanvas(subject) {
        const canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 700;
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        const ctx = canvas.getContext('2d');
        
        // Background (Dark gradient)
        const grad = ctx.createLinearGradient(0, 0, 1000, 700);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1000, 700);
        
        // Border
        ctx.strokeStyle = '#fbbf24'; // Gold
        ctx.lineWidth = 4;
        ctx.strokeRect(30, 30, 940, 640);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(40, 40, 920, 620);
        
        // Logo (Triangle)
        ctx.beginPath();
        ctx.moveTo(500, 100);
        ctx.lineTo(450, 200);
        ctx.lineTo(550, 200);
        ctx.closePath();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(500, 150);
        ctx.lineTo(520, 200);
        ctx.stroke();
        
        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE OF COMPLETION', 500, 280);
        
        // Subtitle
        ctx.fillStyle = '#94a3b8';
        ctx.font = '24px Inter, Arial, sans-serif';
        ctx.fillText('This certifies that you have successfully completed the', 500, 350);
        
        // Subject
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 40px Inter, Arial, sans-serif';
        ctx.fillText(subject.toUpperCase() + ' PATH', 500, 420);
        
        // Date & ID
        const today = new Date().toLocaleDateString('en-GB');
        const certId = 'APEX-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px Inter, Arial, sans-serif';
        ctx.fillText('Date: ' + today, 500, 520);
        ctx.fillText('ID: ' + certId, 500, 560);
        
        // Signature line
        ctx.strokeStyle = '#475569';
        ctx.beginPath();
        ctx.moveTo(400, 620);
        ctx.lineTo(600, 620);
        ctx.stroke();
        
        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'italic 16px Inter, Arial, sans-serif';
        ctx.fillText('Apex Cyber Teacher', 500, 645);
        
        return canvas;
    }

    const getCertBtn = document.getElementById('get-cert-btn');
    const certContainer = document.getElementById('cert-container');
    const certPreviewWrapper = document.getElementById('cert-preview-wrapper');
    const downloadCertBtn = document.getElementById('download-cert-btn');

    if (getCertBtn) {
        getCertBtn.addEventListener('click', () => {
            const lpContent = document.getElementById('lp-content');
            if (lpContent) lpContent.classList.add('hidden');
            if (certContainer) certContainer.classList.remove('hidden');
            
            if (certPreviewWrapper) {
                certPreviewWrapper.innerHTML = '';
                const canvas = drawCertificateCanvas(currentSubject);
                certPreviewWrapper.appendChild(canvas);
                
                downloadCertBtn.onclick = () => {
                    const dataUrl = canvas.toDataURL('image/png');
                    const a = document.createElement('a');
                    a.href = dataUrl;
                    a.download = `APEX-Certificate-${currentSubject}.png`;
                    a.click();
                };
            }
        });
    }
    
    // Switch subjects should hide certificate again
    lpTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            if (certContainer) certContainer.classList.add('hidden');
            const lpContent = document.getElementById('lp-content');
            if (lpContent) lpContent.classList.remove('hidden');
        });
    });

});
