import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../database/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import {
  ILogin,
  ILoginResponse,
  IRegistration,
  IRegistrationResponse,
} from '../database/auth/auth.interface';
import * as bcrypt from 'bcrypt';
import { IUser } from '../database/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registration(
    credentials: IRegistration,
  ): Promise<IRegistrationResponse> {
    const { email, password, first_name, last_name, birth_date } = credentials;

    const candidate = await this.usersRepository.getUserByEmail(email);

    if (candidate) {
      throw new ConflictException(`This email ${email} already registered`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      birth_date: birth_date || null,
      balance: '0',
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  async login(credentials: ILogin): Promise<ILoginResponse> {
    const { email, password } = credentials;

    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not fount');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    const payload = { user_id: user.id };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
