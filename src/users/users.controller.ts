import { 
  Controller, 
  Get, 
  Post, 
  HttpException,
  HttpStatus, 
  Response, 
  Request,
  Param,
  Body,
} from 'nest.js';
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ){}

  @Get()
  async getAllUsers(
    @Response() res,
  ){
    const users = await this.usersService.getAllUsers();
    res.status(HttpStatus.OK).json(users);
  }

  @Get('/:id')
  async getUser(
    @Response() res, 
    @Param('id') id,
  ){
    const user = await this.usersService.getUser(Number(id));
    if(!user){
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    res.status(HttpStatus.OK).json(user);
  }

  @Post()
  async addUser(
    @Response() res,
    @Request() req,
    @Body('name') name,
    @Body('age') age
  ){
    const msg = await this.usersService.addUser({ name, age });
    res.status(HttpStatus.CREATED).json(msg);
  }
}