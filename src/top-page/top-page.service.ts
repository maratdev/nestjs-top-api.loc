import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageModel } from './models/top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { Model } from 'mongoose';
import { NOT_FOUND } from './constants';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private readonly topPageModel: Model<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    const topPage = await this.topPageModel.findById(id).exec();
    if (!topPage) {
      throw new NotFoundException(NOT_FOUND);
    }
    return topPage;
  }

  async findByAlias(alias: string) {
    const topPage = await this.topPageModel.findOne({ alias }).exec();
    if (!topPage) {
      throw new NotFoundException(NOT_FOUND);
    }
    return topPage;
  }

  async findAll() {
    return await this.topPageModel.find({}).exec();
  }

  async delete(id: string) {
    const deletePage = await this.topPageModel.findByIdAndDelete(id).exec();
    if (!deletePage) {
      throw new NotFoundException(NOT_FOUND);
    }
    return deletePage;
  }

  async update(id: string, dto: CreateTopPageDto) {
    const updatePage = await this.topPageModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
    if (!updatePage) {
      throw new NotFoundException(NOT_FOUND);
    }
    return updatePage;
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    const topPages = await this.topPageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
    if (!topPages) {
      throw new NotFoundException(NOT_FOUND);
    }
    return topPages;
  }

  async search(query: string) {
    const topPages = await this.topPageModel
      .find({
        $text: {
          $search: query,
          $caseSensitive: false,
        },
      })
      .exec();
    if (!topPages) {
      throw new NotFoundException(NOT_FOUND);
    }
    return topPages;
  }
}
