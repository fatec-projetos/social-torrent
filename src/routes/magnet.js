module.exports = function (app) {
    app.get('/api/magnet/:s', function (req, res) {
        let magnet = new app.dao.LinkMagneticoDAO(app);
        magnet.pesquisar(req.params.s, (err, result) => {
            err ? res.status(412).json(err) : res.json(result);
        });
    });

    app.get('/api/magnet-user', function (req, res) {
        let magnet = new app.dao.LinkMagneticoDAO(app);
        magnet.recuperaByUsuarioId(req.membroLogado.id, (err, result) => {
            err ? res.status(412).json(err) : res.json(result);
        });
    });

    // adiciona um novo link
    app.post('/api/magnet', function (req, res) {
        let magnet = new app.dao.LinkMagneticoDAO(app);
        let obj = {
            id_usuario: req.membroLogado.id,
            titulo: req.body.titulo,
            imagem_url: req.body.imagem_url,
            link_magnetico: req.body.link_magnetico,
        };
        magnet.inserir(obj, (err, result) => {
            err ? res.status(412).json(err) : res.json('Link Magnético salvo com sucesso.');
        });
    });

    // editar link magnético
    app.put('/api/magnet', function (req, res) {
        let magnet = new app.dao.LinkMagneticoDAO(app);
        let obj = {
            titulo: req.body.titulo,
            imagem_url: req.body.imagem_url,
            link_magnetico: req.body.link_magnetico,
        };
        
        magnet.getLinkById(req.body.id, (err, result) => {

            if(err) {
                return res.status(412).json(err);
            } else if(result.length == 0) {
                return res.status(412).json("Link Magnético não disponível");
            } else if (result[0].id_usuario != req.membroLogado.id) {
                return res.status(412).json("Link Magnético não pertence ao seu usuário");
            }
            
            // concluindo a edição
            magnet.editar(req.body.id, obj, (err, result) => {
                err ? res.status(412).json(err) : res.json('Link Magnético atualizado com sucesso.');
            });
        });
    });

    // remover um link
    app.delete('/api/magnet/:id', function (req, res) {
        let magnet = new app.dao.LinkMagneticoDAO(app);
        
        magnet.getLinkById(req.params.id, (err, result) => {

            if(err) {
                return res.status(412).json(err);
            } else if(result.length == 0) {
                return res.status(412).json("Link Magnético não disponível");
            } else if (result[0].id_usuario != req.membroLogado.id) {
                return res.status(412).json("Link Magnético não pertence ao seu usuário");
            }

            // concluindo a edição
            magnet.apagar(req.params.id, (err, result) => {
                err ? res.status(412).json(err) : res.json('Link Magnético removido com sucesso.');
            });
        });
    });
}