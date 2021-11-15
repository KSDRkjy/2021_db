// Copyright 2021 kms
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

// login 을 렌더링 합니다.
router.get('/', (req, res) => {
    res.render('login');
});

// map 함수를 통해 데이터 베이스 내의 아이디와 패스워드를 체크하고
// 일치하면 whoAmI에 admin 또는 user를 넣어줍니다.
// 이 후, if 문을 통해 admin이나 user면 /delete나 /select 로 리다이렉트,
// whoAmI에 admin도 user 도 입력되지 않았으면 로그인 실패 메세지를 출력합니다.
router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUsers();
    let whoAmI = '';
    let checkLogin = false;

    users.map((user)=>{
        console.log(user.Id);
        if(vars.id === user.Id && vars.password === user.Password){
            console.log('login success!');
            checkLogin = true;
            if(vars.id === 'admin'){
                whoAmI = 'admin'
            }else{
                whoAmI='user';
            }
        }
    })


    if (checkLogin && whoAmI === 'admin'){
        res.redirect('/delete');
    } else if (checkLogin && whoAmI === 'user'){
        res.redirect('/select');
    }else{
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>");
    }
})

module.exports = router;