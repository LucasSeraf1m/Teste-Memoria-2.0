import React from "react";

const ResponderTeste = () => {

  var lista = [];
  var perguntas = [];
  document.getElementById("submit").style.display = "none";
  document.getElementById("nova-pergunta").style.display = "none";
  var respostas = [];
  var index = 0;
  fetch("http://localhost:8000/getQuestionarios?cache=" + Date.now())
    .then((response) => response.json())
    .then((data) => {
      if (Object.keys(data).length === 0) {
        window.location.href = "/home";
        window.alert("lista vazia");
      }

      for (var i = 0; i < data.length; i++) {
        var ItemDiv = document.createElement("div");
        ItemDiv.setAttribute("class", "card text-center m-2");

        var itemDivHeader = document.createElement("div");
        itemDivHeader.setAttribute("class", "card-header");
        itemDivHeader.innerHTML = "Questionário";
        ItemDiv.appendChild(itemDivHeader);

        var itemText = document.createElement("h4");
        itemText.setAttribute("class", "card-title");

        itemText.innerText = data[i].NomeTeste;
        ItemDiv.appendChild(itemText);

        var novoButton = document.createElement("button");
        novoButton.setAttribute("class", "botao-item btn btn-primary");
        novoButton.setAttribute("name", "botao-iniciar");
        novoButton.setAttribute("value", data[i].idQuestionario);

        novoButton.innerText = "Iniciar";
        ItemDiv.appendChild(novoButton);

        document.getElementById("lista-questionarios").appendChild(ItemDiv);

        adicionarEventoDeCliqueAoBotao(novoButton);
      }
    });

  function adicionarEventoDeCliqueAoBotao(botao) {
    const nomeDoItem = botao.value;

    botao.addEventListener("click", () => {
      document.getElementById("nova-pergunta").style.display = "inline";

      document.getElementById("container-pai").style.display = "none";

      fetch("http://localhost:8000/getQuestionarios?cache=")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((pergunta, i) => {
            if (data[i].idQuestionario === nomeDoItem) {
              lista = data[i];
            }
          })
            gerarPergunta();
        });
    });
  }
  function gerarPergunta() {
    const perguntas = document.querySelectorAll("input[type=radio]:checked");
    perguntas.forEach((pergunta) => {
      respostas.push({
        pergunta: pergunta.name,
        resposta: pergunta.value,
      });
    });
    var pergunta = lista;
    let html = "";

    html += `
      <div class="container-fluid mt-5 mb-2">
        <div class="row">
          <div class="col-md-12">
              <div class="card bg-cinza">
                <h5 class="card-header"></h5>
                <div class="card-body bg-cinza">
                  <h3 class="text-uppercase text-white">${index + 1}. ${
      pergunta.perguntas[index].pergunta
    }</h3>
                    <ul>
                      <div id="resposta">
                        <li class="d-flex">
                          <p class="text-white">a)</p>
                          <input class="form-check-input" type="radio" id="${index}-a" name="${index}" value="${
      pergunta.perguntas[index].respostaA
    }"/>
                          <label class="mx-2 text-white" for="${index}-a">${
      pergunta.perguntas[index].respostaA
    }</label>
                        </li>
                      </div>
                      <div id="resposta">
                        <li class="d-flex">
                          <p class="text-white">b)</p>
                          <input class="form-check-input" type="radio" id="${index}-b" name="${index}" value="${
      pergunta.perguntas[index].respostaB
    }"/>
                          <label class="mx-2 text-white" for="${index}-b">${
      pergunta.perguntas[index].respostaB
    }</label>
                        </li> 
                      </div>
                      <div id="resposta">
                        <li class="d-flex">
                          <p class="text-white">c)</p>
                          <input class="form-check-input" type="radio" id="${index}-c" name="${index}" value="${
      pergunta.perguntas[index].respostaC
    }" />
                          <label class="mx-2 text-white" for="${index}-c">${
      pergunta.perguntas[index].respostaC
    }</label>
                        </li> 
                      </div>
                      <div id="resposta">
                        <li class="d-flex">
                          <p class="text-white">d)</p>
                          <input class="form-check-input" type="radio" id="${index}-d" name="${index}" value="${
      pergunta.perguntas[index].respostaD
    }" />
                          <label class="mx-2 text-white" for="${index}-d">${
      pergunta.perguntas[index].respostaD
    }</label>
                        </li> 
                      </div>
                      <div id="resposta">
                        <li class="d-flex">
                          <p class="text-white">e)</p>
                          <input class="form-check-input" type="radio" id="${index}-e" name="${index}" value="${
      pergunta.perguntas[index].respostaE
    }" />
                          <label class="mx-2 text-white" for="${index}-e">${
      pergunta.perguntas[index].respostaE
    }</label>
                        </li>
                      </div>
                    </ul>
                </div>
              </div>
          </div>
        </div>
    </div> 
   
     `;

    index++;

    if (index === lista.perguntas.length) {
      document.getElementById("nova-pergunta").style.display = "none";
      document.getElementById("submit").style.display = "inline";
    }
    document.getElementById("lista-perguntas").innerHTML = html;
  }

  var perguntaSubmit = document.getElementById("nova-pergunta");

  perguntaSubmit.addEventListener("click", () => {
    gerarPergunta();
  });
  var btnTermina = document
    .getElementById("submit")
    .addEventListener("click", () => {
      const perguntas = document.querySelectorAll("input[type=radio]:checked");

      document.getElementById("nova-pergunta").style.display = "none";
      document.getElementById("submit").style.display = "none";

      perguntas.forEach((pergunta) => {
        respostas.push({
          pergunta: pergunta.name,
          resposta: pergunta.value,
        });
      });

      var respostacerta = 0;

      for (let i = 0; i < respostas.length; i++) {
        if (respostas[i].resposta === lista.perguntas[i].respostaCerta) {
          respostacerta++;
        }
      }

      const dataAtual = new Date();
      const horaFormatada = dataAtual.toLocaleTimeString();
      const novoJSON = {
        NomeTeste: lista.NomeTeste,
        qtd_perguntas: lista.perguntas.length,
        qtd_acertos: respostacerta,
        dataRealizada: horaFormatada,
      };

      const novoJSONString = JSON.stringify(novoJSON, null, 2);
      fetch("http://localhost:8000/postResultados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: novoJSONString,
      });

      window.location.replace("http://localhost:3000/home");
    });

  return (
    <body class="bg-degrade">
      <div id="container-pai" class="container my-5">
        <div class="row">
          <div class="col-md-12 d-flex justify-content-center">
            <div
              id="lista-questionarios"
              class="d-flex justify-content-md-center p-5"
            ></div>
          </div>
        </div>
      </div>
      <div id="lista-perguntas"></div>
      <div class="container-fluid">
        <div class="row d-flex">
          <div class="col-md-6">
            <button id="nova-pergunta" class="btn-perguntas">
              Proxima Pergunta
            </button>
          </div>
          <div class="col-md-6 text-end">
            <button id="submit" class="btn-perguntas">
              Finalizar Questionário
            </button>
          </div>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js"
        integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js"
        integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ"
        crossorigin="anonymous"
      ></script>
    </body>
  );
};

export default ResponderTeste;