import { ConflictException, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { UserDTO } from './UserDTO';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async createUser(userDto: UserDTO) {
    const { email } = userDto;
    const user = await this.usersRepository.getUserByEmail(email);
    if (user) throw new ConflictException("Username already in use.");

    return await this.usersRepository.create(userDto);
  }

  async getById(id: number) {
    const user = await this.usersRepository.getById(id);
    if (!user) throw new NotFoundException("User not found!");

    return user;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }

  async getUserByEncryptedPassword(password: string){
    return await this.usersRepository.getUserByPassword(password)
  }
}