import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
})
export class GuardsModule {}
