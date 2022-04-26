const db = {
  user: [
    { id: "1", name: "Juan", lastname: "Perez" },
    { id: "2", name: "Pedro", lastname: "Perez" },
  ],
};
async function list(tabla) {
  return db[tabla];
}
async function get(tabla, id) {
  let collection = await list(tabla);
  return collection.filter((item) => item.id === id)[0] || null;
}
async function upsert(tabla, tabla) {
  db[collection].push(tabla);
}
async function remove(tabla, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
