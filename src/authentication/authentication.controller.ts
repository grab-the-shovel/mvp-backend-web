import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto, RegisterDto, ResetPasswordDto } from './dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    if (result.error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result.data;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.forgotPassword(resetPasswordDto);
  }
}
