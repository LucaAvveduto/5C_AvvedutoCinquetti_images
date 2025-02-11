const mysql = require("mysql2");

module.exports = DBComponent = (conf) => {
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
    CREATE TABLE IF NOT EXISTS images
       ( id INT PRIMARY KEY AUTO_INCREMENT, 
          url VARCHAR(255) NOT NULL
       ); 
       `);
  };
  (async () => {createTable()})();

  return {
    insert: async (img) => {
      const template = `INSERT INTO images (name) VALUES ('$NAME')`;
      let sql = template.replace("$NAME", img.name);
      return await executeQuery(sql);
    },

    select: async () => {
      const sql = `SELECT id, url FROM images`;
      return await executeQuery(sql);
    },

    del: async (img) => {
      const query = "DELETE FROM images WHERE id=$ID";
      let sql = query.replace("$ID", img.id);
      return await executeQuery(sql);
    },
  };
};
