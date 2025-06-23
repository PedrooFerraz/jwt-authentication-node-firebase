import sequelize from '@/config/dbConfig';
import { Permission } from '@/models/user/permissionModel';

export async function testPermissionModel() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
    }
    const permission = await Permission.create({
      user_id: 1,
      module_id: 1,
      can_read: true,
      can_write: true,
      can_delete: true
    });
    console.log('ermissão criada:\n', permission.toJSON());

    const permissions = await Permission.findAll();
    console.log('Todas as permissões:\n', permissions.map(p => p.toJSON()));

    permission.can_delete = false;
    await permission.save();
    console.log('Permissão atualizada:\n', permission.toJSON());

    // await permission.destroy();
    // console.log('Permissão deletada com sucesso.');

  } catch (error) {
    console.error('Erro ao testar Permission:', error);
  } finally {
    await sequelize.close();
  }
}