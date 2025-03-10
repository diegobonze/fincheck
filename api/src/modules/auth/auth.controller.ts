import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDto } from './dto/signin.dto';
import { signupDto } from './dto/signup.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinDto: signinDto) {
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  signup(@Body() signupDto: signupDto) {
    return this.authService.signup(signupDto);
  } 
}
