import Categoria from "../modelo/categoria.js"
import conectar from "./conexao.js";

export default class categoriaDAO {
    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "INSERT INTO categoria (cat_DesCat) VALUES(?)"
            const parametros = [categoria.desCat];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            categoria.codCat = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }

    }
    async atualizar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "UPDATE categoria SET cat_desCat = ?  WHERE cat_codCat = ?;"
            const parametros = [categoria.codCat, categoria.desCat];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            categoria.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }

    }
    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "DELETE FROM categoria WHERE cat_codCat = ?;"
            const parametros = [categoria.codCat];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            categoria.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }

    }
    async consultar(parametroConsulta) {
        let sql='';
        let parametros=[];
        if(!isNaN(parseInt(parametroConsulta)))
        {
            sql='SELECT * FROM categoria WHERE cat_codCat = ? order by cat_desCat';
        }
        else
        {
            if(!parametroConsulta)
            {
                parametroConsulta = '';
            }
            else
            {
                sql = "SELECT * FROM categoria WHERE cat_desCat like ?"
                parametros = ['%'+parametroConsulta+'%']
            }
        }
        const conexao = await conectar();
        const [registros,campos]= await conexao.execute(sql,parametros);
        let listaCategorias = [];
        for(const registro of registros){
            const categoria = new Categoria(registro.cat_codCat,registro.cat_desCat);
            listaCategorias.push(categoria);
        }
        return listaCategorias;
    }
}