import database from "./index";
import Anchored from "../Anchored/Anchored.Model";
import Career from "../Career/Career.Model";
import Event from "../Event/Event.Model";
import Image from "../Image/Image.Model";
import Log from "../Log/Log.Model";
import Post from "../Post/Post.Model";
import Service from "../Service/Service.Model";
import Tag from "../Tag/Tag.Model";
import User from "../User/User.Model";
import createData from "./seeds";

//USER - POST
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

//USER - LOG
User.hasMany(Log, { foreignKey: "userId" });
Log.belongsTo(User, { foreignKey: "userId" });

//POST - TAG
Post.hasMany(Tag, { foreignKey: "postId" });
Tag.belongsTo(Post, { foreignKey: "postId" });

//IMAGE - SERVICE
Image.hasMany(Service, { foreignKey: "imageId" });
Service.belongsTo(Image, { foreignKey: "imageId" });

//IMAGE - POST
Image.hasMany(Post, { foreignKey: "imageId" });
Post.belongsTo(Image, { foreignKey: "imageId" });

//IMAGE - EVENT
Image.hasMany(Event, { foreignKey: "imageId" });
Event.belongsTo(Image, { foreignKey: "imageId" });

export const sync = () => {
  database
    .sync({ force: true })
    .then(() => {
      createData();
      return {
        status: true,
        message: "Connection has been established successfully.",
      };
    })
    .catch((error) => {
      return { status: false, message: "Unable to connect to the database." };
    });
};
