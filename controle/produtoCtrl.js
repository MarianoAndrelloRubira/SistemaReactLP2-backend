import Produto from "../modelo/produto.js";
export default class ProdutoCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const marca = dados.marca;
            const nome = dados.nomeProd;
            const precInd = dados.precInd;
            const qtd = dados.qtd;
            const precLot = dados.precLot;
            const precVenda = dados.precVenda;
            //const cate = new Categoria().consultar(dados.codCat);
            const cate= dados.cate;
            const data = dados.data;

            if (marca && nome && precInd>0 && qtd>=0 && precLot>0 && precVenda>0 && cate && data) {
                const produto = new Produto(0, marca,nome,precInd,qtd,precLot,precVenda,cate,data);
                produto.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": produto.cod,
                        "mensagem": "Produto incluido com sucesso!"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o produto: " + erro.message
                    });
                })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, garanta que todos os campos do produto estejam preenchidos!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um produto!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cod = dados.cod;
            const marca = dados.marca;
            const nome = dados.nomeProd;
            const precInd = dados.precInd;
            const qtd = dados.qtd;
            const precLot = dados.precLot;
            const precVenda = dados.precVenda;
            //const cate = new Categoria().consultar(dados.codCat);
            const cate = dados.cate;
            const data = dados.data;

            if (marca && nome && precInd && qtd && precLot && precVenda && cate && data) {
                const produto = new Produto(cod, marca,nome,precInd,qtd,precLot,precVenda,cate,data);
                produto.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": produto.cod,
                        "mensagem": "Produto atualizado com sucesso!"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o produto: " + erro.message
                    });
                })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, garanta que todos os campos do produto estejam preenchidos!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um produto!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === 'DELETE' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const codigo = dados.cod;
            if (codigo) {
                const produto = new Produto(codigo);
                produto.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": produto.cod,
                        "mensagem": "Produto excluido com sucesso!"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o produto: " + erro.message
                    });
                })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os campos do produto!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos DELETE para excluir um produto!"
            });
        }

    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        //express, por meio do controle de rotas, será preparado para esperar um termo de busca
        const termo = requisicao.params.termo;
        if(!termo){
            termo = "";
        }
        if(requisicao.method === "GET"){
            const produto = new Produto();
            produto.consultar(termo).then((listaProdutos)=>{
                resposta.json({
                    status:true,
                    listaProdutos
                });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possivel obter os produtos: "+erro.message
                    }
                );
            })
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos Get para consultar um produto!"
            });
        }
    }
}