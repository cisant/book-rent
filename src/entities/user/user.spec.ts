import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
  let userService: UserService;

  const userData = {
    name: 'Teste',
    email: 'teste@teste.com',
    password: '123456',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken('User'), useValue: jest.fn() },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('User Tests', () => {
    it('should create an user', async () => {
      const result: any = {
        name: 'Teste',
        email: 'teste@teste.com',
        password:
          '$2a$10$3c6JyFuzaUnleYvSYmNVt.KK9W5Sz3PxRg5pS7el5kqresBgZKOzm',
        _id: '64cd217501c1dc5b85be453f',
        __v: 0,
      };
      jest.spyOn(userService, 'create').mockResolvedValue(result);

      expect(await userService.create(userData)).toBe(result);
    });
  });
});
