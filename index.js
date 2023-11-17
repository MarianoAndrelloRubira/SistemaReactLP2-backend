import express from 'express';
import rotaCategoria from './rotas/rotaCategoria.js';
import rotaProduto from './rotas/rotaProduto.js'
import cors from 'cors';

const host="0.0.0.0"
const porta = 4000;
const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());

app.use('/categoria',rotaCategoria);
app.use('/produto',rotaProduto);
app.listen(porta,host, ()=>{
    console.log(`API do sitema em execução: ${host}:${porta}`)
});