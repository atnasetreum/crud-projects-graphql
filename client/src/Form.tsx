import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PROJECTS, Project } from "./App";

const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String!) {
    createProject(name: $name, description: $description) {
      _id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $name: String!, $description: String) {
    updateProject(_id: $id, name: $name, description: $description) {
      _id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

const formInitialState = {
  name: "",
  description: "",
};

interface Props {
  project: Project | null;
  setProject: (project: Project | null) => void;
}

const FormProject = ({ project, setProject }: Props) => {
  const [state, setState] = useState(formInitialState);

  const [createProject, { loading: loadingCreate, error: errorCreate }] =
    useMutation(CREATE_PROJECT, {
      refetchQueries: [{ query: GET_PROJECTS }, "getProjects"],
    });

  const [updateProject, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_PROJECT, {
      refetchQueries: [{ query: GET_PROJECTS }, "getProjects"],
    });

  useEffect(() => {
    if (project) {
      setState({
        name: project.name,
        description: project.description,
      });
    }
  }, [project]);

  const handleClick = () => {
    const { name, description } = state;
    if (project) {
      updateProject({
        variables: {
          id: project._id,
          name,
          description,
        },
      });
      setProject(null);
    } else {
      createProject({
        variables: {
          name,
          description,
        },
      });
    }
    setState(formInitialState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      {errorCreate && <p>Error create: {errorCreate.message}</p>}
      {errorUpdate && <p>Error update: {errorUpdate.message}</p>}
      <input
        placeholder="Enter your name"
        name="name"
        value={state.name}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        placeholder="Enter your description"
        name="description"
        value={state.description}
        onChange={handleChange}
        autoComplete="off"
      />
      <button onClick={handleClick} disabled={loadingCreate || loadingUpdate}>
        Submit
      </button>
    </>
  );
};

export default FormProject;
