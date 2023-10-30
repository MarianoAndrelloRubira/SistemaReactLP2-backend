import Produto from './modelo/produto.js'
import Categoria from './modelo/categoria.js'

const categoria = new Categoria(1,'Calçados Infantis');
const produto = new Produto(1,'Nike','XXXX',50,10,500,55,categoria,'indeterminada');

console.log(produto.toJSON());