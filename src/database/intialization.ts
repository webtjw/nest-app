import { ReturnServiceObject } from "./database.dto";

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
  sql(sql: string): Promise<ReturnServiceObject> {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) reject(err || '发生了未知的错误')
        else resolve(result)
      })
    })
  }
}

export {
  database
}
