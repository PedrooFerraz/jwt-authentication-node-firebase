import sequelize from '@/config/dbConfig';
import { Users } from '@/models/user/userModel';

export async function testUserModel() {
  try {

    await sequelize.sync({ alter: true });

    const user = await Users.create({
      name: 'Pedro Ferraz',
      uid: '123456789101112131415161718',
      email: 'pedro@phflima.com.br',
    });

    console.log('User criado:', user.toJSON());

    // Buscar todos os registros
    const users = await Users.findAll();
    console.log('Todos os User:', users.map(u => u.toJSON()));

    // Atualizar
    user.name = "Pedro Lima";
    await user.save();
    console.log('User atualizado:', user.toJSON());

    // Deletar
    // await user.destroy();
    // console.log('User deletado com sucesso.');

    // Finalizar conexão
    await sequelize.close();
  } catch (error) {
    console.error('Error Testing:', error);
  }
}