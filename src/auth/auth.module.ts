import { Module, Global } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersService } from "src/users/users.service";
import { UsersRepository } from "src/users/user.repository";

@Global()
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  }), UsersModule, PrismaModule], // PrismaModule se necessário
  controllers: [AuthController],
  providers: [AuthService, UsersService, UsersRepository],
  exports: [AuthService]
})
export class AuthModule {}