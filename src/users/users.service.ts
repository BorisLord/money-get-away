import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';

type userOmitPassword = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  private readonly userRepository: Repository<User>;
  private readonly saltOrRounds = 10;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username: username });
  }

  async create(createUserDto: CreateUserDto): Promise<userOmitPassword> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.findOneByUsername(createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    // Hasher le mot de passe avant de sauvegarder
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword, // Sauvegarde le mot de passe hashé
    });

    const savedUser = await this.userRepository.save(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }
}
