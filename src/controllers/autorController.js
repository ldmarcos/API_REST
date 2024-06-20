import {autor} from "../models/Autor.js";

class AutorController{

    static async listarAutor(req, res){
        try{
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        }catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao acessar os autores`});
        }
    };

    static async listarAutorPorId(req, res, next){
        try{
            const id = req.params.id;
            const listarAutor = await autor.findById(id);

            if(listarAutor !== null){
                res.status(200).json(listarAutor);
            }else{
                res.status(404).json({message: "Id do autor não localizado"});
            }
            
        }catch (erro) {

            next(erro)
        }
    };

    static async cadastrarAutor(req, res){
        try{
            const novoAutor = await autor.create(req.body);
            res.status(201).json({message: "criado com sucesso", autor: novoAutor});
        }catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar o autor`});
        };
    };

    static async atualizarAutor(req, res){
        try{
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Autor atualizado"});
        }catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao atualizar o autor`});
        }
    };

    static async deletarAutor(req, res){
        try{
            const id = req.params.id;
            await autor.findByIdAndDelete(id, req.body);
            res.status(200).json({message: "Autor deletado"});
        }catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao deletar o autor`});
        };
    };
};

export default AutorController;