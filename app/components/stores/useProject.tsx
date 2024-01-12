import { create } from 'zustand'

const useProjectStore = create((set) => ({
  // Store holdes selected project data to display project details in modal.
  project: null,
  visible: false,
  setProject: (data) => set({ project: data ,  visible: true,}),
  removeProject: () => set({ project: null }),
  hideDialog: () => set({ visible: false }),
}))

export default useProjectStore