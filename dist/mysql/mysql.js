"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.connection = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: '.nava446',
            database: 'node_db'
        });
        this.connection.connect();
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length == 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log('conectarDB err', err.message);
            }
            this.conectado = true;
            console.log('Base de datos ONLINE');
        });
    }
}
exports.default = MySQL;
