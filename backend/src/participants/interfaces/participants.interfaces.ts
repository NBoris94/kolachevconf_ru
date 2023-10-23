export interface IParticipantsQuery {
    limit?: string
    offset?: string
    search?: string
    sort?: string
    orderBy?: 'ASC' | 'DESC'
    sectionId?: number
}
