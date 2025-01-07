import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { ICreateUser, IUpdateUser, IUser } from './users.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUser: ICreateUser): Promise<IUser> {
    const user = await this.userRepository.create(createUser);
    return this.userRepository.save(user);
  }

  async getUsers(): Promise<IUser[]> {
    return this.userRepository.find({ order: { id: 'ASC' } });
  }

  async getUserById(user_id: number): Promise<IUser | null> {
    return this.userRepository.findOne({ where: { id: user_id } });
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUserById(
    user_id: number,
    updateUser: IUpdateUser,
  ): Promise<void> {
    await this.userRepository.update(user_id, updateUser);
    const updatedUser = await this.userRepository.findOne({
      where: { id: user_id },
    });
  }

  async deleteUserById(user_id: number): Promise<void> {
    await this.userRepository.delete(user_id);
  }
}
