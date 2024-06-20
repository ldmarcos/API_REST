import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController{

    static async listarLivros(req, res){
        try{
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        }catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao acessar os livros`});
        }
    };

    static async listarLivroPorId(req, res){
        try{
            const id = req.params.id;
            const listarLivro = await livro.findById(id);
            res.status(200).json(listarLivro);
        }catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao acessar o livro`});
        }
    };

    static async cadastrarLivro(req, res){
        const novoLivro = req.body;
        try{
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}};
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({message: "criado com sucesso", livro: livroCriado});
        }catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar o livro`});
        }
    };

    static async atualizarLivro(req, res){
        try{
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualizado"});
        }catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao atualizar o livro`});
        }
    };

    static async deletarLivro(req, res){
        try{
            const id = req.params.id;
            await livro.findByIdAndDelete(id, req.body);
            res.status(200).json({message: "Livro deletado"});
        }catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao deletar o livro`});
        }
    };

    static async listarLivrosPorFiltro(req, res){
        const {editora, titulo} = req.query;
        try{
            const livrosPorEditora = await livro.find({
                editora: editora,
                titulo: titulo
            });
            res.status(200).json(livrosPorEditora);
        }catch (erro){
            res.status(500).json({message: `${erro.message} - falha na busca`});
        }
    }
};

export default LivroController;