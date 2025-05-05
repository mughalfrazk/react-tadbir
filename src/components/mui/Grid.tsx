import { Grid2, Grid2Props } from '@mui/material'

const Grid = ({ children, ...otherProps }: Grid2Props) => {
  return <Grid2 {...otherProps}>{children}</Grid2>
}

export default Grid
