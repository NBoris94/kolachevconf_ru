import UpdateForm from '@/components/pages/forms/UpdateForm'

const UpdateFormPage = (
    {
        params
    } : {
        params: {
            id: string
        }
    }
) => {
    return (
        <UpdateForm id={Number(params.id)} />
    )
}

export default UpdateFormPage
