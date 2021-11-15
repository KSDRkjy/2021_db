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
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();

// 기존의 입력 값 불러옵니다.
// department에 selectSql에서 정의했던 getDepartment를,
// it_lecture 에 getLecture 를 넣어준 후, res.render를 통해 delete를 렌더링 합니다.
router.get('/', async (req, res) => {
    const department = await selectSql.getDepartment();
    const it_lecture = await selectSql.getLecture();
    
    res.render('delete', {
        title: "삭제 기능",
        department,
        it_lecture
    })
});


// 삭제 버튼을 눌렀을 경우, if 문을 통해 어떤 자료형을 삭제하려는지 판단합니다.
// 이 때, delLtn 은 it_lecture 테이블의 Primary Key 인 Lnumber 를 받아옵니다.
// delBtn 은 반대로 department 테이블의 Dnumber 를 받아옵니다.
// 이를 통해, delBtn이 NULL 이라면 delLtn을 받은 것이고, 이는 it_Lecture 테이블에서
// 어느 요소를 삭제하고자 하는 것이므로. deleteLecture 를 시행합니다.
// 그 외의 경우엔 deleteDepartment 를 시행합니다.
router.post('/', async (req, res) => {
    if(req.body.delBtn==null){
        console.log('delete router:', req.body.delLtn);
        
        const data = {
            Lnumber: req.body.delLtn,
        }; 

        await deleteSql.deleteLecture(data);

        res.redirect('/delete'); // localhost:3000/select
    }
    else{
        console.log('delete router:', req.body.delBtn);

        const data = {
            Dnumber: req.body.delBtn,
        }; 

        await deleteSql.deleteDepartment(data);

        res.redirect('/delete'); // localhost:3000/select
    }
});

module.exports = router;