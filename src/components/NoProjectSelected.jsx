import noProjectImage from "../assets/no-projects.png";
import Button from "./Button";

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        className="w-15 h-16 object-contain mx-auto"
        src={noProjectImage}
        alt="An empty task list"
      />
      <h2 className="text-stone-500 font-bolf text-xl my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="">
        <Button onClick={onStartAddProject}>Create new project</Button>
      </p>
    </div>
  );
}
