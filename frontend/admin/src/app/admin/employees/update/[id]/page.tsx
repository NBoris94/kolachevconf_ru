import UpdateEmployee from "@/components/pages/employees/UpdateEmployee"

const UpdateEmployeePage = (
    {
        params
    } : {
        params: {
            id: string
        }
    }
) => {
    return (
        <UpdateEmployee id={Number(params.id)} />
    )
}

export default UpdateEmployeePage
