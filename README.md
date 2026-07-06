# 📈 Crypto Dashboard

Canlı kripto para verilerini takip etmek, aramak, sıralamak ve favorilere eklemek için geliştirilmiş modern, modüler ve performans odaklı bir Web uygulaması. Proje, tarayıcı kaynaklarını ve API limitlerini optimize edecek şekilde ileri düzey JavaScript konseptleri uygulanarak tasarlanmıştır.

🚀 **[Canlı Önizleme (Live Demo) İçin Tıklayın](https://zeynepebrartunc.github.io/crypto_dashboard/)**

---

## ✨ Özellikler

- 🔄 **Canlı Veri Entegrasyonu:** Veriler, CoinGecko API'si kullanılarak piyasa değerine (Market Cap) göre ilk 90 kripto parayı içerecek şekilde gerçek zamanlı çekilir.
- ⚡ **Otomatik Yükleme & Yenileme (UX):** Kullanıcı sayfayı açtığı an canlı veriler otomatik olarak listelenir. "Yenile" butonu sayesinde sayfa tamamen yenilenmeden anlık fiyatlar tazelenebilir.
- ⏳ **Arama & Debounce Optimizasyonu:** Arama kutusunda `Debounce (300ms)` mekanizması kullanılmıştır. Kullanıcı yazarken her harfte filtreleme tetiklenmez; yazma durduktan 300ms sonra işlem yapılarak tarayıcı şişmesi ve API Rate Limit (istek sınırı) engelleri önlenir.
- 📊 **Gelişmiş Sıralama (Sorting):** Coinler fiyata (En Yüksek / En Düşük) ve isimlerine göre (A'dan Z'ye) anlık olarak sıralanabilir.
- ⭐ **Favori Sistemi & State Yönetimi:** Kullanıcılar diledikleri coinleri favorilerine ekleyebilir. Veriler `LocalStorage` üzerinde tutulduğu için sayfa yenilense bile favoriler kaybolmaz.
- 🌓 **Dinamik Tema Yönetimi (Dark/Light Mode):** Sağ üst köşedeki buton yardımıyla CSS Değişkenleri (`CSS Custom Properties`) manipüle edilerek anlık tema geçişi sağlanır. Seçilen tema hafızada saklanır.

---

## 🛠️ Kullanılan Teknolojiler ve Mimari

- **HTML5 & Modern CSS3:** Grid ve Flexbox mimarisiyle tamamen responsive (mobil uyumlu) tasarım.
- **Vanilla JavaScript (ES6+):** - Proje modüler yapıda tasarlanmıştır (`import / export`).
  - `Asenkron Programlama (Async/Await & Fetch API)` ile veri yönetimi yapılmıştır.
  - Hata yönetimi (`Try/Catch`) mekanizmaları kurulmuştur.

---

## 📂 Proje Yapısı

```text
├── index.html       # Uygulamanın ana arayüzü CSS stilleri
├── style.css        # CSS stilleri
├── script/
│   ├── app.js       # Uygulamanın ana yönetim merkezi (State & Event Listeners)
│   ├── api.js       # API isteklerini yöneten modül (Fetch)
│   ├── ui.js        # DOM manipülasyonu ve arayüz çizim modülü
│   └── storage.js   # LocalStorage veri kayıt modülü
