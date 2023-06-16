import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [DatabaseModule, ServicesModule, ControllersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
