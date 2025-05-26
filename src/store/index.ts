import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { ProjectSlice, createProjectSlice } from './project.slice'

export type WithDevtools<S> = StateCreator<S, [['zustand/devtools', never]], [], S>

export type Store = ProjectSlice

export const useTadbirStore = create<Store>()(
  devtools((...a) => ({
    ...createProjectSlice(...a)
  }))
)

export default useTadbirStore
