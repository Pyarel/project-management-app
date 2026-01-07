import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(taskText) {
    setProjectState((previousProjectState) => {
      const taskID = Math.random();

      const newTask = {
        taskText: taskText,
        id: taskID,
        projectId: previousProjectState.selectedProjectId,
      };

      return {
        ...previousProjectState,
        tasks: [...previousProjectState.tasks, newTask],
      };
    });
  }
  function handleDeleteTask(id) {
    setProjectState((previousProjectState) => {
      return {
        ...previousProjectState,
        tasks: previousProjectState.tasks.filter((task) => task.id !== id),
      };
    });
  }

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

  function handleDeleteProject() {
    setProjectState((previousProjectState) => {
      return {
        ...previousProjectState,
        selectedProjectId: undefined,
        projects: previousProjectState.projects.filter(
          (project) => project.id !== previousProjectState.selectedProjectId
        ),
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

  function handleSelectProject(id) {
    setProjectState((previousProjectState) => {
      return {
        ...previousProjectState,
        selectedProjectId: id,
      };
    });
  }

  let selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );
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
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
