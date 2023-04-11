import Project from "../models/Project.js";

export const resolvers = {
  Query: {
    projects: async () => await Project.find({}),
    project: async (_, { _id }) => {
      const project = await Project.findById(_id);
      if (!project) throw new Error("Project not found");
      return project;
    },
  },
  Mutation: {
    createProject: async (_, { name, description }) => {
      const project = new Project({
        name,
        description,
      });
      return await project.save();
    },
    updateProject: async (_, { _id, name, description }) => {
      await Project.findByIdAndUpdate(_id, {
        name,
        description,
      });
      return await Project.findById(_id);
    },
    removeProject: async (_, { _id }) => {
      return await Project.findByIdAndRemove(_id);
    },
  },
};
