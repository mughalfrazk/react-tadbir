import { Tab as MuiTab, Tabs as MuiTabs, TabProps, TabsProps } from '@mui/material'

export const Tab = ({ children, ...otherProps }: TabProps) => {
  return <MuiTab {...otherProps}>{children}</MuiTab>
}

const Tabs = ({ children, ...otherProps }: TabsProps) => {
  return <MuiTabs {...otherProps}>{children}</MuiTabs>
}

export default Tabs
