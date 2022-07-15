import User from "../User/User.Model";
import Log from "../Log/Log.Model";
require("./relations");

const createData = async () => {
  await User.create(
    {
      id: 1,
      name: "IUJO",
      username: "admin",
      password: "admin",
      email: "example@iujo.edu.ve",
      role: "ADM",
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      Logs: {
        module: "USER",
        event: "CREATE",
        entityId: 1,
        createdAt: new Date(),
      },
    },
    { include: [Log] }
  );
};

export default createData;
