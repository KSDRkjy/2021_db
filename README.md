# 2021_db

# 8주차는 오류로 인해 추가하지 못했습니다.
## 3주차 관련 사항

3 주차에서 만들어진 테이블은 다음과 같습니다.

CREATE TABLE STUDENT2 (
    StudentNumber INTEGER NOT NULL,
    Name VARCHAR(30) NOT NULL,
    Class CHAR NOT NULL,
    AdmissionDate VARCHAR(50) NOT NULL,
    Email VARCHAR(30) NOT NULL,
    PRIMARY KEY (StudentNumber));

Student2는 학번을 PK로 삼습니다.

## 10주차 관련 사항

10 주차에서 만들어진 테이블은 다음과 같습니다.

CREATE TABLE It_lecture (
    Name varchar(20) not null,
    Lnumber INTEGER not null,
    primary key(Lnumber)
);

It_lecture 는 Lnumber를 PK로 갖습니다.