import { ExpandMore } from '@mui/icons-material'
import { Accordion as MuiAccordion } from '@mui/material'
import { AccordionProps } from '@mui/material/Accordion'
import AccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { ReactNode } from 'react'

export const Summary = ({
  children,
  rightIcon = <ExpandMore />,
  ...otherProps
}: {
  children: ReactNode
  rightIcon: ReactNode
}) => {
  return (
    <AccordionSummary expandIcon={rightIcon} {...otherProps}>
      {children}
    </AccordionSummary>
  )
}

export const Details = ({
  children,
  ...otherProps
}: { children: ReactNode } & AccordionDetailsProps) => {
  return <AccordionDetails {...otherProps}>{children}</AccordionDetails>
}

const Accordion = ({ children, ...otherProps }: { children: ReactNode } & AccordionProps) => {
  return (
    <MuiAccordion sx={{ mt: 1, ...otherProps.sx }} {...otherProps}>
      {children}
    </MuiAccordion>
  )
}

export default Accordion
