// Canlı CoinGecko API URL'i (Piyasa değerine göre ilk 20 coin, USD cinsinden)
const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=90&page=1&sparkline=false";

export const kriptoVerileriniFetchEt = async () => {
    const yanit = await fetch(API_URL);
    if (!yanit.ok) {
        throw new Error("Canlı kripto verileri çekilemedi! API limitine takılmış olabilirsiniz.");
    }
    return await yanit.json();
};