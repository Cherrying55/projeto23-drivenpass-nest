import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/users/UserDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Creates a new user" })
  @ApiResponse({ status: HttpStatus.OK, description: "The created user" })
  signUp(@Body() UserDTO: UserDTO) {
    return this.authService.signUp(UserDTO);
  }

  @Post("sign-in")
  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: HttpStatus.OK, description: "The token of the user" })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() UserDTO: UserDTO) {
    return this.authService.signIn(UserDTO);
  }

}