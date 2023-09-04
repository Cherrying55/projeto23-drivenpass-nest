import { Injectable } from "@nestjs/common";
import { NoteDTO } from "./NoteDTO";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class noteRepository{
    constructor(private readonly prisma: PrismaService) {}

    async create(data: NoteDTO){
        await this.prisma.note.create({
            data
        })
    }

    async getAllnotes(userId: number){
        return await this.prisma.note.findMany(
            {where: {
                userId
            }}
        )
    }

    async getnoteById(id: number){
        return await this.prisma.note.findUnique({
            where: {
                id
            }
        })
    }

    async deletenote(id: number){
        return await this.prisma.note.delete({
            where:{
                id
            }
        })
    }
}