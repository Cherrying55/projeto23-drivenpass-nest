import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreditCardRepository } from './creditcard.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CredentialDTO } from 'src/credentials/CredentialDTO';
import { CreditCardDTO } from './CreditCardDTO';

@Injectable()
export class CreditcardService {

    constructor(private readonly creditcardrepository : CreditCardRepository, private readonly userService : UsersService){}

    async getCreditCards(userId: number){
        const hasuser = await this.userService.getById(userId)
        if(!hasuser){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        return await this.creditcardrepository.getAllCreditCards(userId)
    }

    async getCreditCardbyId(id: number){
        const credit = await this.creditcardrepository.getCreditCardById(id)
        if(!credit){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        return credit
    }

    async createCreditCards(data: CreditCardDTO){
        const hasuser = await this.userService.getById(data.userId)
        if(!hasuser){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        const hastitle = await this.creditcardrepository.getCreditCardByTitle(data.title)
        if(hastitle){
            throw new HttpException("Title in use", HttpStatus.CONFLICT)
        }
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('myTotallySecretKey', { pbkdf2Iterations: 10000, saltLength: 10 });
        data.password = cryptr.encrypt(data.password);
        return await this.creditcardrepository.create(data)

    }

    async deleteCreditCard(id: number){
        const hascreditcard = await this.creditcardrepository.getCreditCardById(id)
        if(!hascreditcard){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        return await this.creditcardrepository.deletecreditcard(id)
    }
}
