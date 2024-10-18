import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from 'src/utils/configs/typeorm.config';

import * as mysql from 'mysql2/promise';
import { ConfigEnvironmentBaseService } from 'src/base/config/config-environent.base.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const connectionConfig = {
          host: ConfigEnvironmentBaseService.getIns().get<string>('DB_HOST'),
          port: ConfigEnvironmentBaseService.getIns().get<number>('DB_PORT'),
          user: ConfigEnvironmentBaseService.getIns().get<string>(
            'DB_USERNAME',
          ),
          password:
            ConfigEnvironmentBaseService.getIns().get<string>('DB_PASSWORD'),
        };

        const connection = await mysql.createConnection(connectionConfig);

        const dbName =
          ConfigEnvironmentBaseService.getIns().get<string>('DB_NAME');

        const [databases] = await connection.query(
          `SHOW DATABASES LIKE '${dbName}'`,
        );

        if ((databases as any[]).length === 0)
          await connection.query(`CREATE DATABASE ${dbName}`);

        await connection.end();

        return TYPEORM_CONFIG;
      },
    }),
  ],
})
export class DatabaseModule {}
