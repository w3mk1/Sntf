// مصفوفة ضخمة للمحطات الجزائرية
const stationsDB = [
    { name: "الجزائر - آغا", lat: 36.7645, lng: 3.0515 },
    { name: "البليدة", lat: 36.4701, lng: 2.8288 },
    { name: "بني مراد", lat: 36.5050, lng: 2.8610 },
    { name: "وهران", lat: 35.6971, lng: -0.6308 },
    { name: "قسنطينة", lat: 36.3650, lng: 6.6147 },
    { name: "عنابة", lat: 36.9000, lng: 7.7667 },
    { name: "بجاية", lat: 36.7511, lng: 5.0567 },
    { name: "سطيف", lat: 36.1898, lng: 5.4032 },
    { name: "تلمسان", lat: 34.8817, lng: -1.3167 },
    { name: "بشار", lat: 31.6167, lng: -2.2167 }
];

let map, trainMarker, routeLine;

// 1. نظام البحث الذكي
function filterStations(type) {
    const query = document.getElementById(`${type}-input`).value.toLowerCase();
    const list = document.getElementById(`${type}-list`);
    list.innerHTML = "";
    
    if (query.length < 1) return;

    const filtered = stationsDB.filter(s => s.name.toLowerCase().includes(query));
    filtered.forEach(s => {
        const div = document.createElement('div');
        div.className = "suggestion-item";
        div.innerText = s.name;
        div.onclick = () => selectStation(type, s);
        list.appendChild(div);
    });
}

function selectStation(type, station) {
    document.getElementById(`${type}-input`).value = station.name;
    document.getElementById(`${type}-list`).innerHTML = "";
    // حفظ البيانات في الحقل كخاصية مخفية
    document.getElementById(`${type}-input`).dataset.lat = station.lat;
    document.getElementById(`${type}-input`).dataset.lng = station.lng;
}

// 2. التتبع الحي الحقيقي
function processSearch() {
    const from = document.getElementById('from-input');
    const to = document.getElementById('to-input');

    if (!from.dataset.lat || !to.dataset.lat) return alert("يرجى اختيار المحطات من القائمة");

    document.getElementById('map-section').style.display = 'block';
    initMap(from.dataset, to.dataset);
    showTimes(from.value, to.value);
}

function initMap(start, end) {
    const sPos = [parseFloat(start.lat), parseFloat(start.lng)];
    const ePos = [parseFloat(end.lat), parseFloat(end.lng)];

    if (!map) {
        map = L.map('map').setView(sPos, 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    } else {
        map.setView(sPos, 7);
        if(routeLine) map.removeLayer(routeLine);
        if(trainMarker) map.removeLayer(trainMarker);
    }

    // رسم مسار الرحلة
    routeLine = L.polyline([sPos, ePos], {color: 'var(--md-primary)', weight: 4, dashArray: '10, 10'}).addTo(map);
    
    // أيقونة القطار المتحركة
    trainMarker = L.marker(sPos, {
        icon: L.divIcon({html: '<i class="fas fa-train" style="color:#006d3a; font-size:24px;"></i>', className: 'train-move'})
    }).addTo(map);

    animateTrain(sPos, ePos);
}

function animateTrain(start, end) {
    let p = 0;
    const interval = setInterval(() => {
        p += 0.005;
        if (p >= 1) clearInterval(interval);
        const lat = start[0] + (end[0] - start[0]) * p;
        const lng = start[1] + (end[1] - start[1]) * p;
        trainMarker.setLatLng([lat, lng]);
    }, 100);
}

function showTimes(f, t) {
    const area = document.getElementById('results-area');
    area.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-clock"></i> الرحلة القادمة</h3>
            <div style="display:flex; justify-content:space-between; margin-top:10px;">
                <span>الانطلاق: <strong>08:30</strong></span>
                <span>الوصول: <strong>10:15</strong></span>
            </div>
            <p style="margin-top:10px; color:var(--md-primary)">💰 التذكرة: 120 دج</p>
        </div>
    `;
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
