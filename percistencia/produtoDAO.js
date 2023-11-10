import Categoria from "../modelo/categoria.js";
import Produto from "../modelo/produto.js";
import Categoria from "../modelo/categoria.js";
import conectar from "./conexao.js"

export default class produtoDAO {
    async gravar(produto) {
        if (produto instanceof Produto) {
            const sql = `INSERT INTO produto(prod_marca,prod_nomeProd,prod_precInd,prod_qtd,prod_precLot,prod_precVenda,cat_codCat,prod_data)
            VALUES(?,?,?,?,?,?,?,?)`;
            const parametros = [produto.marca, produto.nomeProd, produto.precInd, produto.qtd, produto.precLot, produto.precVenda, produto.cate.codCat,produto.data];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            produto.cod = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(produto) {
        if (produto instanceof Produto) {
            const sql = `UPDATE produto SET prod_marca=?,prod_nomeProd=?,prod_precInd=?,prod_qtd=?
        ,prod_precLot=?,prod_precVenda=?,cat_codCat=?,prod_data=? WHERE prod_cod = ?`;
            const parametros = [produto.cod,produto.marca, produto.nomeProd, produto.precInd, produto.qtd, produto.precLot, produto.precVenda, produto.cate.codCat,produto.data];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(produto) {
        if(produto instanceof Produto)
        {
            const sql = `DELETE FROM produto WHERE prod_cod = ?`;
            const parametros = [produto.cod];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async consultar(termo) {
        if(!termo)
            termo="";
        const conexao = await conectar();
        let listaProdutos=[];
        if(!isNaN(Number(termo)))
        {
            //consulta com o codigo 
            const sql = `SELECT p.prod_cod,p.prod_marca,p.prod_nomeProd,p.prod_precInd,p.prod_qtd,p.prod_precLot,
            p.prod_precVenda,p.prod_data,c.cat_codCat,c.cat_desCat
            FROM produto p INNER JOIN categoria c ON p.cat_codCat = c.cat_codCat
             WHERE p.prod_cod = ? ORDER BY p.prod_descricao`;
            const parametros=[termo];
            const [registros,campos] = await conexao.execute(sql,parametros);
            for(const registro of registros)
            {
                const categoria = new Categoria(registro.cat_codCat,registro.cat_desCat);
                const produto = new Produto(registro.prod_cod,registro.prod_marca,registro.prod_nomeProd,registro.prod_precInd,registro
                .prod_qtd,registro.prod_precLot,
                    registro.prod_precVenda,categoria,registro.prod_data);
                listaProdutos.push(produto);
            }
        }
        else
        {
            const sql = `SELECT p.prod_cod,p.prod_marca,p.prod_nomeProd,p.prod_precInd,p.prod_qtd,p.prod_precLot,
            p.prod_precVenda,p.prod_data,c.cat_codCat,c.cat_desCat
            FROM produto p INNER JOIN categoria c ON p.cat_codCat = c.cat_codCat
             WHERE p.prod_marca LIKE ? ORDER BY p.prod_descricao`;
            const parametros=["%"+termo+"%"];
            const [registros,campos] = await conexao.execute(sql,parametros);
            for(const registro of registros)
            {
                const categoria = new Categoria(registro.cat_codCat,registro.cat_desCat);
                const produto = new Produto(registro.prod_cod,registro.prod_marca,registro.prod_nomeProd,registro.prod_precInd,registro
                .prod_qtd,registro.prod_precLot,
                    registro.prod_precVenda,categoria,registro.prod_data);
                listaProdutos.push(produto);
            }
        }
        return listaProdutos;
    }
}