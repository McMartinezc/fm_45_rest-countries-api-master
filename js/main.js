let btnToggleDarkMode = document.querySelector("#btn-toggle-dark-mode");
const inputSearch = document.getElementById("input-field-country");
const countriesBox = document.getElementById("countries-selection-box");
const regionSelect = document.getElementById("regionSelect");
let countries;

//Función dark mode
function toggleDarkMode() {
  document.querySelector("html").classList.toggle("dark-mode");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon-fill");
}

//Función inicial 
async function init() {
  btnToggleDarkMode.addEventListener("click", toggleDarkMode);

  await getAllCountries();
  
  inputSearch.addEventListener("input", handleSearch);
  regionSelect.addEventListener("change", handleSearch);
}

//Función fetch y llamamos la función para pintar las cards
async function getAllCountries() {
  const url = "https://restcountries.com/v3.1/all";
  const response = await fetch(url);
  countries = await response.json();
  updateCountryCards(countries);
}

//Función que une el input y el select dependiendo de lo que pone el usuario
function handleSearch() {
  const searchTerm = inputSearch.value;
  const selectedRegion = regionSelect.value;
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.official.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });
  updateCountryCards(filteredCountries);
}

//Función coge datos y pone las cards
function updateCountryCards(countriesData) {
  countriesBox.innerHTML = "";
  countriesData.forEach(country => {
    paintCountry(country);
  });
}


//Función crear tarjetas 
function paintCountry(countrieData) {
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

window.onload = init;
