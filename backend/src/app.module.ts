import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { TestExecutionsModule } from './modules/test-executions/test-executions.module';
import { DemoItemsModule } from './modules/demo-items/demo-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'testaix',
      autoLoadEntities: true,
      migrations: ['dist/migrations/*{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    CollectionsModule,
    TestExecutionsModule,
    DemoItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
