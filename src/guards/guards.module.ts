import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ServicesModule } from 'src/services/services.module';
import { TokenGuard } from './token.guard';
import { RoleGuard } from './role.guard';
import { TrimPipe } from './trim.pipe.guard';

@Module({
  imports: [ServicesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TokenGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    {
      provide: APP_PIPE,
      useClass: TrimPipe
    }
  ]
})
export class GuardsModule {}
