module.exports = function (app) {
    // adiciona um novo comentário
    app.post('/api/comentario', function (req, res) {
        let comentariodao = new app.dao.ComentarioDAO(app);
        let obj = {
            id_usuario: req.membroLogado.id,
            data: new Date(),
            "id_link-magnetico": req.body["id_link-magnetico"],
            comentario: req.body.comentario,
            estrelas: req.body.estrelas,
        };

        comentariodao.inserir(obj, (err, result) => {
            res.json(err ? err : 'Comentário adicionado com sucesso.');
        });
    });

    // recupera comentários de um torrent
    app.get('/api/comentario/:id_link', function (req, res) {
        let comentariodao = new app.dao.ComentarioDAO(app);

        comentariodao.listar(req.params.id_link, (err, result) => {
            res.json(err ? err : result);
        });
    });
    
    // remove o comentário
    app.delete('/api/comentario/:id', function (req, res) {
        let comentariodao = new app.dao.ComentarioDAO(app);
        comentariodao.getById(req.params.id, (err, result) => {
            if(err) {
                return res.status(412).json(err);
            } else if(result.length == 0) {
                return res.status(412).json("Comentário não disponível");
            } else if (result[0].id_usuario != req.membroLogado.id) {
                return res.status(412).json("Comentário não pertence ao seu usuário");
            }

            comentariodao.apagar(req.params.id, (err, result) => {
                res.json(err ? err : "Comentário removido com sucesso");
            });
        });
    });
}