import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class SiteRepository{
    constructor(private readonly prisma: PrismaService) {}

    async create(data: any){
        return await this.prisma.site.create({
            data
        })
    }

    async getByURL(url: string){
        return await this.prisma.site.findMany({
            where:{
                url
            }
        })
    }
}