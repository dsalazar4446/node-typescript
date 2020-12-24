import Server from './server/server';
import router from "./router/router";
import MySQL from './mysql/mysql';

const server = Server.init(3000)
server.app.use(router)

MySQL.instance;

server.start(() => {
    console.log('El servidor esta corriendo en el puerto '+ 3000);
    
})