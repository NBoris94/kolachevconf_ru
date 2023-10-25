import UpdateSection from '@/components/pages/sections/UpdateSection'

const UpdateSectionPage = (
    {
        params
    } : {
        params: {
            id: string
        }
    }
) => {
    return (
        <UpdateSection id={Number(params.id)} />
    )
}

export default UpdateSectionPage
