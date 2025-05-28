   let pedido = localStorage.getItem('pedido')
    if (pedido) {
      pedido = JSON.parse(pedido);
    }
    let pedidoObj = {}
let pedidoAtual = null;
    

    document.getElementById("pedido-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const endereco = document.getElementById("endereco").value;
      pedidoObj = {
      pizza: pedido.sabor,
      bebida: pedido.bebida || "Nenhuma",
      sobremesa: pedido.sobremesa || "Nenhuma",
    }
    pedidoObj = pedido
//Seta endereço
    
const statusDiv = document.getElementById('status-pedido');

// Modificar a mensagem de status
function mostrarStatus(status, tempoRestante = null) {
  let msg = `<b>Status do pedido:</b> ${status}`;
  if (tempoRestante !== null) {
    msg += `<br><small>Tempo restante para entrega: ${tempoRestante} min</small>`;
  }
  statusDiv.innerHTML = msg;
}
// Salva pedido no localStorage
function salvarPedido(pedido) {
  localStorage.setItem('pedido', JSON.stringify(pedido));
}
pedido.endereco = endereco;
salvarPedido(pedido);
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
iniciarPedido(pedido);
// Remove pedido do localStorage
function limparPedido() {
  localStorage.removeItem('pedido');
}
// Ao carregar a página, verifica se já existe pedido em andamento
window.addEventListener('DOMContentLoaded', () => {
  const salvo = localStorage.getItem('pedido');
  if (salvo) {
    const pedido = JSON.parse(salvo);
    pedidoAtual = pedido;

    let minutos = Math.floor((Date.now() - pedido.criadoEm) / (1000 * 60));
    if (minutos >= 5 && pedido.status === 'Entregue') {
      mostrarStatus('Pedido expirado! Por favor, faça um novo pedido.', 0);
      limparPedido();
    }
  }
});

});