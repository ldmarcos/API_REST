import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";

const app = express(); //importa os metodos da biblioteca express para a variavel app
app.use(express.json);
const conexao_db = await conectaNaDatabase();
conexao_db.on("error", (erro)=>{
    console.error('Erro de conexão: ',erro);
})
conexao_db.once("open", ()=>{
    console.log('Conexao com o banco de dados feita com sucesso')
})

// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next)=>{
    if(erro instanceof mongoose.Error.CastError){
        res.status(400).send({message: 'Um dos dados fornecidos estão incorretos.'})
    }else{
        res.status(500).send({message: "Erro interno no servidor!"})
    }
    
})

routes(app);

export default app;