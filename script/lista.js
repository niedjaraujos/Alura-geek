

const listaProdutos = () => {
    return fetch ("http://localhost:3000/produtos")
    .then((res) => res.json())
    .catch((err) => console.log(err))
};
 const createProduct = (nome, preço, imagem) =>{
    return fetch  ("http://localhost:3000/produtos", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome,
            preço,
            imagem,
        }),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};




const removeProduct = (id) =>{
    return fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
        },
    
})
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
export const servicesProduts={
    listaProdutos,
    createProduct,
    removeProduct,
};

