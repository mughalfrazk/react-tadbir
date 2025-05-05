import { Switch as MuiSwitch, SwitchProps } from '@mui/material'

const Switch = ({ ...otherProps }: SwitchProps) => {
  return <MuiSwitch {...otherProps} />
}

export default Switch
