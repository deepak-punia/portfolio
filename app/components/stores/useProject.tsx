import { create } from "zustand";
type Project = {
  title: string;
  description: string;
  image: string;
  video: string;
  technologies: string[];
  features: string[];
  link: string;
  sourceCode: string;
};
type ProjectStore = {
  project: Project | null;
  visible: boolean;
  setProject: (data: Project) => void;
  removeProject: () => void;
  hideDialog: () => void;
};
const useProjectStore = create<ProjectStore>((set) => ({
  // Store holdes selected project data to display project details in modal.
  project: null,
  visible: false,
  setProject: (data: Project) => set({ project: data, visible: true }),
  removeProject: () => set({ project: null }),
  hideDialog: () => set({ visible: false }),
}));

export default useProjectStore;
