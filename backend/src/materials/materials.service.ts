import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {Material} from './materials.model'
import {CreateMaterialDto} from './dto/create-material.dto'
import {UpdateMaterialDto} from './dto/update-material.dto'
import {NOT_FOUND_MATERIAL_ERROR} from './materials.constants'

@Injectable()
export class MaterialsService {

    constructor(
        @InjectModel(Material)
        private readonly materialModel: typeof Material
    ) {}

    async findAll(): Promise<Material[]> {
        return this.materialModel.findAll()
    }

    async create(dto: Partial<CreateMaterialDto>): Promise<Material> {
        return this.materialModel.create(dto)
    }

    async update(id: number, dto: UpdateMaterialDto): Promise<Material> {
        const material = await this.materialModel.findByPk(id)

        if (!material) {
            throw new NotFoundException(NOT_FOUND_MATERIAL_ERROR)
        }

        return material.update({ ...material, ...dto })
    }

    async delete(id: number) {
        const deletedMaterial = await this.materialModel.destroy({ where: { id } })

        if (deletedMaterial === 0) {
            throw new NotFoundException(NOT_FOUND_MATERIAL_ERROR)
        }
    }
}
