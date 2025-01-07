import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateUser,
  ICreateUserResponse,
  IGetUserByIdResponse,
  IGetUsersResponse,
  IUpdateUser,
  IUser,
} from '../database/users/users.interface';
import { UsersRepository } from '../database/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUser: ICreateUser): Promise<ICreateUserResponse> {
    const existingUser = await this.usersRepository.getUserByName(
      createUser.name,
    );

    if (existingUser) {
      throw new ConflictException(
        `User with name ${createUser.name} already exists`,
      );
    }

    const user: IUser = await this.usersRepository.createUser(createUser);

    return {
      id: user.id,
    };
  }

  async getUsers(): Promise<IGetUsersResponse[]> {
    return this.usersRepository.getUsers();
  }

  async getUserById(user_id: number): Promise<IGetUserByIdResponse> {
    return this.findUserOrFail(user_id);
  }

  async updateUserById(
    user_id: number,
    updateUser: IUpdateUser,
  ): Promise<void> {
    await this.findUserOrFail(user_id);

    await this.usersRepository.updateUserById(user_id, updateUser);
  }

  async deleteUserById(user_id: number): Promise<void> {
    await this.findUserOrFail(user_id);

    await this.usersRepository.deleteUserById(user_id);
  }

  private async findUserOrFail(user_id: number): Promise<IUser> {
    const user = await this.usersRepository.getUserById(user_id);

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    return user;
  }
}
