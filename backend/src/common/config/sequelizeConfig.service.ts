import {Injectable} from '@nestjs/common'
import {SequelizeModuleOptions, SequelizeOptionsFactory} from '@nestjs/sequelize'
import {ConfigService} from '@nestjs/config'
import {User} from '../../users/users.model'

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory{
    constructor(private readonly configService: ConfigService) {}

    createSequelizeOptions(): Promise<SequelizeModuleOptions> | SequelizeModuleOptions {
        const { sql } = this.configService.get('database')

        return {
            ...sql,
            models: [User],
            autoLoadModels: true,
            synchronize: true,
            define: {
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        }
    }
}
