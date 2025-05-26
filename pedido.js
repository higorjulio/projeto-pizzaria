const form = document.getElementById('pedido-form');
const statusDiv = document.getElementById('status-pedido');
const botaoVoltar = document.getElementById('voltar');

let pedidoAtual = null;

botaoVoltar.addEventListener("click", () =>{
  window.location.href = 'index.html';
})

// Modificar a mensagem de status
function mostrarStatus(status, tempoRestante = null) {
  let msg = `<b>Status do pedido:</b> ${status}`;
  if (tempoRestante !== null) {
    msg += `<br><small>Tempo restante para entrega: ${tempoRestante} min</small>`;
  }
  statusDiv.innerHTML = msg;
}

// Tempo de entrega
function iniciarPedido(pedido) {
  mostrarStatus('Pedido recebido! Aguardando confirmação...', 5);
  // 1 minuto: Aceito
  setTimeout(() => {
    mostrarStatus('Pedido aceito! Preparando...', 4);
    pedido.status = 'Aceito';
    salvarPedido(pedido);
  }, 60 * 1000); //60 segundos * 1000 milissegundos
  // 2 minutos: Saiu para entrega
  setTimeout(() => {
    mostrarStatus('Saiu para entrega!', 3);
    pedido.status = 'Saiu para entrega';
    salvarPedido(pedido);
  }, 2 * 60 * 1000);
  // 5 minutos: Entregue
  setTimeout(() => {
    mostrarStatus('Pedido entregue! Bom apetite!', 0);
    pedido.status = 'Entregue';
    salvarPedido(pedido);
  }, 5 * 60 * 1000);
}

// Salva pedido no localStorage
function salvarPedido(pedido) {
  localStorage.setItem('pedido', JSON.stringify(pedido));
}

// Remove pedido do localStorage
function limparPedido() {
  localStorage.removeItem('pedido');
}

// Ao enviar o formulário
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const sabor = form.sabor.value;
  const bebida = form.bebida.value;
  const sobremesa = form.sobremesa.value;
  const endereco = form.endereco.value;
  const pedido = {
    sabor,
    bebida,
    sobremesa,
    endereco,
    status: 'Recebido',
    criadoEm: Date.now()
  };
  pedidoAtual = pedido;
  salvarPedido(pedido);
  iniciarPedido(pedido);
});

// Ao carregar a página, verifica se já existe pedido em andamento
window.addEventListener('DOMContentLoaded', () => {
  const salvo = localStorage.getItem('pedido');
  if (salvo) {
    const pedido = JSON.parse(salvo);
    pedidoAtual = pedido;

    // Calcula quanto tempo já passou e limpa o pedido se expirou
    let minutos = Math.floor((Date.now() - pedido.criadoEm) / 60 *1000);
    if (minutos >= 5 && pedido.status == 'Entregue') {
      mostrarStatus('Pedido expirado! Por favor, faça um novo pedido.', 0);
      limparPedido();
    }
    // Preenche campos
    form.sabor.value = pedido.sabor;
    form.bebida.value = pedido.bebida;
    form.sobremesa.value = pedido.sobremesa;
    form.endereco.value = pedido.endereco;
  }
});
