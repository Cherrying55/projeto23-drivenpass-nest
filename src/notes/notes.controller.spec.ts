import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as request from 'supertest'
import { PrismaModule } from "src/prisma/prisma.module";

describe('NotesController', () => {
  let controller: NotesController;

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

  it('GET /notes', async () => {

    await prisma.user.create({
      data:{
        email: "email1@gmail.com",
        password: "PassWord23@"
      }
    })

    await prisma.note.create({
      data:{
        title: "Title",
        description: "Description",
        userId: 1,
      }
    })



    let response = await (await request(app.getHttpServer()).get('/notes')).body({userId: 1});
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('DELETE /notes/:id ', async () => {
    //setup
    await prisma.user.create({
      data:{
        email: "email1@gmail.com",
        password: "PassWord23@"
      }
    })

    await prisma.note.create({
      data:{
        title: "Title",
        description: "Description",
        userId: 1,
      }
    })


    await request(app.getHttpServer())
    .delete("/notes/1")
    .expect(200)
  });

  it('GET /notes/:id', async () => {

    await prisma.user.create({
      data:{
        email: "email1@gmail.com",
        password: "PassWord23@"
      }
    })

    await prisma.note.create({
      data:{
        title: "Title",
        description: "Description",
        userId: 1,
      }
    })



    let response = await (await request(app.getHttpServer()).get('/notes/1'));
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
           title: "Title",
        description: "Description",
        userId: 1,
      })
      .expect(201)


    //setup
    const tickets = await prisma.note.findMany();
    expect(tickets).toHaveLength(1);

  });


});
