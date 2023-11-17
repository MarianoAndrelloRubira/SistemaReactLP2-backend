import Categoria from "../modelo/categoria.js";

export default class CategoriaCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const descricao = dados.desCat;
            if (descricao) {
                const categoria = new Categoria(0, descricao);
                categoria.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": categoria.codCat,
                        "mensagem": "Categoria incluida com sucesso!"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a categoria: " + erro.message
                    });
                })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descricao da categoria!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma categoria!"
            });
        }
    }
    atualizar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const codigo = dados.codCat
            const descricao = dados.desCat;
            if (codigo && descricao) {
                const categoria = new Categoria(codigo, descricao);
                categoria.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": categoria.codCat,
                        "mensagem": "Categoria atualizada com sucesso!"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar a categoria: " + erro.message
                    });
                })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o codigo e a descricao da categoria!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma categoria!"
            });
        }
    }
    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === 'DELETE' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const codigo = dados.codCat
            if (codigo) {
                const categoria = new Categoria(codigo);
                categoria.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": categoria.codCat,
                        "mensagem": "Categoria excluida com sucesso!"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar a categoria: " + erro.message
                    });
                })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o codigo e a descricao da categoria!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos DELETE para excluir uma categoria!"
            });
        }

    }
    consultar(requisicao, resposta) {
        resposta.type("application/json");
        //express, por meio do controle de rotas, será preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if(!termo){
            termo = "";
        }
        if(requisicao.method === "GET"){
            const categoria = new Categoria();
            categoria.consultar(termo).then((listaCategorias)=>{
                resposta.status(200).json({
                    status:true,
                    listaCategorias
                });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possivel obter as categorias: "+erro.message
                    }
                );
            })
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos Get para consultar uma categoria!"
            });
        }
    }
}