import UpdateGroup from '@/components/pages/groups/UpdateGroup'

const UpdateGroupPage = (
    {
        params
    } : {
        params: {
            id: string
        }
    }
) => {
    return (
        <UpdateGroup id={Number(params.id)} />
    )
}

export default UpdateGroupPage
