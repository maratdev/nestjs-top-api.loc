import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Injectable,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('top-page')
@Injectable()
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return await this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return await this.topPageService.findById(id);
  }

  @Get('alias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    return await this.topPageService.findByAlias(alias);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return await this.topPageService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    return await this.topPageService.update(id, dto);
  }

  @UsePipes(new IdValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return await this.topPageService.findByCategory(dto.firstCategory);
  }

  @Get('search/:keyword')
  async txtSearch(@Param('keyword') keyword: string) {
    return await this.topPageService.search(keyword);
  }
}
