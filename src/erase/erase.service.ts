import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { EraseRepository } from './erase.repository';

@Injectable()
export class EraseService {

    constructor(private readonly eraseRepository: EraseRepository, private readonly userservice: UsersService){}

    async deleteAccount(password: string){
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('myTotallySecretKey', { pbkdf2Iterations: 10000, saltLength: 10 });
        const decrypted = cryptr.decrypt(password)
        const hasuser = await this.userservice.getUserByEncryptedPassword(password);
        if(!hasuser){
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
        }
        return this.eraseRepository.deleteAccount(hasuser.id)

    }
}
