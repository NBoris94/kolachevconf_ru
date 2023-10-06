import { Module } from '@nestjs/common';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import {SequelizeModule} from '@nestjs/sequelize'
import {Information} from './information.model'

@Module({
    imports: [
        SequelizeModule.forFeature([Information])
    ],
    controllers: [InformationController],
    providers: [InformationService]
})
export class InformationModule {}
