import { Close } from '@mui/icons-material'
import { ModalProps, Modal as MuiModal, Stack, SxProps, Typography } from '@mui/material'
import { ReactElement, ReactNode } from 'react'

import Button from './Button'
import Paper from './Paper'

const style = {
  left: '50%',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: 400
}

const Modal = ({
  children,
  title,
  titleIcon,
  width = '50%',
  height,
  maxHeight = '90vh',
  minHeight,
  top = '50%',
  headerSectionRight,
  onClose,
  ...otherProps
}: {
  width?: number | string
  title?: number | string
  titleIcon?: ReactElement
  height?: number | string | undefined
  maxHeight?: number | string | undefined
  minHeight?: number | string | undefined
  top?: number | string
  headerSectionRight?: ReactNode
  overflowY?: string
  onClose: () => void
} & ModalProps) => {
  let paperStyles: SxProps = { ...style, width, top, py: 1 }

  if (height) {
    paperStyles = { ...paperStyles, height }
  }

  if (maxHeight) {
    paperStyles = { ...paperStyles, maxHeight }
  }

  if (minHeight) {
    paperStyles = { ...paperStyles, minHeight }
  }

  return (
    <MuiModal {...otherProps}>
      <Paper sx={paperStyles}>
        {title && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ pt: 0.5, pb: 1, pl: 3, pr: 2.5, borderBottom: 1, borderColor: 'divider' }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              {titleIcon}
              <Typography variant="h5">{title ?? 'Title'}</Typography>
            </Stack>
            <div>
              {headerSectionRight}
              <Button isIconOnly size="medium" onClick={onClose} sx={{ m: 0 }}>
                <Close />
              </Button>
            </div>
          </Stack>
        )}
        <div className="max-h-[80vh] overflow-y-auto">{children}</div>
      </Paper>
    </MuiModal>
  )
}

export default Modal
