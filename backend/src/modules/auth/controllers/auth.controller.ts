import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, AuthResponseDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../../../common/types/authenticated-request.type';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getProfile(@Request() req: AuthenticatedRequest) {
    return {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    };
  }
}
