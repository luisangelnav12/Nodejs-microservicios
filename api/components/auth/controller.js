const bcrypt = require("bcrypt");
const TABLA = "auth";
const auth = require("../../../auth");
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }
  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    console.log("data", data);
    return bcrypt.compare(password, data.password).then((sonIguales) => {
      if (sonIguales === true) {
        //generar token
        console.log(data.password);
        return auth.sign(data);
      } else {
        throw new Error("Informacion invalida");
      }
    });
  }
  async function upsert(data) {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }
    return store.upsert(TABLA, authData);
  }
  return {
    upsert,
    login,
  };
};
