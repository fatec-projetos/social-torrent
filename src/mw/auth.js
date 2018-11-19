module.exports = function(app) {
    var _autorizados = [];

    /**
     * Libera uma rota sem autenticação
     */
    this.noAuth = function (uri) {
        if(_autorizados.indexOf(uri) === -1) {
            console.warn(`[WARN] Rota "${uri}" liberada sem autenticação`);
            _autorizados.push(uri);
        }
    };

    // blindando apenas a api
    app.use("/api/*", (req, res, next) => {
        if(_autorizados.indexOf(req.originalUrl) > -1) {
            next();
        } else {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            if(!token) {
                res.status(401).send('Usuário não autenticado.');
                return;
            }
    
            let jwt = app.get('jwt');

            jwt.verify(token, app.get('signKey'), (err, decoded) => {
                if(err) {
                    res.status(401).send('Erro ao validar o token');
                    return;
                }
    
                req.membroLogado = decoded;
                next();
            });        
        }
    });

    return this;
}