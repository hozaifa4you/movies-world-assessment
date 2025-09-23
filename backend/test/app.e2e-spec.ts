import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import type { Server } from 'http';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
   let app: INestApplication;

   beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
         imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
   });

   afterEach(async () => {
      await app.close();
   });

   it('/ (GET)', () => {
      return supertest(app.getHttpServer() as Server)
         .get('/')
         .expect(200)
         .expect('Hello World!');
   });
});
