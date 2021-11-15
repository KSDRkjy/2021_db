import mysql from "mysql2";

// 데이터베이스에 연결합니다
// root 의 week10 데이터베이스에 연결하며
//root 의 비밀번호인 Qnflrlv1*을 넣어줍니다.
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'week10',
    password: 'Qnflrlv1*',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

const promisePool = pool.promise();

// getdepartment, getUsers, getLectures 등을 정의합니다.
// 이를 통하여, 위의 week10 데이터베이스에서 해당 자료들을 가져와 출력할 수 있습니다.
// 출력에는 select * from ~ 을 이용합니다.
export const selectSql = {
  getUsers : async () => {
    const [rows] = await promisePool.query(`select * from user`);
    
    return rows
  },
  getDepartment : async () => {
    const [rows] = await promisePool.query(`select * from department`);

    return rows
  },
  getLecture : async () => {
    const [rows] = await promisePool.query(`select * from it_lecture`);

    return rows
  }
}

// deleteDepartment 와 deleteLecture 를 정의합니다.
// 이 때, data를 통해 삭제에 필요한 정보를 가져와 쿼리문을 생성하고 실행합니다.
// const sql= `~` 문이 쿼리문입니다.
export const deleteSql = {
  // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
  deleteDepartment : async (data) => {
    console.log('deleteSql.deleteDepartment:', data.Dnumber);
    const sql = `delete from department where Dnumber=${data.Dnumber}`;
    
    await promisePool.query(sql);
  },
  deleteLecture : async (data) => {
    console.log('deleteSql.deleteIT_Lecture:', data.Lnumber);
    const sql = `delete from it_lecture where Lnumber=${data.Lnumber}`;
    
    await promisePool.query(sql);
  },
}