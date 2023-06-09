const apikey = "95c6ceb74e2289cd909fd49d08f2e576";

async function buscarCidade(cidade) {
  try {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apikey}&lang=pt_br&units=metric`).then(response => response.json());

      await ColocarNaTela(dados);
      
  } catch (error) {
    console.log(error);
    document.querySelector("#city").innerHTML = "Erro ao buscar dados";
    weatherContainer.classList.add("hide");
  }
}

function pressionarEnter(event) {
  if (event.keyCode === 13) {
    clique();
  }
}

async function clique() {
  let cidade = document.querySelector("#city-input").value;
  weatherContainer = document.querySelector("#weather-data");
  await buscarCidade(cidade);
  weatherContainer.classList.remove("hide");
}

async function ColocarNaTela(dados) {
  console.log(dados)
  if (dados.cod === "404") {
    document.querySelector("#city").innerHTML = "Cidade não encontrada";

    document.querySelector("#country").style.display = "none";
    document.querySelector("#temperature").style.display = "none";
    document.querySelector("#description").style.display = "none";
    document.querySelector("#umiditys").style.display = "none";
    document.querySelector("#winds").style.display = "none";
    document.querySelector("#gota").style.display = "none";
    document.querySelector("#vento").style.display = "none";

    weatherContainer.classList.remove("hide");

  } else {

    document.querySelector("#country").style.display = "block";
    document.querySelector("#temperature").style.display = "block";
    document.querySelector("#description").style.display = "block";
    document.querySelector("#umiditys").style.display = "block";
    document.querySelector("#winds").style.display = "block";
    document.querySelector("#gota").style.display = "block";
    document.querySelector("#vento").style.display = "block";

    document.querySelector("#city").innerHTML = dados.name;
    document.querySelector("#country").src = "https://flagsapi.com/" + dados.sys.country + "/flat/64.png";
    document.querySelector("#temperature").innerHTML = parseInt(dados.main.temp) + "&deg;C";
    document.querySelector("#description").innerHTML = dados.weather[0].description;
    document.querySelector("#umiditys").innerHTML = dados.main.humidity + "%";
    document.querySelector("#winds").innerHTML = dados.wind.speed + "Km/h";
    weatherContainer.classList.remove("hide");
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const cityInput = document.querySelector("#city-input");
  const searchButton = document.querySelector("#search-button");
  cityInput.addEventListener("keypress", pressionarEnter);
  searchButton.addEventListener("click", clique);
});