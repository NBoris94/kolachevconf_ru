import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {Form} from './forms.model'
import {UpdateFormDto} from './dto/update-form.dto'
import {FORM_NOT_FOUND_ERROR, FORMS_NOT_FOUND_ERROR} from './forms.constants'
import {CreateFormDto} from './dto/create-form.dto'

@Injectable()
export class FormsService {

    constructor(
        @InjectModel(Form)
        private readonly formModel: typeof Form
    ) {}

    async findAll(): Promise<Form[]> {
        return await this.formModel.findAll()
    }

    async findById(id: number): Promise<Form> {
        const form = await this.formModel.findByPk(id)

        if (!form) {
            throw new NotFoundException(FORM_NOT_FOUND_ERROR)
        }

        return form
    }

    async create(dto: Partial<CreateFormDto>): Promise<Form> {
        return await this.formModel.create(dto)
    }

    async update(id: number, dto: UpdateFormDto): Promise<Form> {
        const form = await this.formModel.findByPk(id)

        if (!form) {
            throw new NotFoundException(FORM_NOT_FOUND_ERROR)
        }

        return form.update({ ...form, ...dto })
    }

    async delete(id: number) {
        const deletedForm = await this.formModel.destroy({ where: { id } })

        if (deletedForm === 0) {
            throw new NotFoundException(FORMS_NOT_FOUND_ERROR)
        }
    }
}
