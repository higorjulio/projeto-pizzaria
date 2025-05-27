const form = document.getElementById('pedido-form');
const statusDiv = document.getElementById('status-pedido');
const botaoVoltar = document.getElementById('voltar');

let pedidoAtual = null;

botaoVoltar.addEventListener("click", () =>{
  window.location.href = 'index.html';
})


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
  const pedido = {
    sabor,
    bebida,
    sobremesa,
    endereco: "",
    status: 'Recebido',
    criadoEm: Date.now()
  };
  pedidoAtual = pedido;
  salvarPedido(pedido);
  window.location.href = 'entrega.html';
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
  }
});
