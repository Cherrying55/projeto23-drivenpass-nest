import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';
import { SitesModule } from './sites/sites.module';
import { NotesModule } from './notes/notes.module';
import { CreditcardModule } from './creditcard/creditcard.module';
import { EraseModule } from './erase/erase.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CredentialsModule, SitesModule, NotesModule, CreditcardModule, EraseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
