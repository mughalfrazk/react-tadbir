import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SaveIcon from '@mui/icons-material/Save'
import { ButtonProps, styled } from '@mui/material'
import { purple } from '@mui/material/colors'
import { Fragment, useState } from 'react'
import { useParams } from 'react-router'

import { Box, Button, Modal, Stack, TextField, Typography } from '@/components/mui'
import CircularProgress from '@/components/mui/CircularProgress'
import { useBoard } from '@/context/board-context'
import {
  TagModel,
  TaskTagWithTagDetailListModel,
  TaskTagWithTagDetailModel
} from '@/lib/models/tag.model'
import {
  useCreateTagMutation,
  useCreateTaskTagMutation,
  useGetAllTagQuery
} from '@/lib/queries/tag.query'
import useTadbirStore from '@/store'

import ColorList from './ColorList'

const WhiteButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[50]),
  backgroundColor: purple[50],
  '&:hover': {
    backgroundColor: theme.palette.grey[300]
  }
}))

const AddTagModal = ({
  columnId,
  taskId,
  taskTags
}: {
  columnId: string
  taskId: string
  taskTags: TaskTagWithTagDetailListModel
}) => {
  const { project_id } = useParams()
  const { setTags } = useTadbirStore()
  const { addTagToTask } = useBoard()
  const { tagList } = useGetAllTagQuery({ project_id: project_id as string })

  const [name, setName] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [openTagModal, setOpenTagModal] = useState<boolean>(false)
  const [selectedTagId, setSelectedTagId] = useState<number>()

  const { mutate: createNewTagMutation, isPending: tagCreationLoading } = useCreateTagMutation({
    onSuccess: (tag: TagModel) => {
      if (!project_id) return
      setTags(project_id, [tag, ...(tagList ?? [])])
    }
  })

  const { mutate: addTagToTaskMutation, isPending: taskTagLoading } = useCreateTaskTagMutation({
    onSuccess: (taskTag: TaskTagWithTagDetailModel) => {
      addTagToTask(columnId, taskId, taskTag)
      setSelectedTagId(undefined)
    }
  })

  const createTag = () => {
    if (!name || !color || !project_id) return
    createNewTagMutation({ name, color, project_id: +project_id })
  }

  const addTaskTag = (tagId: number) => {
    setSelectedTagId(tagId)
    addTagToTaskMutation({ task_id: taskId, tag_id: tagId })
  }

  return (
    <Fragment>
      <Button isIconOnly size="small" onClick={() => setOpenTagModal(true)}>
        <AddRoundedIcon />
      </Button>
      <Modal
        open={openTagModal}
        title="Add or create tag"
        onClose={() => setOpenTagModal(false)}
        width={404}
      >
        <Box sx={{ mb: 2 }}>
          <Stack flexDirection="row" alignItems="flex-end" gap={1} sx={{ px: 1.5 }}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: color,
                  borderRadius: '5%',
                  // border: '2px solid #cccccc6b',
                  cursor: 'pointer',
                  position: 'absolute',
                  top: 21,
                  right: 6
                }}
                onClick={() => {
                  setColor('')
                }}
                title={color}
              />
            </Box>
            <Box sx={{ pb: 0.1 }}>
              <Button isIconOnly onClick={createTag} loading={tagCreationLoading}>
                <SaveIcon />
              </Button>
            </Box>
          </Stack>
          <ColorList color={color} setColor={setColor} />
          <Stack px={1.5} gap={1}>
            {tagList.reverse()?.map(
              (tag) =>
                !taskTags.map((t) => t.tag.id).includes(tag.id) && (
                  <Stack
                    key={tag.id}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      backgroundColor: tag.color,
                      px: 2,
                      py: 1,
                      borderRadius: '3px'
                      // border: '2px solid rgba(204, 204, 204, 0.28)'
                    }}
                  >
                    <Typography>{tag.name}</Typography>
                    <WhiteButton size="small" onClick={() => addTaskTag(tag.id)}>
                      {selectedTagId === tag.id && taskTagLoading ? (
                        <CircularProgress size={22} />
                      ) : (
                        'Select'
                      )}
                    </WhiteButton>
                  </Stack>
                )
            )}
          </Stack>
        </Box>
      </Modal>
    </Fragment>
  )
}

export default AddTagModal
