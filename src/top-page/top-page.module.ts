import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './models/top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  providers: [ConfigService, TopPageService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: TopPageModel.name,
        schema: TopPageSchema,
      },
    ]),
  ],
})
export class TopPageModule {}
