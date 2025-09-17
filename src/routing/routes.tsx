import { Projects } from "../pages/Projects";
import { ProjectDetail } from "../pages/ProjectDetail";

export const routes = [
  {
    path: '/projects',
    component: Projects,
  },
  {
    path: '/projects/:projectId',
    component: ProjectDetail,
  }
]