import { kriptoVerileriniFetchEt } from "./api.js";
import { favorileriGetir, favorileriKaydet } from "./storage.js";
import { 
    buton, 
    favoriFiltreBtn, 
    aramaInput, 
    siralaMenu, 
    temaBtn,   
    ekranaBas, 
    hataMesajiGoster, 
    yukleniyorGoster 
} from "./ui.js";

//GECİKTİRME ALGORİTMASI (yazma bittiğinde istek atılır)
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// Uygulama Durumu (State)
let globalCoinler = []; 
let favoriCoinler = favorileriGetir();
let sadeceFavorilerModu = false; 

// Tema Durumunu LocalStorage'dan Oku ve Başlat
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    temaBtn.textContent = "☀️";
}

const kriptoVerileriniGetir = async () => {
    try {
        yukleniyorGoster();
        globalCoinler = await kriptoVerileriniFetchEt();
        favoriModunuKapat(); 
        uiGuncelle();
    } catch (hata) {
        console.error("Hata:", hata);
        hataMesajiGoster("Veri dosyası okunurken hata oluştu. VS Code Live Server kullandığınızdan emin olun.");
    }
};

const favoriModunuKapat = () => {
    sadeceFavorilerModu = false;
    favoriFiltreBtn.style.background = "var(--card-color)";
    favoriFiltreBtn.style.color = "#ffcc00";
};

const uiGuncelle = () => {
    if (globalCoinler.length === 0) return;

    const arananMetin = aramaInput.value.trim().toLowerCase();
    let listelenecekVeri = [...globalCoinler];

    // 1. Filtrele: Favori Modu
    if (sadeceFavorilerModu) {
        listelenecekVeri = listelenecekVeri.filter(coin => favoriCoinler.includes(coin.id));
    }

    // 2. Filtrele: Arama Kutusu
    if (arananMetin !== "") {
        listelenecekVeri = listelenecekVeri.filter(coin => 
            coin.name.toLowerCase().includes(arananMetin) || 
            coin.symbol.toLowerCase().includes(arananMetin)
        );
    }

    // 3.SIRALAMA MANTIĞI (Yeni)
    const siralaTipi = siralaMenu.value;
    if (siralaTipi === "fiyatYuksek") {
        listelenecekVeri.sort((a, b) => parseFloat(b.current_price) - parseFloat(a.current_price));
    } else if (siralaTipi === "fiyatDusuk") {
        listelenecekVeri.sort((a, b) => parseFloat(a.current_price) - parseFloat(b.current_price));
    } else if (siralaTipi === "isimAZ") {
        listelenecekVeri.sort((a, b) => a.name.localeCompare(b.name));
    }

    ekranaBas(listelenecekVeri, favoriCoinler, favoriYonet);
};

const favoriYonet = (coinId) => {
    if (favoriCoinler.includes(coinId)) {
        favoriCoinler = favoriCoinler.filter(id => id !== coinId);
    } else {
        favoriCoinler.push(coinId);
    }
    favorileriKaydet(favoriCoinler);
    uiGuncelle(); 
};

// DİNLEYİCİLER
buton.addEventListener("click", () => {
    kriptoVerileriniGetir(); // Her tıklandığında CoinGecko'dan en güncel fiyatları çeker
});

// Arama kutusu dinleyicisi
aramaInput.addEventListener("input", debounce(() => {
    if (globalCoinler.length === 0) {
        kriptoVerileriniGetir();
    } else {
        uiGuncelle();
    }
}, 300));

// Sıralama menüsü dinleyicisi
siralaMenu.addEventListener("change", uiGuncelle);

// Favori filtre butonu dinleyicisi
favoriFiltreBtn.addEventListener("click", async () => {
    if (globalCoinler.length === 0) {
        await kriptoVerileriniGetir();
    }
    
    aramaInput.value = ""; 
    sadeceFavorilerModu = !sadeceFavorilerModu; 
    
    favoriFiltreBtn.style.background = sadeceFavorilerModu ? "#ffcc00" : "var(--card-color)";
    favoriFiltreBtn.style.color = sadeceFavorilerModu ? "#121214" : "#ffcc00";
    
    uiGuncelle();
});

// Tema Değiştirme Dinleyicisi
temaBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    if (isLight) {
        temaBtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        temaBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

kriptoVerileriniGetir(); // Sayfa açılır açılmaz coinleri otomatik yükler