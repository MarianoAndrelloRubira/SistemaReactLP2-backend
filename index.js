import Produto from './modelo/produto.js'
import Categoria from './modelo/categoria.js'

//const categoria = new Categoria(1,'Calçados Infantis');

//categoria.gravar().then(()=>{
//    console.log(categoria.id);
//});
const cate = new Categoria();

cate.consultar("calça").then((listaCategorias)=>{
    console.log(listaCategorias);
})

const produto = new Produto(1,'Nike','XXXX',50,10,500,55,cate,'indeterminada');

console.log(produto.toJSON());