import {ParticipantFormState} from '@/components/pages/participants/Participants.interfaces'

export const INITIAL_FORM_STATE: ParticipantFormState = {
    title: '',
    author: '',
    secondAuthor: '',
    thirdAuthor: '',
    description: '',
    scientificAdviser: '',
    status: '',
    place: '',
    sectionId: 0,
    formId: 0,
    phone: '',
    email: '',
    file: '',
    reqStatus: 'new'
}
