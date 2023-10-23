import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {col, fn, Op, OrderItem, where} from 'sequelize'
import {Participant} from './participants.model'
import {CreateParticipantDto} from './dto/create-participant.dto'
import {UpdateParticipantDto} from './dto/update-participant.dto'
import {PARTICIPANT_NOT_FOUND_ERROR} from './participant.constants'
import {IParticipantsQuery} from './interfaces/participants.interfaces'
import {Form} from '../forms/forms.model'
import {Section} from '../sections/sections.model'

@Injectable()
export class ParticipantsService {
    constructor(
        @InjectModel(Participant)
        private readonly participantModel: typeof Participant
    ) {}

    async findAll(): Promise<Participant[]> {
        return this.participantModel.findAll({ include: [Form, Section] })
    }

    async findAllWithFilter(query: IParticipantsQuery): Promise<{ rows: Participant[]; count: number }> {
        const itemPerPage = 10
        const limit = Number(query.limit)
        const offset = itemPerPage * Number(query.offset)
        const sectionResult = query.sectionId ? { sectionId: query.sectionId } : {}
        const searchResult = query.search
            ? {
                [Op.or]: [
                    { title: where(fn('LOWER', col('title')), 'LIKE', `%${query.search.toLowerCase()}%`) },
                    { description: where(fn('LOWER', col('description')), 'LIKE', `%${query.search.toLowerCase()}%`) },
                    { author: where(fn('LOWER', col('author')), 'LIKE', `%${query.search.toLowerCase()}%`) },
                    { secondAuthor: where(fn('LOWER', col('secondAuthor')), 'LIKE', `%${query.search.toLowerCase()}%`) },
                    { thirdAuthor: where(fn('LOWER', col('thirdAuthor')), 'LIKE', `%${query.search.toLowerCase()}%`) },
                    { scientificAdviser: where(fn('LOWER', col('scientificAdviser')), 'LIKE', `%${query.search.toLowerCase()}%`) },
                    { email: where(fn('LOWER', col('email')), 'LIKE', `%${query.search.toLowerCase()}%`) },
                    { phone: where(fn('LOWER', col('phone')), 'LIKE', `%${query.search.toLowerCase()}%`) }
                ]
            }
            : {}

        const whereOptions = { ...sectionResult, ...searchResult }
        let sortResult: OrderItem = query.sort && query.orderBy ? [query.sort, query.orderBy] : ['createdAt', 'DESC']

        if (query.sort === 'section') {
            sortResult = [{model: Section, as: 'section'}, 'name', query.orderBy]
        }

        return this.participantModel.findAndCountAll({ limit, offset, include: [Form, Section], where: { ...whereOptions }, order: [sortResult] })
    }

    async findById(id: number): Promise<Participant> {
        return this.participantModel.findByPk(id, { include: [Form, Section] })
    }

    async create(dto: Partial<CreateParticipantDto>): Promise<Participant> {
        return this.participantModel.create(dto)
    }

    async update(id: number, dto: UpdateParticipantDto): Promise<Participant> {
        const participant = await this.participantModel.findByPk(id)

        if (!participant) {
            throw new NotFoundException(PARTICIPANT_NOT_FOUND_ERROR)
        }

        return participant.update({ ...participant, ...dto })
    }

    async delete(id: number) {
        const deletedParticipant = await this.participantModel.destroy({ where: { id } })

        if (deletedParticipant === 0) {
            throw new NotFoundException(PARTICIPANT_NOT_FOUND_ERROR)
        }
    }
}
