const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTie36448N9AjYDELRiegjJobfc3467ReBUYUA-auEeyncy3Gd3F7l_sL4sH-aS9RhApMuwOa7LJncu/pub?gid=0&single=true&output=csv';

const container = document.getElementById('celulares');
const timerEl = document.getElementById('timer');
let countdown = 30;

function atualizarTimer() {
  countdown--;
  if (countdown <= 0) {
    carregarDados();
    countdown = 30;
  }
  timerEl.textContent = countdown;
}
setInterval(atualizarTimer, 1000);

async function carregarDados() {
  try {
    const resposta = await fetch(sheetURL);
    const texto = await resposta.text();
    const linhas = texto.trim().split('\n').map(l => l.split(','));

    const cabecalhos = linhas[0];
    const dados = linhas.slice(1);

    container.innerHTML = '';

    dados.forEach((linha) => {
      const celular = document.createElement('div');
      celular.className = 'produto-card';

      linha.forEach((valor, i) => {
        if (cabecalhos[i]) {
          const item = document.createElement('p');
          item.innerHTML = `<strong>${cabecalhos[i]}:</strong> ${valor}`;
          celular.appendChild(item);
        }
      });

      const nomeCelular = linha[1] || linha[0];

      const botao = document.createElement('a');
      botao.href = `https://wa.me/5586994907927?text=Olá! Tenho interesse no celular: ${encodeURIComponent(nomeCelular)}`;
      botao.target = '_blank';
      botao.className = 'botao-comprar';
      botao.textContent = '📲 Comprar';

      celular.appendChild(botao);
      container.appendChild(celular);
    });

  } catch (erro) {
    console.error('Erro ao carregar os dados:', erro);
    container.innerHTML = '<p class="text-red-600">Erro ao carregar os dados. Verifique se a planilha está pública.</p>';
  }
}

carregarDados();