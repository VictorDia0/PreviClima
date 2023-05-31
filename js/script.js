async function enter() {
  document.addEventListener("DOMContentLoaded", async function () {
    const apikey = "95c6ceb74e2289cd909fd49d08f2e576";

    async function ColocarNaTela(dados) {
      if (dados.cod === "404") {
        document.querySelector("#city").innerHTML = "Cidade não encontrada";

        document.querySelector("#country").style.display = "none";
        document.querySelector("#temperature").style.display = "none";
        document.querySelector("#weather-icon").style.display = "none";
        document.querySelector("#description").style.display = "none";
        document.querySelector("#umiditys").style.display = "none";
        document.querySelector("#winds").style.display = "none";
        document.querySelector("#localizacao").style.display = "none";
        document.querySelector("#details-container").style.display = "none";

        weatherContainer.classList.remove("hide");

      } else {

        document.querySelector("#city").innerHTML = dados.name;
        document.querySelector("#country").src = "https://flagsapi.com/" + dados.sys.country + "/flat/64.png";
        document.querySelector("#temperature").innerHTML = parseInt(dados.main.temp) + "&deg;C";
        document.querySelector("#weather-icon").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
        document.querySelector("#description").innerHTML = dados.weather[0].description;
        document.querySelector("#umiditys").innerHTML = dados.main.humidity + "%";
        document.querySelector("#winds").innerHTML = dados.wind.speed + "Km/h";
        weatherContainer.classList.remove("hide");
      }
    }

    async function buscarCidade(cidade) {
      try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apikey}&lang=pt_br&units=metric`).then(response => response.json());

        await ColocarNaTela(dados);
      } catch (error) {
        console.log(error);
        // Exibir mensagem de erro caso ocorra algum problema na requisição
        document.querySelector("#city").innerHTML = "Erro ao buscar dados";
        weatherContainer.classList.add("hide");
      }
    }

    const weatherContainer = document.querySelector("#weather-data");

    async function clique() {
      let cidade = document.querySelector("#city-input").value;
      await buscarCidade(cidade);
      weatherContainer.classList.remove("hide");
    }

    function pressionarEnter(event) {
      if (event.keyCode === 13) {
        clique();
      }
    }

    document.querySelector("#city-input").addEventListener("keypress", pressionarEnter);
  });
}

enter();