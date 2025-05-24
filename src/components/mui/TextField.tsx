import { TextField as MuiTextField, TextFieldProps } from '@mui/material'
import { FieldError } from 'react-hook-form'

type TextFieldPropsType = {
  fieldError?: FieldError | string | undefined
  fieldTouch?: boolean
} & TextFieldProps

const TextField = ({ fieldError, size = 'small', ...otherProps }: TextFieldPropsType) => {
  return (
    <MuiTextField
      fullWidth
      size={size}
      error={typeof fieldError === 'string' ? !!fieldError : !!fieldError?.message}
      helperText={typeof fieldError === 'string' ? fieldError : fieldError?.message}
      sx={{ mt: 2, ...otherProps.sx }}
      {...otherProps}
    />
  )
}

export default TextField
