import Server from './services/server';
import dotenv from 'dotenv'

dotenv.config()

const puerto = process.env.PORT || 8080;

Server.listen(puerto, () => console.log(`Server up puerto ${puerto}`));
