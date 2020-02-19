//console.log("hello");

const countriesContainer = document.getElementById("countries");
const toggleBtn = document.getElementById("toggle");
const filterMenu = document.getElementById("filter");
const searchField = document.getElementById("search");
const regionFilter = filterMenu.querySelectorAll("li");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");
//console.log(regionFilter);

getCountries();

async function getCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const result = await res.json();
  console.log(result);
  displayCountries(result);
}

function displayCountries(result) {
  result.map(country => {
    const element = document.createElement("div");
    element.classList.add("card");

    element.innerHTML = `
    <div class="">
    
      <img src="${country.flag}" alt="" />
    
    <div class="card-body">
      <h3 class="country-name">${country.name}</h3>
      <p class="country-region"><strong>Population:</strong> ${country.population}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Capital:</strong> ${country.capital}</p>
    </div>
  </div>`;
    //modal
    element.addEventListener("click", () => {
      modal.style.display = "flex";
      showCountryDetails(country);
    });

    countriesContainer.appendChild(element);
  });
}

function showCountryDetails(country) {
  const modalImg = modal.querySelector("img");
  modalImg.src = country.flag;

  modal.querySelector(".modal-body").innerHTML = `<h3 class="country-name">${
    country.name
  }</h3>
  <p><strong>Population:</strong> ${country.population}</p>
  <p><strong>Region:</strong> ${country.region}</p>
  <p><strong>Capital:</strong> ${country.capital}</p>
  <p><strong>Native name:</strong> ${country.nativeName}</p>
  <p><strong>Currency:</strong> ${country.currencies.map(
    currencie => currencie.name
  )}</p>
  <p><strong>Languages:</strong> ${country.languages.map(
    language => language.name
  )}</p>
  <p><strong>Border Countries:</strong> ${country.borders.map(
    border => border
  )}</p>`;
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

filterMenu.addEventListener("click", () => {
  filterMenu.classList.toggle("open");
});
//modal close
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

searchField.addEventListener("input", e => {
  const value = e.target.value;
  const countryName = document.querySelectorAll(".country-name");
  //console.log(countryName);
  countryName.forEach(name => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});
//filter li
regionFilter.forEach(filter => {
  filter.addEventListener("click", () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll(".country-region");
    console.log(value, countryRegion);

    countryRegion.forEach(region => {
      if (region.innerText.includes(value)) {
        // .card -> .card-body -> .country-region
        region.parentElement.parentElement.parentElement.style.display =
          "block";
      } else {
        region.parentElement.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
