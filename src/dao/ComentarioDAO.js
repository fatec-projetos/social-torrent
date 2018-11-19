let BaseDAO = require('./BaseDAO')();
class ComentarioDAO extends BaseDAO {
    
    constructor(app) {
        super(app);
    }

    listar(linkId, callback) {
        this.getConn().query("SELECT c.*, m.nome, m.nomedeusuario FROM comentario c INNER JOIN membro m ON m.id = c.id_usuario WHERE c.`id_link-magnetico`=?", [linkId],this.enviaResposta(callback));
    }

    getById(id, callback) {
        this.getConn().query("SELECT c.*, m.* FROM comentario c INNER JOIN membro m ON m.id = c.id_usuario WHERE c.`id`=?", [id],this.enviaResposta(callback));
    }

    inserir(obj, callback) {
        this.getConn().query("INSERT INTO comentario SET ?", obj, this.enviaResposta(callback));
    }
    apagar(id, callback) {
        this.getConn().query("DELETE FROM comentario WHERE id=?", id, this.enviaResposta(callback));
    }

    apagarComentarioComIdLink(idLink, callback) {
        this.getConn().query("DELETE FROM comentario WHERE `id_link-magnetico`=?", idLink, this.enviaResposta(callback));
    }
}

module.exports = function() {
    return ComentarioDAO;
}