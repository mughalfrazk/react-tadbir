import { BreadcrumbsProps, ContainerProps, PaperProps } from '@mui/material'
import { ReactNode } from 'react'

import { Container, Paper } from '../mui'
import BreadCrumbs, { BreadcrumbLink } from './BreadCrumbs'

const BreadCrumbBackground = ({
  children,
  links = [],
  paperProps,
  breadCrumbProps,
  containerProps
}: {
  children: ReactNode
  links?: BreadcrumbLink[]
  paperProps?: PaperProps
  breadCrumbProps?: BreadcrumbsProps
  containerProps?: ContainerProps
}) => {
  return (
    <Container {...containerProps}>
      <Paper
        sx={{ height: '60vh', border: 1, borderColor: 'divider', ...paperProps?.sx }}
        elevation={1}
        {...paperProps}
      >
        {Boolean(links.length) && <BreadCrumbs links={links} {...breadCrumbProps} />}
        {children}
      </Paper>
    </Container>
  )
}

export default BreadCrumbBackground
