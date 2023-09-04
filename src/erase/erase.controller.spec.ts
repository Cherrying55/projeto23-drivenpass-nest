import { Test, TestingModule } from '@nestjs/testing';
import { EraseController } from './erase.controller';
import { EraseService } from './erase.service';
import { PrismaModule } from "src/prisma/prisma.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as request from 'supertest'

describe('EraseController', () => {
  let controller: EraseController;

  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService); //ou o get
		await prisma.credential.deleteMany();
    await prisma.creditCard.deleteMany();
    await prisma.user.deleteMany();
    await prisma.note.deleteMany();
    jest.clearAllMocks();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("POST /erase", async () => {

    await prisma.user.create({
      data:{
        email: "email1@gmail.com",
        password: "Qt023u5@1"
      }
    })

    await request(app.getHttpServer())
      .post("/erase")
      .send({
        password: "Qt023u5@1"
        
      })
      .expect(201)


    //setup
    const tickets = await prisma.user.findMany();
    expect(tickets).toHaveLength(0);

  });


});
