import { useMutation } from '@tanstack/react-query'

import { ProfileListModel } from '../models/user.model'
import { searchUserToAddApi } from '../services/user.service'

const useSearchUserMutation = ({ onSuccess }: { onSuccess: (value: ProfileListModel) => void }) => {
  return useMutation({
    mutationFn: ({
      text,
      existingContributorIds
    }: {
      text: string
      existingContributorIds: string[]
    }) => searchUserToAddApi(text, existingContributorIds),
    onSuccess
  })
}

export { useSearchUserMutation }
