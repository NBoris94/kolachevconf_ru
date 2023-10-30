import { FC } from "react"
import { useField } from "formik"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

interface RichTextProps {
    label: string
    name: string,
    isLoading: boolean
}

const RichText: FC<RichTextProps> = (
    {
        label,
        name,
        isLoading
    }
) => {
    const [ field, meta, helper ] = useField(name)

    return (
        <FormControl mb="2">
            <FormLabel>{label}</FormLabel>
            <CKEditor
                editor={ ClassicEditor }
                data={meta.value}
                onChange={ ( event, editor ) => {
                    const data = editor.getData()
                    helper.setValue(data)
                }}
                disabled={isLoading}
            />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}

export default RichText
