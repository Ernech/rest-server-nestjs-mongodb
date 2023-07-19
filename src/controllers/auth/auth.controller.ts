import { Body, Controller, Post, Get, Headers } from '@nestjs/common';
import { Authroization } from 'src/decorators/auth.decorator';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @Authroization(false)
  async loginUser(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Get()
  async renewToken(@Headers() headers){
    return this.authService.renewToken(headers);
  }
}
