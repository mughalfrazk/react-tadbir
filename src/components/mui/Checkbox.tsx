import { CheckboxProps, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material'
import { ReactNode } from 'react'

const Checkbox = ({ label, ...otherProps }: { label?: ReactNode | string } & CheckboxProps) => {
  return label ? (
    <FormControlLabel control={<MuiCheckbox {...otherProps} />} label={label} />
  ) : (
    <MuiCheckbox {...otherProps} />
  )
}

export default Checkbox
