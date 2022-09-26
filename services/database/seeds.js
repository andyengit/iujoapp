import User from "../User/User.Model";
import Log from "../Log/Log.Model";
import Group from "../Group/Group.Model";
import Service from "../Service/Service.Model";
import UsersServices from "../UsersServices/UsersServices.Model";

require("./relations");

const createData = async () => {

  await Group.create({
    id: 1,
    name: "Administrador",
    isAdmin: true,
    postApprover: true,
  })

  await Service.create({
    id: 1,
    name: "UPP",
    coordinator: "Jorge",
    email: "jorge@iujo.com",
    phone: "123456789",
    description: "Servicio de UPP",
  })

  await User.create(
    {
      id: 1,
      name: "IUJO",
      username: "admin",
      password: "admin",
      email: "example@iujo.edu.ve",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      groupId: 1,
      Logs: {
        module: "USER",
        event: "CREATE",
        entityId: 1,
        createdAt: new Date(),
      },
    },
    { include: [Log, {model: Group, as: "group"}] }
  );

  UsersServices.create({
    userId: 1,
    serviceId: 1,
  })

  await User.create(
    {
      id: 2,
      name: "Anderson",
      username: "andy",
      password: "admin",
      email: "anderson@iujo.edu.ve",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      groupId: 1,
      Logs: {
        module: "USER",
        event: "CREATE",
        entityId: 1,
        createdAt: new Date(),
      },
    },
    { include: [Log, {model: Group, as: "group"}] }
  );

};

export default createData;
