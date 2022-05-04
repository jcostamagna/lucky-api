import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'luckyapp',
    password: '123',
    database: 'luckyapp'
}

export default config;