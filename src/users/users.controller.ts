import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { GetUsersResponseDto } from './dto/get-users-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserByIdResponseDto } from './dto/get-user-by-id-response.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: CreateUserResponseDto,
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'List of users',
    type: [GetUsersResponseDto],
  })
  async getAllUsers(): Promise<GetUsersResponseDto[]> {
    return this.userService.getUsers();
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ description: 'User details', type: GetUserByIdResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(
    @Param('user_id') user_id: number,
  ): Promise<GetUserByIdResponseDto> {
    return this.userService.getUserById(user_id);
  }

  @Patch(':user_id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'user_id', type: 'number' })
  @ApiOkResponse({ description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUserById(
    @Param('user_id') user_id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUserById(user_id, updateUserDto);
  }

  @Delete(':user_id')
  async deleteUserById(@Param('user_id') user_id: number): Promise<void> {
    return this.userService.deleteUserById(user_id);
  }
}
