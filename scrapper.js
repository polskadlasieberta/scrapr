const axios = require("axios");
const cheerio = require("cheerio");

async function scrape() {
  try {
    const url = "https://www.ceneo.pl/Laptopy";
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const products = [];

    $(".cat-prod-row").each((i, el) => {
      const name = $(el).find(".cat-prod-row__name").text().trim();
      const price = $(el).find(".price").text().trim();
      const rating = $(el).find(".review-score").text().trim();

      products.push({
        lp: i + 1,
        name: name || "Brak nazwy",
        price: price || "Brak ceny",
        rating: rating || "Brak oceny",
      });
    });

    if (products.length === 0) {
      console.log("Nie znaleziono produktow.");
      return;
    }

    console.log(`Znaleziono ${products.length} produktow:\n`);
    console.table(products);
  } catch (err) {
    console.error("Blad:", err.message);
  }
}

scrape();
