const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here

  type Query {
    Key: Token
    Menu: MenuList
    Login(email: String!, pass: String!): MenuList
  }

  type Token {
    body: String
    xsrf: String
    session: String
  }

  type MenuList {
    code: Int
    data: MenuData
    msg: String
    status: String
  }

  type MenuData {
    footMenu: [commonMenu]
    platform: [platform]
    sideMenu: [commonMenu]
    thirdParty: thirdParty
    xinMenu: [commonMenu]
  }

  type platform {
    code: String
    name: String
    subMenu: [String]
  }

  type thirdParty {
    facebook: facebook
    google: google
  }

  type facebook {
    client_id: String
    client_version: String
  }
  type google {
    client_id: String
  }

  type commonMenu {
    link: String
    subMenu: [subMenu]
    target: Boolean
    title: String
  }

  type subMenu {
    link: String
    target: Boolean
    title: String
  }
`;

module.exports = typeDefs;
