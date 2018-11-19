class BaseDAO {
    constructor(app) {
        this._app = app;
    }

    getConn() {
        if(!this._conn) {
            this._conn = this._app.db.connection();
        }
        return this._conn;
    }
    closeConn() {
        if(this._conn) {
            this._conn.end();
            this._conn = null;
        }
    }

    enviaResposta(callback) {
        return (err, res) => {
            callback(err, res);
            this.closeConn();
        };
    }
}

module.exports = function () {
    return BaseDAO;
}