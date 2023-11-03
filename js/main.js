
let btnToggleDarkMode = document.querySelector("#btn-toggle-dark-mode");
const inputSearch = document.getElementById("input-field-country");
const countriesBox = document.getElementById("countries-selection-box");


function toggleDarkMode() {
  document.querySelector("html").classList.toggle("dark-mode");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon-fill");
}

//Función inicial que arranca la página
function init() {
  btnToggleDarkMode.addEventListener("click", toggleDarkMode);

  getAllCountries();

  //Evento Input 
  inputSearch.addEventListener("input", async(event) => {
    const searchTerm = event.target.value;
    if (searchTerm.length > 0) {
      searchCountry(searchTerm);
    } else {
      getAllCountries(); 
    }
  });
}

window.onload = init();

//Función se añade una country en el input y se busca, llama a la función actualizar la página 
async function searchCountry(countryName) {
  const urlName = `https://restcountries.com/v3.1/name/${countryName}`;
  const response = await fetch(urlName);
  const countries = await response.json();
  updateCountryCards(countries);
}

//Limpia la pag y actualiza la tarjetas
function updateCountryCards(countriesData) {
  countriesBox.innerHTML = ""; // Limpiar las tarjetas existentes antes de mostrar nuevas tarjetas

  countriesData.forEach(countrie => {
    paintCountrie(countrie);
  });
}

//Función fetch
async function getAllCountries(){
  const url = "https://restcountries.com/v3.1/all";

  const response = await fetch(url);
  const countries = await response.json();

  countries.forEach(countrie => {
    paintCountrie(countrie);
  });
}

//Función card del país
function paintCountrie(countrieData) {
  const countriesBox = document.getElementById("countries-selection-box");

  const countryCard = document.createElement("article");
  countryCard.classList.add("country-info-box");

  const countryImage = document.createElement("img");
  countryImage.src = countrieData.flags.png;
  countryImage.alt = `${countrieData.name.official} flag`;
  countryCard.appendChild(countryImage);

  const countryName = document.createElement("h2");
  countryName.textContent = countrieData.name.official;
  countryCard.appendChild(countryName);

  const populationParagraph = document.createElement("p");
  populationParagraph.textContent = `Population: ${countrieData.population}`;
  countryCard.appendChild(populationParagraph);

  const regionParagraph = document.createElement("p");
  regionParagraph.textContent = `Region: ${countrieData.region}`;
  countryCard.appendChild(regionParagraph);

  countriesBox.appendChild(countryCard);
}

