// قاعدة بيانات المحطات والخطوط
const railNetwork = {
    suburban: ["البليدة", "بني مراد", "بوفاريك", "بئر توتة", "الحراش", "آغا", "الجزائر"],
    west: ["الجزائر", "الشلف", "غليزان", "وهران", "تلمسان"],
    east: ["الجزائر", "البويرة", "سطيف", "قسنطينة", "سكيكدة", "عنابة"],
    south: ["الجزائر", "المسيلة", "بسكرة", "تقرت", "بشار"]
};

const i18n = {
    ar: { title: "الشبكة الوطنية SNTF", search: "بحث", dur: "مدة الرحلة", price: "السعر" },
    fr: { title: "Réseau National SNTF", search: "Chercher", dur: "Durée", price: "Prix" },
    en: { title: "SNTF National Network", search: "Search", dur: "Duration", price: "Price" }
};

// تحديث قائمة المحطات بناءً على الخط المختار
function updateStations() {
    const line = document.getElementById('line-select').value;
    const fromSelect = document.getElementById('from-station');
    const toSelect = document.getElementById('to-station');
    
    const stations = railNetwork[line];
    const options = stations.map(s => `<option value="${s}">${s}</option>`).join('');
    
    fromSelect.innerHTML = options;
    toSelect.innerHTML = options;
}

// تبديل الوضع الليلي
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// محرك البحث وعرض التذكرة
function searchTrains() {
    const lang = document.getElementById('lang-selector').value;
    const from = document.getElementById('from-station').value;
    const to = document.getElementById('to-station').value;
    const results = document.getElementById('results-container');

    if (from === to) {
        alert("يرجى اختيار محطتين مختلفتين");
        return;
    }

    results.innerHTML = `
        <div class="ticket animated">
            <div style="display:flex; justify-content:space-between; align-items:center">
                <span style="font-size: 12px; opacity: 0.8">SNTF Express</span>
                <button onclick="activateNotify()" style="background:none; border:none; color:white; cursor:pointer">🔔</button>
            </div>
            <div style="display:flex; justify-content:space-between; margin: 15px 0; align-items:center">
                <div style="text-align:center"><h3>${from}</h3><small>07:00</small></div>
                <div style="flex-grow:1; border-top:2px dashed white; margin:0 15px; position:relative">
                    <span style="position:absolute; top:-12px; left:45%">🚆</span>
                </div>
                <div style="text-align:center"><h3>${to}</h3><small>11:30</small></div>
            </div>
            <div style="display:flex; justify-content:space-between; border-top: 1px solid rgba(255,255,255,0.2); padding-top:10px">
                <span>⏱️ ${i18n[lang].dur}: 4h 30min</span>
                <strong>💰 850 DA</strong>
            </div>
        </div>
    `;
}

function activateNotify() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        new Notification("SNTF", { body: "تم تفعيل تنبيه الوصول لمحطة " + document.getElementById('to-station').value });
    }
}

// تشغيل الوظائف عند التحميل
function initApp() {
    const lang = document.getElementById('lang-selector').value;
    document.getElementById('app-title').innerText = i18n[lang].title;
    document.getElementById('btn-search').innerText = i18n[lang].search;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    updateStations();
}

window.onload = initApp;
