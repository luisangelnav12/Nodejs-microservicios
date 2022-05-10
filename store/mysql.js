const mysql = require("mysql");

const config = require("../config");

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

//conectamos a la base de datos
let connection;
function handleCon() {
  connection = mysql.createConnection(dbconf);
  connection.connect((err) => {
    if (err) {
      console.error("[db error]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("[db connected]");
    }
  });

  connection.on("error", (err) => {
    console.error("[db error]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw err;
    }
  });
}
handleCon();

function list(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} `, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}
function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} where id='${id}' `,
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });
}
function insert(table, data) {
  console.log("data", data);
  return new Promise((resolve, reject) => {
    connection.query(`insert into ${table} set ?`, data, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}
function upsert(table, data) {
  return insert(table, data);
}
function update(table, data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    connection.query(
      `update ${table} set ? where id=?`,
      [data, data.id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}
async function upsert(table, data) {
  const exit = await get(table, { id: data.id });
  console.log("exit", exit);
  if (exit.length > 0) {
    console.log("update");
    return update(table, data);
  } else {
    console.log("insert");
    return insert(table, data);
  }
}
function query(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} where ? `, query, (err, res) => {
      if (err) return reject(err);
      resolve(res[0] || null);
    });
  });
}

module.exports = {
  list,
  get,
  insert,
  upsert,
  update,
  query,
};
