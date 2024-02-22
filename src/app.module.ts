import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConcertsModule } from './concerts/concerts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { ReservationLogsModule } from './reservation-logs/reservation-logs.module';

@Module({
  imports: [
    PrismaModule,
    ConcertsModule,
    UsersModule,
    AuthModule,
    AdminsModule,
    AdminAuthModule,
    ReservationLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
