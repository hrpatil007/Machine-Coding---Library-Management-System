import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /users - Create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // GET /users/:id - Get a user by ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  // GET /users - List all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // PUT /users/:id - Update user by ID (optional)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, body);
  }

  // DELETE /users/:id - Delete user by ID (optional)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
