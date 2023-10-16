import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}
  @Get('list')
  getAllUser() {
    return this.userservice.getAllUser();
  }
  @Post('create')
  createUser(@Body() payload: CreateUserDto) {
    return this.userservice.createUser(payload);
  }

  @Put('update/:id')
  updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userservice.updateUser(Number(id), payload);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userservice.deleteUser(+id);
  }

  @Get('detail/:id')
  findDetail(@Param('id') id: string) {
    return this.userservice.getDetail(Number(id));
  }
}
