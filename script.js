// بيانات المحطات وإحداثياتها
const stations = {
    "الجزائر - آغا": [36.7658, 3.0515],
    "الحراش": [36.7200, 3.1300],
    "بئر توتة": [36.6400, 3.0000],
    "بوفاريك": [36.5700, 2.9100],
    "بني مراد": [36.5200, 2.8600],
    "البليدة": [36.4702, 2.8277],
    "العفرون": [36.4674, 2.6277]
};

// إنشاء الخريطة
let map = L.map('map', { zoomControl: false }).setView([36.65, 3.0], 11);

// استخدام تصميم خريطة هادئ (Material-friendly)
L.tileLayer('https://{s}.tile.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);

let trainMarker;

// تعبئة القوائم عند فتح الموقع
window.onload = () => {
    const startSelect = document.getElementById('start-station');
    const endSelect = document.getElementById('end-station');
    
    Object.keys(stations).forEach(name => {
        startSelect.add(new Option(name, name));
        endSelect.add(new Option(name, name));
    });
};

// وظيفة بدء التتبع
function startTracking() {
    const startPos = document.getElementById('start-station').value;
    const coords = stations[startPos];

    if (trainMarker) map.removeLayer(trainMarker);

    trainMarker = L.marker(coords, {
        icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/785/785360.png', // أيقونة قطار
            iconSize: [40, 40]
        })
    }).addTo(map);

    map.flyTo(coords, 14, { duration: 2 });
    
    // تصغير البطاقة السفلية لإظهار الخريطة بشكل أفضل
    document.getElementById('sheet').style.transform = "translateY(75%)";
}

// وظيفة فتح/إغلاق البطاقة السفلية
let isOpen = true;
function toggleSheet() {
    const sheet = document.getElementById('sheet');
    sheet.style.transform = isOpen ? "translateY(85%)" : "translateY(0)";
    isOpen = !isOpen;
}
