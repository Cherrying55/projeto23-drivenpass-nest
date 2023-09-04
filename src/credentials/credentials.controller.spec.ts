import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { PrismaModule } from "src/prisma/prisma.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as request from 'supertest';
import { User } from 'src/decorators/user.decorator';

describe('CredentialsController', () => {
  let controller: CredentialsController;

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

  it('Sign-up', async () => {
    await request(app.getHttpServer())
      .post("/auth/sign-up")
      .send({
        email: "email1@gmail.com",
        password: "Qt023u5@1"
      })
      .expect(201)


    //setup
    const tickets = await prisma.user.findMany();
    expect(tickets).toHaveLength(1);
  });

  it('Sign-in', async () => {

    //setup
    await prisma.user.create({
      data:{
        email: "email1@gmail.com",
        password: "Qt023u5@1"

      }
    })
    await request(app.getHttpServer())
      .post("/auth/sign-in")
      .send({
        email: "User1",
        password: "Qt023u5@1"
      })
      .expect(201)

  });

  
});
