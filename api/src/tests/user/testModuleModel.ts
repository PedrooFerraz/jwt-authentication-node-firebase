import sequelize from '@/config/dbConfig';
import { Module } from '@/models/user/moduleModel';

export async function testModuleModel() {
  try {

    await sequelize.sync({ alter: true });

    const module = await Module.create({
      name: 'Storage',
    });

    console.log('Module criado:', module.toJSON());

    // Buscar todos os registros
    const modules = await Module.findAll();
    console.log('Todos os Modules:', modules.map(u => u.toJSON()));

    // Atualizar
    module.name = "Production";
    await module.save();
    console.log('Module atualizado:', module.toJSON());

    // Deletar
    // await module.destroy();
    // console.log('Module deletado com sucesso.');

    // Finalizar conexão
    await sequelize.close();
  } catch (error) {
    console.error('Error Testing:', error);
  }
}