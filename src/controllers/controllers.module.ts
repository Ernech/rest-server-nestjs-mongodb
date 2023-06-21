import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ServicesModule } from 'src/services/services.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports:[ServicesModule],
  controllers: [UserController, AuthController]
})
export class ControllersModule {}
