import { Breadcrumbs, BreadcrumbsProps, Link } from '@mui/material'
import { JSX } from 'react'

import { Typography } from '../mui'

export type BreadcrumbLink = {
  title: string
  path?: string
  icon: JSX.Element
}

const BreadCrumbs = ({ links, ...otherProps }: { links: BreadcrumbLink[] } & BreadcrumbsProps) => {
  return (
    <Breadcrumbs sx={{ px: 3, py: 2 }} {...otherProps}>
      {links.map((link) =>
        link.path ? (
          <Link
            key={link.title}
            href={link.path}
            sx={(theme) => ({
              textDecoration: 'none',
              color: theme.palette.text.secondary
            })}
          >
            <Typography
              sx={(theme) => ({
                gap: 0.8,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.text.primary
                }
              })}
            >
              {link.icon}
              {link.title}
            </Typography>
          </Link>
        ) : (
          <Typography
            key={link.title}
            color="primary"
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.8 }}
          >
            {link.icon}
            {link.title}
          </Typography>
        )
      )}
    </Breadcrumbs>
  )
}

export default BreadCrumbs
