import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {Information} from './information.model'
import {InformationDto} from './dto/information.dto'
import {INFORMATION_NOT_FOUND_ERROR} from './information.constants'

@Injectable()
export class InformationService {

    constructor(
        @InjectModel(Information)
        private readonly informationModel: typeof Information
    ) {}

    async findOne(): Promise<Information> {
        const information = await this.informationModel.findOne()

        if (!information) {
            throw new NotFoundException(INFORMATION_NOT_FOUND_ERROR)
        }

        return information
    }

    async update(id: number, dto: InformationDto): Promise<Information> {
        const information = await this.informationModel.findByPk(id)

        if (!information) {
            throw new NotFoundException(INFORMATION_NOT_FOUND_ERROR)
        }

        return information.update({ ...information, ...dto })
    }
}
