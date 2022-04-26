const nanoId = require("nanoid");
const TABLA = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }
  function list() {
    return store.list(TABLA);
  }
  function get(id) {
    return store.get(TABLA, id);
  }
  function upsert(body) {
    const user = {
      name: body.name,
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoId();
    }
    return store.upsert(TABLA, user);
  }
  return {
    list,
    get,
  };
};
