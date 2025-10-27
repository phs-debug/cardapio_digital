let carrinho = [];

// ----------------------
// FUNÇÕES DO W3.CSS PARA O MENU DE ABAS (GLOBAL)
// ----------------------
function openMenu(evt, menuName) {
    var i, x, tablinks;
    
    // Oculta todas as seções de menu
    x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    
    // Remove o destaque (w3-red) de todos os botões de aba
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }
    
    // Mostra a aba clicada (se for o primeiro clique, o evento abrirá a seção)
    document.getElementById(menuName).style.display = "block";
    
    // Adiciona o destaque "w3-red" ao botão clicado
    if (evt) evt.currentTarget.className += " w3-red";
}

// REMOVIDA A LINHA: openMenu(null, 'burguers');
// O menu agora carrega fechado por padrão.


// ----------------------
// FUNÇÕES DE CÁLCULO E MANIPULAÇÃO DO CARRINHO
// ----------------------

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
    } else if (operacao === 'remover') {
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

    // Atualiza o MODAL DETALHADO
    listaCarrinho.innerHTML = ''; 
    
    carrinho.forEach((item, index) => {
        const subtotal = (item.preco * item.quantidade);
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #ccc; padding: 10px 0;">
                <div style="flex-grow: 1;">
                    <strong>${item.nome}</strong> 
                    <p style="margin: 0; font-size: 0.9em; color: gray;">R$ ${item.preco.toFixed(2).replace('.', ',')} / un.</p>
                </div>
                
                <div style="display: flex; align-items: center; margin: 0 15px;">
                    <button onclick="alterarQuantidade(${index}, 'remover')" class="w3-button w3-tiny w3-round w3-border w3-border-red" style="padding: 5px 10px; font-weight: bold; cursor: pointer; color: #ea1d2c;">-</button>
                    <span style="padding: 0 10px;">${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${index}, 'adicionar')" class="w3-button w3-tiny w3-round w3-red" style="padding: 5px 10px; font-weight: bold; cursor: pointer;">+</button>
                </div>
                
                <strong>R$ ${subtotal.toFixed(2).replace('.', ',')}</strong>
            </div>
        `;
        listaCarrinho.appendChild(li);
    });

    document.getElementById('total-carrinho').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}


// ----------------------
// LISTENERS DE EVENTOS (Inicialização - Carrega após o DOM)
// ----------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ligar o botão "Adicionar" de cada item do menu
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
    
    // 2. Ligar o botão "Ver Carrinho" da barra flutuante para abrir o modal
    document.getElementById('btn-ver-carrinho').addEventListener('click', () => {
        document.getElementById('carrinho-modal').style.display = 'block';
    });
    
    // 3. Ligar o botão "Fechar e Continuar Comprando" do modal
    document.getElementById('btn-fechar-modal').addEventListener('click', () => {
        document.getElementById('carrinho-modal').style.display = 'none';
    });
    
    // 4. Fechar o modal clicando na área escura (fundo)
    document.getElementById('carrinho-modal').addEventListener('click', (event) => {
        if (event.target.id === 'carrinho-modal') {
             document.getElementById('carrinho-modal').style.display = 'none';
        }
    });
});
