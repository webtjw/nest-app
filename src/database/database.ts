import { DatabaseQueryResult } from "./database.dto";

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tanjiawei',
  password: '123456',
  database: 'techsite'
});

connection.connect(err => {
  if (err) console.log(`[database] error connecting: ${err.stack}`);
  else console.log(`[database] connected at thread ${connection.threadId}`);
});

const database = {
  sql(sql: string): Promise<DatabaseQueryResult> {
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, (err, result) => {
          resolve(new DatabaseQueryResult(!err, err ? (err || '发生了未知的错误') : result))
        })
      } catch(e) {
        console.log(`database.sql 发生了意料之外的错误：`);
        console.log(e);
      }
    })
  }
}

export {
  database
}
