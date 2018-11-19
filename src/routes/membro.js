module.exports = function (app) {

    // rota para login
    app.mw.auth.noAuth('/api/login');
    app.post("/api/login", function (req, res) {
        let usuario = req.body.nomedeusuario;
        let senha = req.body.senha;
        if(!usuario || !senha) {
            return res.status(401).json("Usuário e senha são obrigatórios");
        } else {
            let membro = new app.dao.MembroDAO(app);
            membro.buscarMembro(usuario, function(err, result) {
                // devolver alguma coisa
                if(err) {
                    return res.status(401).json(err);
                } else if(!result || result.length <= 0) {
                    return res.status(401).json("usuário não encontrado");
                }

                let m = result[0];
                if(m.senha != senha) {
                    return res.status(401).json("senha inválida para o usuário");
                } else {
                    const payload = {
                        id: m.id,
                        nomedeusuario: m.nomedeusuario
                    };
                    const jwt = app.get('jwt');
                    const uuid = app.get('signKey');
                    const token = jwt.sign(payload, uuid, {
                        expiresIn: 60 * 60 * 24
                    });

                    res.json(token);
                }
            });
        }
    });

    // rota para registro
    app.mw.auth.noAuth('/api/cadastrar');
    app.post("/api/cadastrar", function (req, res, body) {
        let membrodao = new app.dao.MembroDAO(app);
        let obj = {
            nome: req.body.nome,
            nomedeusuario: req.body.nomedeusuario,
            senha: req.body.senha
        };

        membrodao.buscarMembro(obj.nomedeusuario, function(err, result) {
            if(!err && result.length > 0) {
                return res.status(412).json("Erro, usuário "+obj.nomedeusuario+" já encontra-se cadastrado na nossa base de dados.");
            }
            // reabrindo conexão com o banco
            membrodao.cadastrar(obj, function(err2, result2) {
                // devolver alguma coisa
                if(err2) {
                    res.status(412).json(err2);
                }
                res.json("Usuário cadastrado com sucesso");
            });
        });
    });
    
}
