import UpdateParticipant from '@/components/pages/participants/UpdateParticipant'

const UpdateParticipantPage = (
    {
        params
    } : {
        params: {
            id: string
        }
    }
) => {
    return (
        <UpdateParticipant id={Number(params.id)} />
    )
}

export default UpdateParticipantPage
