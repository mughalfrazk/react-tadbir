import { Close } from '@mui/icons-material'
import {
  ClickAwayListener,
  ModalProps,
  Modal as MuiModal,
  Stack,
  SxProps,
  Typography
} from '@mui/material'
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
  let paperStyles: SxProps = { ...style, width, top }

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
    <MuiModal closeAfterTransition={false} {...otherProps}>
      <ClickAwayListener onClickAway={onClose}>
        <Paper sx={paperStyles}>
          {title && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ pt: 1, pb: 1, pl: 3, pr: 2, borderBottom: 1, borderColor: 'divider' }}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                {titleIcon}
                <Typography variant="h5">{title ?? 'Title'}</Typography>
              </Stack>
              <div>
                {headerSectionRight}
                <Button isIconOnly size="small" onClick={onClose} sx={{ m: 0 }}>
                  <Close />
                </Button>
              </div>
            </Stack>
          )}
          <div className="max-h-[70vh] overflow-y-auto">{children}</div>
        </Paper>
      </ClickAwayListener>
    </MuiModal>
  )
}

export default Modal
