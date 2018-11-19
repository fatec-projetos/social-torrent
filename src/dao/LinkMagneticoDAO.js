let BaseDAO = require('./BaseDAO')();
class LinkMagneticoDAO extends BaseDAO {
    
    constructor(app) {
        super(app);
    }

    getLinkById(id, callback) {
        this.getConn().query("SELECT lm.*, m.nomedeusuario, m.nome FROM `link-magnetico` lm INNER JOIN membro m ON m.id = lm.id_usuario WHERE lm.id=?", [id],this.enviaResposta(callback));
    }

    pesquisar(termo, callback) {
        if(termo == 'all') {
            termo = '';
        }

        this.getConn().query("SELECT lm.*, m.nomedeusuario, m.nome FROM `link-magnetico` lm INNER JOIN membro m ON m.id = lm.id_usuario WHERE lm.titulo LIKE ?", ['%' + termo + '%'],this.enviaResposta(callback));
    }

    recuperaByUsuarioId(id_usuario, callback) {
        this.getConn().query("SELECT lm.*, m.nomedeusuario, m.nome FROM `link-magnetico` lm INNER JOIN membro m ON m.id = lm.id_usuario WHERE lm.id_usuario = ?", [id_usuario],this.enviaResposta(callback));
    }

    inserir(obj, callback) {
        this.getConn().query("INSERT INTO `link-magnetico` SET ?", obj, this.enviaResposta(callback));
    }

    editar(id, obj, callback) {
        /*let obj = {
            id_usuario: body.nome,
            id_link-magnetico: body.nomeusuario,
            comentario: body.comentario,
            data: new Date(),
            estrelas: body.estrelas,
        };*/
        this.getConn().query("UPDATE `link-magnetico` SET ? WHERE id=?", [obj, id], this.enviaResposta(callback));
    }

    apagar(id, callback) {
        let comentarios = new this._app.dao.ComentarioDAO(this._app);
        comentarios.apagarComentarioComIdLink(id, (err, result) => {
            if(err) {
                callback(err);
            } else {
                this.getConn().query("DELETE FROM `link-magnetico` WHERE id=?", id, this.enviaResposta(callback));
            }
        });
    }

}

module.exports = function() {
    return LinkMagneticoDAO;
}