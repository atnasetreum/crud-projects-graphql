import { gql, useMutation, useQuery } from "@apollo/client";
import FormProject from "./Form";
import { useState } from "react";

export const GET_PROJECTS = gql`
  query Projects {
    projects {
      _id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

const REMOVE_PROJECT = gql`
  mutation RemoveProject($id: ID!) {
    removeProject(_id: $id) {
      _id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export interface Project {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const App = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [project, setProject] = useState<Project | null>(null);

  const [removeProject] = useMutation(REMOVE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }, "getProjects"],
  });

  const handleRemove = (id: string) => {
    removeProject({
      variables: {
        id,
      },
    });
  };

  const handleEdit = (project: Project) => {
    setProject(project);
  };

  return (
    <>
      <FormProject project={project} setProject={setProject} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data &&
        data.projects.map((project: any) => (
          <div key={project._id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>{project.createdAt}</p>
            <p>{project.updatedAt}</p>
            <button onClick={() => handleEdit(project)}>Edit</button>
            <br />
            <br />
            <button onClick={() => handleRemove(project._id)}>Remove</button>
          </div>
        ))}
    </>
  );
};

export default App;
