let BaseDAO = require('./BaseDAO')();
class MembroDAO extends BaseDAO {
    
    constructor(app) {
        super(app);
    }


    buscarMembro(membro, callback) {
        this.getConn().query("SELECT * FROM membro WHERE nomedeusuario = ?", membro, this.enviaResposta(callback));
    }

    cadastrar(obj, callback) {
        this.getConn().query("INSERT INTO membro SET ?", obj, this.enviaResposta(callback));
    }

}

module.exports = function() {
    return MembroDAO;
}