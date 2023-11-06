import categoriaDAO from "../percistencia/categoriaDAO.js";

export default class Categoria {
    //definição dos atributos privatos
    #codCat
    #desCat

    constructor(codCat = 0, desCat = "") {
        this.#codCat = codCat;
        this.#desCat = desCat;
    }

    //metodos de acesso publico

    get codCat() {
        return this.#codCat;
    }
    set codCat(novoCodCat) {
        this.#codCat = novoCodCat;
    }

    get desCat() {
        return this.#desCat;
    }
    set desCat(novoDesCat) {
        this.#desCat = novoDesCat;
    }

    //override do método toJSON

    toJSON() {
        return {
            codCat: this.#codCat,
            desCat: this.#desCat
        }
    }


    // camada de modelo acessa a camada de persistencia

    async gravar() {
        const catDAO = new categoriaDAO();
        await catDAO.gravar(this);
    }

    async excluir() {
        const catDAO = new categoriaDAO();
        await catDAO.excluir(this);
    }

    async atualizar() {
        const catDAO = new categoriaDAO();
        await catDAO.atualizar(this);
    }

    async consultar(parametro) {
        const catDAO = new categoriaDAO();
        return await catDAO.consultar(parametro);
    }

}