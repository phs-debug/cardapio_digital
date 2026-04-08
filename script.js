let carrinho = [];

function openMenu(evt, menuName) {
    let i, x, tablinks;

    x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }

    document.getElementById(menuName).style.display = "block";

    if (evt) evt.currentTarget.className += " w3-red";
}



function calcularTotal() {
    return carrinho.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
    }, 0);
}

function adicionarAoCarrinho(itemData) {
    const precoFloat = parseFloat(itemData.preco.replace(',', '.'));
    const itemExistente = carrinho.find(c => c.id === itemData.id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: itemData.id,
            nome: itemData.nome,
            preco: precoFloat,
            quantidade: 1
        });
    }

    atualizarUIcarrinho();
}

function alterarQuantidade(index, operacao) {
    if (operacao === 'adicionar') {
        carrinho[index].quantidade++;
    } else {
        carrinho[index].quantidade--;

        if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
        }
    }

    atualizarUIcarrinho();
}

function atualizarUIcarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const total = calcularTotal();
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    const carrinhoFlutuante = document.getElementById('carrinho-flutuante');
    const carrinhoResumo = document.getElementById('carrinho-resumo');

    const totalFormatado = total.toFixed(2).replace('.', ',');

    carrinhoResumo.textContent = `${totalItens} ${totalItens === 1 ? 'item' : 'itens'} | R$ ${totalFormatado}`;

    if (carrinho.length === 0) {
        carrinhoFlutuante.style.display = 'none';
        document.getElementById('carrinho-modal').style.display = 'none';
    } else {
        carrinhoFlutuante.style.display = 'block';
    }

    listaCarrinho.innerHTML = '';

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;

        const li = document.createElement('li');
        li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #ccc; padding: 10px 0;">
                
                <div style="flex-grow: 1;">
                    <strong>${item.nome}</strong>
                    <p style="margin: 0; font-size: 0.9em; color: gray;">
                        R$ ${item.preco.toFixed(2).replace('.', ',')} / un.
                    </p>
                </div>

                <div style="display: flex; align-items: center; margin: 0 15px;">
                    <button onclick="alterarQuantidade(${index}, 'remover')" class="w3-button w3-tiny w3-round w3-border w3-border-red" style="padding: 5px 10px; color: #ea1d2c;">-</button>
                    <span style="padding: 0 10px;">${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${index}, 'adicionar')" class="w3-button w3-tiny w3-round w3-red" style="padding: 5px 10px;">+</button>
                </div>

                <strong>R$ ${subtotal.toFixed(2).replace('.', ',')}</strong>
            </div>
        `;
        listaCarrinho.appendChild(li);
    });

    document.getElementById('total-carrinho').textContent =
        `R$ ${total.toFixed(2).replace('.', ',')}`;
}



document.addEventListener('DOMContentLoaded', () => {

    
    document.querySelectorAll('.carrinho').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemCard = event.target.closest('.item-card');

            const itemData = {
                id: itemCard.getAttribute('data-id'),
                nome: itemCard.getAttribute('data-nome'),
                preco: itemCard.getAttribute('data-preco')
            };

            adicionarAoCarrinho(itemData);
        });
    });

  
    document.getElementById('btn-ver-carrinho').addEventListener('click', () => {
        document.getElementById('carrinho-modal').style.display = 'block';
    });


    document.getElementById('btn-fechar-modal').addEventListener('click', () => {
        document.getElementById('carrinho-modal').style.display = 'none';
    });


    document.getElementById('carrinho-modal').addEventListener('click', (event) => {
        if (event.target.id === 'carrinho-modal') {
            event.target.style.display = 'none';
        }
    });

    
    document.getElementById('btn-pagamento').addEventListener('click', () => {
        document.getElementById('pagamento-opcoes').style.display = 'block';
    });


    const radiosPagamento = document.querySelectorAll('input[name="pagamento"]');
    const btnFinalizar = document.getElementById('btn-finalizar-pedido');

    radiosPagamento.forEach(radio => {
        radio.addEventListener('change', () => {
            btnFinalizar.style.display = 'block';
        });
    });

  
    document.getElementById('btn-finalizar-pedido').addEventListener('click', () => {

        const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked');

        if (!pagamentoSelecionado) {
            alert("Selecione uma forma de pagamento!");
            return;
        }

        document.getElementById('carrinho-modal').style.display = 'none';
        document.getElementById('confirmacao-modal').style.display = 'block';

        carrinho = [];
        atualizarUIcarrinho();
    });

    document.getElementById('btn-fechar-confirmacao').addEventListener('click', () => {

        document.getElementById('confirmacao-modal').style.display = 'none';

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
