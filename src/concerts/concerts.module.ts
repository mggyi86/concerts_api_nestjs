import { Module } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ConcertsController],
  providers: [ConcertsService],
  imports: [PrismaModule],
})
export class ConcertsModule {}
