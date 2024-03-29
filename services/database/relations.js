import database from "./index";
import Event from "../Event/Event.Model";
import Image from "../Image/Image.Model";
import Log from "../Log/Log.Model";
import Post from "../Post/Post.Model";
import Service from "../Service/Service.Model";
import Tag from "../Tag/Tag.Model";
import User from "../User/User.Model";
import createData from "./seeds";
import Group from "../Group/Group.Model";
import UsersServices from "../UsersServices/UsersServices.Model";
import Setting from "../Setting/Setting.Model";
import Career from "../Career/Career.Model";

//USER - POST
User.hasMany(Post, { foreignKey: "userId"});
Post.belongsTo(User, { foreignKey: "userId", as: "autor"});

//GROUP - USER
Group.hasMany(User, { foreignKey: "groupId"});
User.belongsTo(Group, { foreignKey: "groupId", as: "group"});

User.hasMany(UsersServices, {foreignKey: "userId"});
UsersServices.belongsTo(User, {foreignKey: "userId", as: "services"});

Service.hasMany(UsersServices, {foreignKey: "serviceId"});
UsersServices.belongsTo(Service, {foreignKey: "serviceId", as: "users"});

//POST - TAG
Post.hasMany(Tag, { foreignKey: "postId", as: "tags"});
Tag.belongsTo(Post, { foreignKey: "postId", as: "tags"});

//POST - SERVICE
Service.hasMany(Post, { foreignKey: { name: "serviceId", allowNull: true }})
Post.belongsTo(Service, {foreignKey: {name: "serviceId", allowNull: true }})

//IMAGE - POST
Post.hasMany(Image, { foreignKey: { name: "postId", allowNull: true }, as: "images"});
Image.belongsTo(Post, { foreignKey: {name: "postId", allowNull: true }, as: "images"});

//USER - LOG
User.hasMany(Log, { foreignKey: "userId"});
Log.belongsTo(User, { foreignKey: "userId"});

export const sync = async (admin) => {
  return await database
    .sync({ force: true })
    .then(() => {
      createData(admin);
      return {
        status: true,
        message: "Connection has been established successfully.",
      };
    })
    .catch((error) => {
      return {
        status: false,
        message: `Unable to connect to the database: ${error.toString()}`,
      };
    });
};
