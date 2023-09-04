import { Injectable } from "@nestjs/common";
import { CredentialDTO } from "./CredentialDTO";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class CredentialRepository{
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CredentialDTO){
        await this.prisma.credential.create({
            data
        })
    }

    async getAllCredentials(userId: number){
        return await this.prisma.credential.findMany(
            {where: {
                userId
            }}
        )
    }

    async getCredentialById(id: number){
        return await this.prisma.credential.findUnique({
            where: {
                id
            }
        })
    }

    async deleteCredential(id: number){
        return await this.prisma.credential.delete({
            where:{
                id
            }
        })
    }
}