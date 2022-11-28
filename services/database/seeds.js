import User from "../User/User.Model";
import Log from "../Log/Log.Model";
import Group from "../Group/Group.Model";

require("./relations");

const createData = async (admin) => {

  await Group.create({
    id: 1,
    name: "Administrador",
    isAdmin: true,
    postApprover: true,
  })

  await Group.create({
    id: 2,
    name: "Author",
    isAdmin: false,
    postApprover: true,
  })

  await User.create(
    {
      id: 1,
      name: "Development",
      username: "dev",
      password: "$2b$10$AHUO1SLFi3RaVotvvlRzaud3MkH4iK5WZrhE.U1FaOHR1apT4X/WS",
      email: "anderson.armeya@gmail.com",
      status: 1,
      image: "/base/logoplus.png",
      createdAt: new Date(),
      updatedAt: new Date(),
      groupId: 1,
      Logs: {
        module: "USUARIO",
        event: "CREATE",
        entity: 1,
        createdAt: new Date(),
      },
    },
    { include: [Log, { model: Group, as: "group" }] }
  );

  await User.create(
    {
      id: 2,
      name: admin.name || "Joe Doe",
      username: "admin",
      password: admin.password || "$2b$10$AHUO1SLFi3RaVotvvlRzaud3MkH4iK5WZrhE.U1FaOHR1apT4X/WS",
      email: admin.email || "example@email.com",
      status: 1,
      image: "/base/logoplus.png",
      createdAt: new Date(),
      updatedAt: new Date(),
      groupId: 1,
      Logs: {
        module: "USUARIO",
        event: "CREATE",
        entity: 2,
        createdAt: new Date(),
      },
    },
    { include: [Log, { model: Group, as: "group" }] }
  );
};


export default createData;
