import { PrismaService } from 'src/prisma/prisma.service';
import { CredentialDTO } from './CredentialDTO';
import { CredentialRepository } from './credentials.repository';
import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateCredentialDTO } from './CreateCredentialDTO';
import { SitesService } from 'src/sites/sites.service';

@Injectable()
export class CredentialsService {

    constructor(private readonly prisma : PrismaService, private readonly credentialRepository: CredentialRepository, private readonly userService : UsersService, private readonly siteService : SitesService){}

    async createCredential(data: CreateCredentialDTO){
        const Cryptr = require('cryptr');
        const credentials = await this.credentialRepository.getAllCredentials(data.userId);
        for(const i of credentials){
            if(i.title === data.title){
                throw new ConflictException("Credential title already in use.")
            }
        }
        const cryptr = new Cryptr('myTotallySecretKey', { pbkdf2Iterations: 10000, saltLength: 10 });
        const encryptedString = cryptr.encrypt(data.password);
        const site = await this.siteService.getByURL(data.site);
        if(site[0]){
            let newdata : CredentialDTO = {
                userId: data.userId,
                siteId: site[0].id,
                title: data.title,
                password: encryptedString
            }
            return await this.credentialRepository.create(newdata)
        }
        else{
            let newsite = await this.siteService.create({
                url: data.site
            })
            let newdata : CredentialDTO = {
                userId: data.userId,
                siteId: newsite.id,
                title: data.title,
                password: encryptedString
            }
            return await this.credentialRepository.create(newdata)
        }
        
    }

    async getCredentials(userId: number){
        const hasuser = await this.userService.getById(userId);
        if(!hasuser){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        const credentials = await this.credentialRepository.getAllCredentials(userId)
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('myTotallySecretKey', { pbkdf2Iterations: 10000, saltLength: 10 });
        for(const i of credentials){
            i.password = cryptr.decrypt(i.password)
        }
        return credentials
    }

    async deleteCredential(id: number){
        const hascredential = await this.credentialRepository.getCredentialById(id);
        if(!hascredential){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        return await this.credentialRepository.deleteCredential(id)
    }

    async getCredentialById(id: number){
        const credential = await this.credentialRepository.getCredentialById(id)
        if(!credential){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('myTotallySecretKey', { pbkdf2Iterations: 10000, saltLength: 10 });
        credential.password = cryptr.decrypt(credential.password);
        return credential
    }
}
