// LocalStorage'dan favorileri getiren fonksiyon
export const favorileriGetir = () => {
    return JSON.parse(localStorage.getItem("favoriler")) || [];
};

// Güncel favori listesini LocalStorage'a kaydeden fonksiyon
export const favorileriKaydet = (favoriListesi) => {
    localStorage.setItem("favoriler", JSON.stringify(favoriListesi));
};