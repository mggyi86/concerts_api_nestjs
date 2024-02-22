import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminAuthEntity } from './entity/admin-auth.entity';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminEntity } from 'src/admins/entities/admin.entity';

@Controller('admin-auth')
@ApiTags('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AdminAuthEntity })
  login(@Body() { email, password }: AdminLoginDto) {
    return this.adminAuthService.login(email, password);
  }

  @UseGuards(AdminAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOkResponse({ type: AdminEntity, isArray: true })
  getProfile(@Request() req) {
    return new AdminEntity(req.user);
  }
}
