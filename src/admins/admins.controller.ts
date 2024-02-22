import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminEntity } from './entities/admin.entity';

@Controller('admins')
@ApiTags('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiCreatedResponse({ type: AdminEntity })
  async create(@Body() createAdminDto: CreateAdminDto) {
    return new AdminEntity(await this.adminsService.create(createAdminDto));
  }

  @Get()
  @ApiOkResponse({ type: AdminEntity, isArray: true })
  async findAll() {
    const admins = await this.adminsService.findAll();
    return admins.map((admin) => new AdminEntity(admin));
  }

  @Get(':id')
  @ApiOkResponse({ type: AdminEntity })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new AdminEntity(await this.adminsService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: AdminEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return new AdminEntity(await this.adminsService.update(id, updateAdminDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: AdminEntity })
  async remove(@Param('id') id: string) {
    return new AdminEntity(await this.adminsService.remove(id));
  }
}
