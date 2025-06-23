import { Sequelize } from 'sequelize';
import env from 'dotenv';
env.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
        host: process.env.MYSQL_HOST as string,
        dialect: 'mysql',
        logging: console.log
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Succsefully connected to the database');
    })
    .catch((err: any) => {
        console.error('Error trying to connect with database: ', err);
    });

export default sequelize;