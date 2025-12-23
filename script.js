const stations = ["Beni Mourad", "Boufarik", "Chebli", "Baba Ali", "Birtouta", "El Harrach", "Agha"];

const content = {
    ar: { title: "مواقيت SNTF", from: "من:", to: "إلى:", search: "بحث", price: "السعر:", dur: "50 دقيقة" },
    fr: { title: "SNTF Horaires", from: "De:", to: "À:", search: "Chercher", price: "Prix:", dur: "50 min" },
    en: { title: "SNTF Schedule", from: "From:", to: "To:", search: "Search", price: "Price:", dur: "50 min" }
};

// 1. تبديل اللغات
function changeLanguage() {
    const lang = document.getElementById('lang-selector').value;
    const t = content[lang];
    document.getElementById('app-title').innerText = t.title;
    document.getElementById('lbl-from').innerText = t.from;
    document.getElementById('lbl-to').innerText = t.to;
    document.getElementById('btn-search').innerText = t.search;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

// 2. البحث الصوتي
function startVoiceSearch() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return alert("متصفحك لا يدعم البحث الصوتي");
    
    const rec = new Recognition();
    rec.lang = document.getElementById('lang-selector').value === 'ar' ? 'ar-DZ' : 'fr-FR';
    rec.start();
    rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        alert("بحثت عن: " + text);
    };
}

// 3. الإشعارات والتنبيه
function requestNotify() {
    Notification.requestPermission().then(p => {
        if (p === 'granted') {
            new Notification("SNTF", { body: "تم تفعيل تنبيه رحلة بني مراد!" });
        }
    });
}

// 4. عرض النتائج والتذكرة
function searchTrains() {
    const lang = document.getElementById('lang-selector').value;
    const container = document.getElementById('results-container');
    
    container.innerHTML = `
        <div class="ticket">
            <div style="display:flex; justify-content:space-between">
                <span class="badge">الضواحي #102</span>
                <span onclick="requestNotify()" style="cursor:pointer">🔔</span>
            </div>
            <div class="ticket-path">
                <div><strong>بني مراد</strong><br><small>08:00</small></div>
                <div class="dashed-line"></div>
                <div><strong>آغا</strong><br><small>08:50</small></div>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.2); padding-top:10px; display:flex; justify-content:space-between">
                <span>${content[lang].dur}</span>
                <strong>80 دج</strong>
            </div>
        </div>
        <div class="card" style="margin-top:10px">
            <small>المحطات: بوفاريك، بئر توتة، الحراش</small>
        </div>
    `;
}

// 5. الوضع الليلي
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
