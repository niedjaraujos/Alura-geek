
import { servicesProduts } from "./lista.js";

const produtosCard = document.querySelector("[data-lista]");
const adicionaProduto = document.querySelector("[data-form]");

function createElement(id, nome, preço, imagem) {
    const addCard = document.createElement("div");
    addCard.classList.add("card");

    addCard.innerHTML = `
<img src="${imagem}" alt="${nome}">
<h3 class="informacao">${nome}</h3>
<div class="valor__delete">
    <h2 class="informacao">${preço}</h2>
    <button><img src="img/Vector.png" alt="botao excluir" id="lixeira" data-delete data-id="${id}"></button>
</div>
`
    produtosCard.appendChild(addCard);
    return addCard;
};

const render = async () => {
    try {
        const produtos = await servicesProduts.listaProdutos();

        produtos.forEach(produtos => {
            produtosCard.appendChild(
                createElement(produtos.id, produtos.nome, produtos.preço, produtos.imagem)
            );

        });

    } catch (error) {
        console.log(error);
    }
};

adicionaProduto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.querySelector("[data-name]").value;
    const preço = document.querySelector("[data-price]").value;
    const imagem = document.querySelector("[data-image]").value;


    servicesProduts.createProduct(nome, preço, imagem)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
});


/*produtosCard.removeEventListener("click", (e) => {
    e.preventDefault();
    const productElement = document.querySelector(`img src="img/Vector.png" alt="botao excluir" id="lixeira" data-id="${id}"`);

    produtos.forEach(produtos => {
        produtosCard.removeChild(
            productElement(produtos.id, produtos.nome, produtos.preço, produtos.imagem)
        );

    });

    servicesProduts.removeProduct(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    productElement.remove();
});*/

produtosCard.addEventListener('click', async (e) => {
    const deleteButton = e.target.closest('[data-delete]');

    if (deleteButton) {
        const cardElement = deleteButton.closest('.card'); // Encontra o elemento pai com a classe 'card'
        const id = deleteButton.dataset.id; // Salva o valor da id do produto

        if (cardElement) {
            // Verifica se o elemento 'card' foi encontrado
            try {
                await servicesProduts.removeProduct(id);
                cardElement.remove();
            } catch (err) {
                console.log(err);
                alert('Erro ao remover o produto. Por favor, tente novamente.');
            }
        }
    }
});

render();














