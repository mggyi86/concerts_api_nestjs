import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConcertsModule } from './concerts/concerts.module';

@Module({
  imports: [PrismaModule, ConcertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
