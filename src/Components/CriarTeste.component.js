import React from "react";

const CriarTeste = () => {
  document
    .getElementById("btn-criar-perguntas")
    .addEventListener("click", function (event) {
      document.getElementById("nomes_testes").style.display = "none";
      event.preventDefault();

      var qtda = document.getElementById("qtda_perguntas").value;

      if (qtda != 0) {
        for (var i = 0; i < qtda; i++) {
          var novoItem = document.createElement("div");
          novoItem.setAttribute("class", "form-group row mb-4");

          var ItemLabel = document.createElement("label");
          ItemLabel.setAttribute("class", "col-form-label text-white");
          ItemLabel.innerHTML = "Pergunta";
          novoItem.appendChild(ItemLabel);

          var novoInput = document.createElement("input");
          novoInput.setAttribute("type", "text");
          novoInput.setAttribute("id", "pergunta");
          novoInput.setAttribute("class", "form-control");

          novoItem.appendChild(novoInput);

          var ItemLabel = document.createElement("label");
          ItemLabel.innerHTML = "Resposta A";
          ItemLabel.setAttribute("class", "col-form-label text-white");
          novoItem.appendChild(ItemLabel);
          var novoInput = document.createElement("input");
          novoInput.setAttribute("type", "text");
          novoInput.setAttribute("class", "resposta form-control");
          novoInput.setAttribute("id", "respostaTextA");
          novoInput.placeholder = "A";
          novoItem.appendChild(novoInput);

          var ItemLabel = document.createElement("label");
          ItemLabel.innerHTML = "Resposta B";
          ItemLabel.setAttribute("class", "col-form-label text-white");
          novoItem.appendChild(ItemLabel);
          var novoInput = document.createElement("input");
          novoInput.setAttribute("type", "text");
          novoInput.setAttribute("class", "resposta form-control");
          novoInput.setAttribute("id", "respostaTextB");
          novoInput.placeholder = "B";
          novoItem.appendChild(novoInput);

          var ItemLabel = document.createElement("label");
          ItemLabel.innerHTML = "Resposta C";
          ItemLabel.setAttribute("class", " col-form-label text-white");
          novoItem.appendChild(ItemLabel);
          var novoInput = document.createElement("input");
          novoInput.setAttribute("type", "text");
          novoInput.setAttribute("class", "resposta form-control");
          novoInput.setAttribute("id", "respostaTextC");
          novoInput.placeholder = "C";
          novoItem.appendChild(novoInput);

          var ItemLabel = document.createElement("label");
          ItemLabel.innerHTML = "Resposta D";
          ItemLabel.setAttribute("class", " col-form-label text-white");
          novoItem.appendChild(ItemLabel);
          var novoInput = document.createElement("input");
          novoInput.setAttribute("type", "text");
          novoInput.setAttribute("class", "resposta form-control");
          novoInput.setAttribute("id", "respostaTextD");
          novoInput.placeholder = "D";
          novoItem.appendChild(novoInput);

          var ItemLabel = document.createElement("label");
          ItemLabel.innerHTML = "Resposta E";
          ItemLabel.setAttribute("class", " col-form-label text-white");
          novoItem.appendChild(ItemLabel);
          var novoInput = document.createElement("input");
          novoInput.setAttribute("type", "text");
          novoInput.setAttribute("class", "resposta form-control");
          novoInput.setAttribute("id", "respostaTextE");
          novoInput.placeholder = "E";
          novoItem.appendChild(novoInput);

          var ItemLabel = document.createElement("label");
          ItemLabel.innerHTML = "Selecione a alternativa correta:";
          ItemLabel.setAttribute("class", " col-form-label text-white");
          novoItem.appendChild(ItemLabel);
          var novoInput = document.createElement("select");
          novoInput.setAttribute("name", "respostaCertas");
          novoInput.setAttribute("id", "respostaCertas");
          novoInput.setAttribute("class", "form-select mt-2");

          var opcaodSelect1 = document.createElement("option");
          opcaodSelect1.value = "respostaTextA";
          opcaodSelect1.text = "A";
          novoInput.appendChild(opcaodSelect1);

          var opcaodSelect2 = document.createElement("option");
          opcaodSelect2.value = "respostaTextB";
          opcaodSelect2.text = "B";
          novoInput.appendChild(opcaodSelect2);
          var opcaodSelect3 = document.createElement("option");
          opcaodSelect3.value = "respostaTextC";
          opcaodSelect3.text = "C";
          novoInput.appendChild(opcaodSelect3);
          var opcaodSelect4 = document.createElement("option");
          opcaodSelect4.value = "respostaTextD";
          opcaodSelect4.text = "D";
          novoInput.appendChild(opcaodSelect4);
          var opcaodSelect5 = document.createElement("option");
          opcaodSelect5.value = "respostaTextE";
          opcaodSelect5.text = "E";
          novoInput.appendChild(opcaodSelect5);
          novoItem.appendChild(novoInput);

          document.getElementById("perguntas").appendChild(novoItem);
        }
      } else {
        window.alert("Adicione a quantidade de perguntas desejadas");
      }
    });
  document
    .getElementById("terminado_teste")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const novoDialogues = [];

      //pega os inputs
      var perguntas = document.querySelectorAll("#perguntas input[type=text]");

      var perguntasSelect = document.querySelectorAll("#perguntas select");
      if (perguntas != null && perguntasSelect != null) {
        var perguntasArray = [];
        var jsonLineNovo;
        var j = 0;
        var respostaCerta = [];
        for (var i = 0; i < perguntas.length; i += 6) {
          for (var k = 0; k <= 5; k++) {
            if (perguntas[i + k].id == perguntasSelect[j].value) {
              respostaCerta[j] = perguntas[i + k].value;
            }
          }

          j++;
        }
        j = 0;

        for (var i = 0; i < perguntas.length; i += 6) {
          jsonLineNovo = {
            pergunta: perguntas[i].value,
            respostaA: perguntas[i + 1].value,
            respostaB: perguntas[i + 2].value,
            respostaC: perguntas[i + 3].value,
            respostaD: perguntas[i + 4].value,
            respostaE: perguntas[i + 5].value,
            respostaCerta: respostaCerta[j],
          };
          j++;

          perguntasArray.push(jsonLineNovo);
        }

        var nomeTeste = document.getElementById("basic-url").value;

        var jsonLineNovoA = {
          NomeTeste: nomeTeste,
          perguntas: perguntasArray,
        };

        novoDialogues.push(jsonLineNovoA);

        const novoJSON = {
          questionarios: novoDialogues,
        };
        window.alert(
          "Foram adicionadas " + jsonLineNovoA.perguntas.length + " Perguntas"
        );
        const novoJSONString = JSON.stringify(novoJSON, null, 2);

        fetch("http://localhost:8000/PostQuestionario?cache=" + Date.now(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: novoJSONString,
        });
      } else {
        window.alert("Prencha todos os espaços");
      }
      window.location.replace("http://localhost:8000/home");
    });

  return (
    <body class="bg-degrade2">
      <nav class="navbar navbar-expand-lg navbar-dark shadow-5-strong">
        <div class="container-fluid">
          <a href="/home" class="navbar-brand">
            <i class="fa-sharp fa-solid fa-scroll"></i> Questionários
          </a>
          <button
            type="button"
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav">
              <a href="/home" class="nav-item nav-link">
                Home
              </a>
              <a href="/lista" class="nav-item nav-link">
                Fazer um questionário
              </a>
              <a href="/resultados" class="nav-item nav-link">
                Resultados
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12 text-right">
            <h2 class="text-white mb-3 text-center">
              Criação de novo questionário
            </h2>
            <div class="input-group mb-3" id="nomes_testes">
              <span class="input-group-text" id="basic-addon3">
                Nome do teste:
              </span>
              <input
                type="text"
                class="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
              ></input>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon3">
                Quantidade de Perguntas?
              </span>
              <input
                type="text"
                id="qtda_perguntas"
                class="form-control"
                // id="basic-url"
                aria-describedby="basic-addon3"
              ></input>
            </div>
            <div class="input-group mb-3">
              <button
                type="button"
                id="btn-criar-perguntas"
                class="btn btn-primary"
              >
                Criar Perguntas
              </button>
            </div>
            <div class="container">
              <div class="row d-flex align-items-start">
                <div class="input-group">
                  <ul id="perguntas"></ul>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <button
                type="button"
                id="terminado_teste"
                class="btn btn-primary"
              >
                Terminar Teste
              </button>
            </div>
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

export default CriarTeste;
