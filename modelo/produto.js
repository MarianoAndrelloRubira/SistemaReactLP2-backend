 export default class Produto {
    #cod;
    #marca;
    #nomeProd;
    #precInd;
    #qtd;
    #precLot;
    #precVenda;
    #cate;
    #data;

    constructor(cod = 0, marca = '', nomeProd = '', precInd = 0, qtd = 0, precLot = 0, precVenda = 0, cate = {}, data = '') {
        this.#cod = cod;
        this.#marca = marca;
        this.#nomeProd = nomeProd;
        this.#precInd = precInd;
        this.#qtd = qtd;
        this.#precLot = precLot;
        this.#precVenda = precVenda;
        this.#cate = cate;
        this.#data = data;
    }

    get cod() {
        return this.#cod
    }

    set cod(novoCod) {
        this.#cod = novoCod;
    }

    get marca() {
        return this.#marca
    }

    set marca(novoMarca) {
        this.#marca = novoMarca;
    }

    get nomeProd() {
        return this.#nomeProd
    }

    set nomeProd(novoNomeProd) {
        this.#nomeProd = novoNomeProd;
    }

    get precInd() {
        return this.#precInd
    }

    set precInd(novoPrecInd) {
        this.#precInd = novoPrecInd;
    }

    get qtd() {
        return this.#qtd
    }

    set qtd(novoQtd) {
        this.#qtd = novoQtd;
    }

    get precLot() {
        return this.#precLot
    }

    set precLot(novoPrecLot) {
        this.#precLot = novoPrecLot;
    }

    get precVenda() {
        return this.#precVenda
    }

    set precVenda(novoprecVenda) {
        this.#precVenda = novoprecVenda;
    }

    get cate() {
        return this.#cate
    }

    set cate(novoCate) {
        this.#cate = novoCate;
    }

    get data() {
        return this.#data
    }

    set data(novoData) {
        this.#data = novoData;
    }

    toJSON() {
        return {
            cod: this.#cod,
            marca: this.#marca,
            nomeProd: this.#nomeProd,
            precInd: this.#precInd,
            qtd: this.#qtd,
            precLot: this.#precLot,
            precVenda: this.#precVenda,
            cate: this.#cate.toJSON(),
            data: this.#data
        }
    }

    async gravar() {

    }

    async excluir() {

    }

    async alterar() {

    }

    async consultar() {

    }
}