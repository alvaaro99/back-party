import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUser = {
    id: 'fakeId',
    name: 'fakeName',
    email: 'fake@email.com',
  };
  const mockUserService = {
    findByEmail: jest.fn((email) =>
      email == mockUser.email ? mockUser : undefined,
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return my User by email', async () => {
    const mockReq: any = { user: { email: 'fake@email.com' } };
    const mockRes: any = {
      status: jest.fn((httpCode) => {
        expect(httpCode).toEqual(HttpStatus.OK);
        return mockRes;
      }),
      json: jest.fn((response) => response),
    };

    expect(await controller.myUser(mockReq, mockRes)).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      email: mockReq.user.email,
    });
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.OK);
  });
});
