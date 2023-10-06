import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import {SequelizeModule} from '@nestjs/sequelize'
import {Material} from './materials.model'

@Module({
    imports: [
        SequelizeModule.forFeature([Material])
    ],
    controllers: [MaterialsController],
    providers: [MaterialsService]
})
export class MaterialsModule {}
