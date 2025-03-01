import {
  Card as MuiCard,
  CardActionArea,
  CardActionAreaProps,
  CardContent,
  CardContentProps,
  CardMedia,
  CardMediaProps,
  CardProps
} from '@mui/material'

export const ActionArea = ({ children, ...otherProps }: CardActionAreaProps) => {
  return <CardActionArea {...otherProps}>{children}</CardActionArea>
}

export const Content = ({ children, ...otherProps }: CardContentProps) => {
  return <CardContent {...otherProps}>{children}</CardContent>
}

export const Media = ({ children, ...otherProps }: CardMediaProps) => {
  return <CardMedia {...otherProps}>{children}</CardMedia>
}

const Card = ({ children, ...otherProps }: CardProps) => {
  return <MuiCard {...otherProps}>{children}</MuiCard>
}

export default Card
