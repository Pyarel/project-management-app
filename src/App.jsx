import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectState((previousProjectState) => {
      return {
        ...previousProjectState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((previousProjectState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...previousProjectState,
        selectedProjectId: undefined,
        projects: [...previousProjectState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((previousProjectState) => {
      return {
        ...previousProjectState,
        selectedProjectId: undefined,
      };
    });
  }

  console.log(projectState);
  let content;
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
