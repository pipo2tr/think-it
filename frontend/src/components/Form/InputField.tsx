import { TextField, TextFieldProps } from '@material-ui/core'
import React, { FC } from 'react'

type InputFieldProps = TextFieldProps & {
    fieldType: string,
        
}

const InputField : FC<InputFieldProps> = ({fieldType, ...props}) => {
    return (
        <>
            <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name={fieldType}
						label="Password"
						type={fieldType}
						id={fieldType}
						autoComplete={`current-${fieldType}`}
						{...props}
					/>
        </>
    )
}

export default InputField
