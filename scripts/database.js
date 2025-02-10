
const fs = require('fs');
const mysql = require("mysql2");
const conf = JSON.parse(fs.readFileSync('conf.json'));
conf.ssl.ca = fs.readFileSync(__dirname + '/ca.pem');

export const DBComponent = () => {
  const connection = mysql.createConnection(conf);
  
  const executeQuery = (sql) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, function (err, result) {
        if (err) {
          console.error(err);
          reject();
        }
        console.log("done");
        resolve(result);
      });
    });
  };

  const createTable = async () => {
    return await executeQuery(`
    CREATE TABLE IF NOT EXISTS todo
       ( id INT PRIMARY KEY AUTO_INCREMENT, 
          name VARCHAR(255) NOT NULL, 
          completed BOOLEAN ) 
       `);
  };
  createTable();

  return {
    insert: async (todo) => {
      const template = `INSERT INTO todo (name, completed) VALUES ('$NAME', '$COMPLETED')`;
      let sql = template.replace("$NAME", todo.name);
      sql = sql.replace("$COMPLETED", todo.completed ? 1 : 0);
      return await executeQuery(sql);
    },

    select: async () => {
      const sql = `SELECT id, name, completed FROM todo`;
      return await executeQuery(sql);
    },

    del: async (todo) => {
      const query = "DELETE FROM todo WHERE id=$ID";
      console.log(todo);
      let sql = query.replace("$ID", todo.id);
      return await executeQuery(sql);
    },
  };
};
