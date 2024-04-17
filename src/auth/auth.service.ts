import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { AuthModel } from './models/auth.model';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from './constants/auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name) private readonly userModel: Model<AuthModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10); // 10 is the number of rounds
    const newUser = new this.userModel({
      email: dto.login,
      password: await hash(dto.password, salt),
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<AuthModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    return { email: user.email };
  }
  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
