import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialRepository } from './credentials.repository';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/user.repository';
import { SiteRepository } from 'src/sites/sites.repository';
import { SitesService } from 'src/sites/sites.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialRepository, UsersService, UsersRepository, SiteRepository, SitesService],
})
export class CredentialsModule {}
