import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import {SequelizeModule} from '@nestjs/sequelize'
import {Form} from './forms.model'

@Module({
    imports: [
        SequelizeModule.forFeature([Form])
    ],
    controllers: [FormsController],
    providers: [FormsService]
})
export class FormsModule {}
