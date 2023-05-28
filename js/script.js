const chave = "95c6ceb74e2289cd909fd49d08f2e576"

function ColocarNaTela(dados) {
    console.log(dados)

    document.querySelector(".city").innerHTML = dados.name
    document.querySelector(".temperature").innerHTML = parseInt(dados.main.temp) + "° C"
    document.querySelector(".description").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".imgtemp").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
    document.querySelector(".tempo").innerHTML = 
}

function clique() {
    const cidade = document.querySelector(".input-city").value
    buscarCidade(cidade)
}

async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`).then(response => response.json())

    ColocarNaTela(dados)
}