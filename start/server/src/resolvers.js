module.exports = {
  Query: {
    Key: (_, __, { dataSources }) => dataSources.launchAPI.getKey(),
    Menu: (_, __, { dataSources }) => dataSources.launchAPI.getMenu(),
    Login: (_, { email, pass }, { dataSources }) => {
      return dataSources.launchAPI.Login({ email: email, pass: pass });
    }
  }
};
