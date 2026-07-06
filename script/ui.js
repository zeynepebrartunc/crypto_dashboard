// HTML elemanlarını seçiyoruz ve dışa aktarıyoruz (export)
export const listeContainer = document.getElementById("coinListesi");
export const aramaInput = document.getElementById("aramaKutusu");
export const siralaMenu = document.getElementById("siralaMenu");
export const temaBtn = document.getElementById("temaBtn");       
export const buton = document.getElementById("getirBtn");
export const favoriFiltreBtn = document.getElementById("favoriFiltreBtn");

// Ekrana kartları basan fonksiyon
export const ekranaBas = (coinler, favoriCoinler, onFavClick) => {
    listeContainer.innerHTML = ""; 
    
    if (coinler.length === 0) {
        listeContainer.innerHTML = "<p style='grid-column: 1/-1;'>Kriterlere uygun coin bulunamadı.</p>";
        return;
    }

    coinler.forEach(coin => {
        const favorimi = favoriCoinler.includes(coin.id);
        const card = document.createElement("div");
        card.className = "coin-card";
        
        const fiyat = parseFloat(coin.current_price);
        const degisim = parseFloat(coin.price_change_percentage_24h || 0);
        
        // Değişim yönüne göre renk ve ok işareti belirleme
        const degisimClass = degisim >= 0 ? "price-up" : "price-down";
        const degisimIsareti = degisim >= 0 ? "▲" : "▼";

        card.innerHTML = `
            <div class="coin-info">
                <div class="coin-title-row">
                    <img src="${coin.image}" alt="${coin.name} logo" class="coin-logo">
                    <h3>${coin.name} <span>(${coin.symbol.toUpperCase()})</span></h3>
                </div>
                <div class="coin-price-row">
                    <div class="coin-price">$${fiyat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    <div class="${degisimClass}">${degisimIsareti} %${Math.abs(degisim).toFixed(2)}</div>
                </div>
            </div>
            <button class="fav-btn ${favorimi ? 'active' : ''}">
                ${favorimi ? '⭐ Favorilerden Çıkar' : '☆ Favorilere Ekle'}
            </button>
        `;

        // Kartın içindeki favori butonuna tıklama olayı bağlama
        const favBtn = card.querySelector(".fav-btn");
        favBtn.addEventListener("click", () => onFavClick(coin.id));
        
        listeContainer.appendChild(card);
    });
};

export const hataMesajiGoster = (mesaj) => {
    listeContainer.innerHTML = `<p style='color:#ff3333;'>${mesaj}</p>`;
};

export const yukleniyorGoster = () => {
    listeContainer.innerHTML = "<p>Veriler yerel JSON dosyasından yükleniyor...</p>"; 
};