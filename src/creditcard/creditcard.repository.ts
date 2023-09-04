import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreditCardDTO } from "./CreditCardDTO";


@Injectable()
export class CreditCardRepository{
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreditCardDTO){
        await this.prisma.creditCard.create({
            data
        })
    }

    async getAllCreditCards(userId: number){
        return await this.prisma.creditCard.findMany(
            {where: {
                userId
            }}
        )
    }

    async getCreditCardById(id: number){
        return await this.prisma.creditCard.findUnique({
            where: {
                id
            }
        })
    }

    async getCreditCardByTitle(title: string){
        return await this.prisma.creditCard.findUnique({
            where:{
                title
            }
        })
    }

    async deletecreditcard(id: number){
        return await this.prisma.creditCard.delete({
            where:{
                id
            }
        })
    }
}