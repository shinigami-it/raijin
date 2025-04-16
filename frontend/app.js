document.addEventListener('DOMContentLoaded', () => {
    const kanjiList = document.getElementById('kanji-list');
    const syncButton = document.getElementById('sync-button');

    // Beispielhafte Kanji-Daten (Diese werden später dynamisch aus der DB kommen)
    const kanjiData = [
        { kanji: '日', meaning: 'Sun/Day', pronunciation: 'にち' },
        { kanji: '月', meaning: 'Moon/Month', pronunciation: 'げつ' },
        { kanji: '火', meaning: 'Fire', pronunciation: 'か' },
    ];

    // Funktion zum Anzeigen der Kanji-Daten
    function displayKanji(kanjiItems) {
        kanjiList.innerHTML = '';
        kanjiItems.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('kanji-item');
            li.innerHTML = `
                <span>${item.kanji}</span>
                <span>${item.meaning} (${item.pronunciation})</span>
                <button class="learned-btn">Mark as Learned</button>
            `;
            kanjiList.appendChild(li);
        });
    }

    // Lokale Speicherung von Kanji
    function saveKanjiToLocalStorage(kanjiItems) {
        localStorage.setItem('kanjiData', JSON.stringify(kanjiItems));
    }

    // Laden der Kanji aus dem lokalen Speicher
    function loadKanjiFromLocalStorage() {
        const savedKanji = localStorage.getItem('kanjiData');
        if (savedKanji) {
            return JSON.parse(savedKanji);
        }
        return [];
    }

    // Initiales Kanji-Daten Laden
    let storedKanji = loadKanjiFromLocalStorage();
    if (storedKanji.length === 0) {
        storedKanji = kanjiData; // Falls keine gespeicherten Daten vorhanden sind, die Beispiel-Daten verwenden
        saveKanjiToLocalStorage(storedKanji); // Speichern für den nächsten Besuch
    }
    displayKanji(storedKanji);

    // Event-Listener für den "Mark as Learned" Button
    kanjiList.addEventListener('click', function(e) {
        if (e.target.classList.contains('learned-btn')) {
            const index = Array.from(kanjiList.children).indexOf(e.target.parentElement);
            storedKanji.splice(index, 1); // Entfernt das markierte Kanji
            saveKanjiToLocalStorage(storedKanji); // Speichert die Änderung
            displayKanji(storedKanji); // Aktualisiert die Anzeige
        }
    });

    // Funktion für den Sync-Button
    syncButton.addEventListener('click', function() {
        alert('Sync with cloud feature coming soon!');
        // Hier kannst du später die Logik zum Hochladen der Kanji-Daten in die Cloud integrieren
    });
});
