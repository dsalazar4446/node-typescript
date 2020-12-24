import mysql from "mysql";

export default class MySQL {
    private static _instance: MySQL;
    connection: mysql.Connection;
    conectado: boolean = false;
    
    constructor() {
        console.log('Clase inicializada');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '.nava446',
            database: 'node_db'
        });

        this.connection.connect()
        this.conectarDB()
    }


    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    public static ejecutarQuery(query: string, callback: Function) {
        this.instance.connection.query(query,(err, results: Array<Object>, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err)
            }
            if (results.length == 0) {
                callback('El registro solicitado no existe')
            } else {
                callback(null, results )
            }
        })
    }

    private conectarDB() {
        this.connection.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log('conectarDB err',err.message);
            }
            this.conectado = true;
            console.log('Base de datos ONLINE');
            
        })
    }

}

 