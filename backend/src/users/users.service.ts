import {Injectable, NotFoundException} from '@nestjs/common'
import { User } from './users.model'
import { CreateUserDto } from './dto/create-user.dto'
import { hash } from 'bcrypt'
import { InjectModel } from '@nestjs/sequelize'
import {USER_NOT_FOUND_ERROR} from './users.constants'
import {UpdateUserDto} from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(
       @InjectModel(User)
       private readonly usersModel: typeof User
    ) {}

    async findAll(): Promise<User[]> {
        return this.usersModel.findAll()
    }

    async findById(id: number): Promise<User> {
        return this.usersModel.findByPk(id)
    }

    async findByEmail(email: string): Promise<User> {
        return this.usersModel.findOne({ where: { email } })
    }

    async create(dto: CreateUserDto): Promise<User> {
        const hashPassword = await hash(dto.password, 10)
        const user = new User ({
            ...dto,
            password: hashPassword,
        })

        return user.save()
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.usersModel.findByPk(id)

        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND_ERROR)
        }

        return user.update({ ...user, ...dto })
    }

    async delete(id: number) {
        const user = await this.usersModel.findByPk(id)

        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND_ERROR)
        }

        await user.destroy()
    }
}
