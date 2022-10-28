import User from "../User/User.Model";
import Log from "../Log/Log.Model";
import Group from "../Group/Group.Model";
import Service from "../Service/Service.Model";
import UsersServices from "../UsersServices/UsersServices.Model";
import Career from "../Career/Career.Model";

require("./relations");

const createData = async () => {

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
    { include: [Log, { model: Group, as: "group" }] }
  );

  await Service.create({
    id: 1,
    name: "UPP",
    email: "jorge@iujo.com",
    phone: "123456789",
    description: "Servicio de UPP",
  })

  UsersServices.create({
    userId: 1,
    serviceId: 1,
    isCoordinator: 1
  })

  UsersServices.create({
    userId: 2,
    serviceId: 1,
    isCoordinator: 0,
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
      groupId: 2,
      Logs: {
        module: "USER",
        event: "CREATE",
        entityId: 1,
        createdAt: new Date(),
      },
    },
    { include: [Log, { model: Group, as: "group" }] }
  );

  await Career.create(
    {
      name: "INFORMATICA",
      coordinator: 1,
      color: "BLUE",
      icon: "ICON",
      description: "DESCRIPCION DE LA CARRERA",
      profile: "PERFIL DEL EGRESADO ASI YEI",
      path: "informatica",
      pensum: "PENSUM",
    }
  )

  await Career.create(
    {
      name: "ADMINISTRACION",
      coordinator: 2,
      color: "RED",
      icon: "ICON",
      description: "DESCRIPCION DE LA CARRERA DE ADMINSITRACION",
      profile: "PERFIL DEL EGRESADO ASI YEI AQUI AQUI",
      path: "administracion",
      pensum: "PENSUM",
    }
  )
};


export default createData;
