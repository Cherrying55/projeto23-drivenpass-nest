import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EraseDTO } from "./EraseDTO";


@Injectable()
export class EraseRepository{
    constructor(private readonly prisma: PrismaService) {}

  async deleteAccount(userId: number){
    await this.prisma.creditCard.deleteMany({
        where:{
            userId
        }
    })

    await this.prisma.note.deleteMany({
        where:{
            userId
        }
    })

    await this.prisma.credential.deleteMany({
        where:{userId}
    })

    return this.prisma.user.delete({
        where: {
            id: userId
        }
    })
  }

}
