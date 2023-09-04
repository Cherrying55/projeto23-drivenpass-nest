import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from 'src/users/user.repository';
import { UsersService } from 'src/users/users.service';
import { CreditcardController } from './creditcard.controller';
import { CreditCardRepository } from './creditcard.repository';
import { CreditcardService } from './creditcard.service';
import { PrismaModule } from "src/prisma/prisma.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as request from 'supertest'

describe('CreditcardController', () => {
  let controller: CreditcardController;

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

  it('GET /cards', async () => {

    await prisma.creditCard.create({
      data:{
        ownername: "Owner",
        expirationdate: new Date(),
        securitycode: "123",
        password: "Qt023u5",
        type: "debito",
        userId: 1,
        title: "Title"
      }
    })

    let response = await (await request(app.getHttpServer()).get('/cards')).body({userId: 1});
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("POST /cards", async () => {

    await prisma.user.create({
      data:{
        email: "email1@gmail.com",
        password: "Qt023u5@1"
      }
    })
    await request(app.getHttpServer())
      .post("/cards")
      .send({
        ownername: "Owner",
        expirationdate: "string",
        securitycode: "123",
        password: "Qt023u5",
        type: "debito",
        userId: 1,
        title: "Title"
      })
      .expect(201)


    //setup
    const tickets = await prisma.creditCard.findMany();
    expect(tickets).toHaveLength(1);

  });

  it('DELETE /cards/:id ', async () => {
    //setup
    await prisma.creditCard.create({
      data:{
        ownername: "Owner",
        expirationdate: new Date(),
        securitycode: "123",
        password: "Qt023u5",
        type: "debito",
        userId: 1,
        title: "Title"
      }
    })


    await request(app.getHttpServer())
    .delete("/posts/1")
    .expect(200)
  });



});
