<template>

<div class="all-grid">
    <div class="left-side">
        <p class="title">請貼上在
            <a href="https://qrysub.nccu.edu.tw/">全校課程查詢系統</a>
            複製的資料</p><br><br>
        <textarea class="text-div" v-model="rawInfo" placeholder="從編號開始複製即可" ></textarea><br>
        <!-- <textarea class="text-div" v-model="rawInfo">hello</textarea><br> -->
        
        <input class="button-1" type ="button" @click="back()" value="回到上一頁"/>
        <input class="button-1" type ="button" @click="sortInfo(rawInfo)" value="彙整資料"/>
        <!-- <input class="button-1" type ="button" @click="initiate()" value="範例資料"/> -->
        
        <br><br>
        <p class="title" v-if="view === 1| view === 2">勾選想要加入模擬課表的課程</p>
        <div class="checkbox-list" v-for="(course, index) in coursesList" :key="index">
            <input type="checkbox" class="checkbox-box" :value="course.getInfo()" :id="course.getInfo()" v-model="selected_list"/>
            <label class="checkbox-label" :for="course.getInfo()">{{course.getInfo()}}</label>
        </div>

    </div>

    <div class="right-side">
        <img src="../assets/elf.jpg">
        
        <p id="title-2" v-if="view === 1 | view === 2">即將被放入模擬課表之課程</p>
        <div id="chosen-courses" v-if="view === 1 | view === 2">
            <div v-for="(course,index) in selected_list" :key="index">
                <p>{{course}}</p>
            </div>
        </div>
        <input class="button-1" type ="button" @click="mockSchedule()" v-if="view === 1 | view === 2" value="模擬課表"/>
    </div>
</div>
<br><br><br><br><br><br><br>
    <p id="title-2" v-if="view === 2">111 學年度 第 1 學期 模擬課表</p>
    <p id="title-3" v-if="view === 2">* 點下課程按鈕會被導入更加詳細的課程大綱 *</p>
    <div class="schedule-grid" v-if="view === 2">
        <div v-for="(row, rowIndex) in schedule" :key="rowIndex">
            <div v-for="(col, colIndex) in row" :key="colIndex">
            <button class="course-button" v-if="typeof(col) === 'object'" @click="courseIntro(col)">{{col.name}}</button>
            <button class="course-button-3" v-else-if="typeof(col) === 'string'">{{col}}</button>
            <button class="course-button-2" v-else>-</button>
            </div>
        </div>
    </div>
</template>


<script>

import { ref } from 'vue'
import {Course} from  '../models/Course.js'


const coursesList = [];
const view = ref(0);
const selected_list = [];
const schedule = [];
let rawInfo = ref('');
const day = [];
const test_data = "1 000359081	統計學（一）	周珮婷	3.0	四D56/資訊140206	正常 2 000359091	統計學（一）	黃佳慧	3.0	四D56/研究250307	正常 3 000601011	民法概要	詹聰哲	2.0	三78/大勇210201	正常";

day.push("星期一");
day.push("星期二");
day.push("星期三");
day.push("星期四");
day.push("星期五");

function initiate(){

    rawInfo.value = test_data;
}

function sortInfo (rawInfo){
    
    this.coursesList = [];
    this.selected_list = [];

    let rawTxt = rawInfo.replace(/(\n|\r|\r\n|\t)/g, ' ' );
    rawTxt = rawTxt.replaceAll("    "," ");
    let txt = rawTxt.split(" ");
    
    this.view = 1;
    
    let order, number, name, teacher, credit, place;
    for(let i = 0; i < txt.length; ++i){
        
        if( i % 7 == 0) order = txt[i];
        else if( i % 7 == 1) number = txt[i];
        else if( i % 7 == 2) name = txt[i];
        else if( i % 7 == 3) teacher = txt[i];
        else if( i % 7 == 4) credit = txt[i];
        else if( i % 7 == 5) place = txt[i];
        else if( i % 7 == 6) {
            let course = new Course(order, number, name, teacher, credit, place);
            this.coursesList.push(course);
        }   
    }
}


function mockSchedule(){

    this.view = 2;
    this.schedule = [];

    for(let i = 0; i < 6; ++i){
        this.schedule.push(new Array(17));
    }

    for(let i = 0; i < 6; ++i){
        for(let j = 0; j < 17; ++j){
            if(i == 0 && j == 0){
                this.schedule[i][j] = 0;
            }else if(i == 0){
                this.schedule[i][j] = `${j+5}~${j+6}`;
            }else if(j == 0){
                this.schedule[i][j] = `${day[i-1]}`;
                console.log(typeof(this.schedule[i][j]));

            }
        }
    }

    for(let k = 0; k < this.selected_list.length; ++k){

        let course;
        for(let m = 0; m < this.coursesList.length; ++m){
            if( this.coursesList[m].getInfo() == this.selected_list[k]){
                course = this.coursesList[m];
                break;
            }
        }
        
        let i = course.getDay() ;
        for(let j = course.getTime(); j < course.getTime() + course.getCredit(); ++j){
            this.schedule[i][j] = course;
        }
    }
}

function courseIntro(course){
    let csNum = course.number;
    let num = csNum.substring( 0, 6 );
    let gop = csNum.substring( 6, 8 );
    let s = csNum.substring( 8 );

    let url = `https://newdoc.nccu.edu.tw/teaschm/1111/schmPrv.jsp-yy=111&smt=1&num=${num}&gop=${gop}&s=${s}.html`;
    
    window.open(url);
}

export default{
    data (){
        return {
            rawInfo: test_data,
            coursesList: [],
            selected_list: [],
            schedule: [],
            view: 0,
        }
    },

    methods:{
        sortInfo: sortInfo,
        mockSchedule: mockSchedule,
        courseIntro: courseIntro,
        initiate: initiate,
    },
}
</script>


<style>

body{
    background-image: url("/src/assets/BG.jpg");
    width: 100%;
    height: 100%;
}

.all-grid{
    display:grid;
    grid-template-columns: 1fr 1fr;

}

.schedule-grid{
    display:grid;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    padding: 100px 100px;
}

.left-side{
    margin-left: auto;
    margin-right: auto;
}

.title{
    font-family: Arial;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color:white;
}

#title-2{
    font-family: Arial;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color:white;
    margin-top: 98px;
}

#title-3{
    font-family: Arial;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color:white;
}

.text-div{
    width: 400px;
    height: 200px;
    background-color: black;
    color: rgb(81, 208, 247);
}

.button-1{
    
    background-color:rgba(102, 102, 194, 0.861);
    color:rgb(255, 255, 255);
    margin: 30px;
    border:none;
    border-radius: 18px; 
    font-weight:bold; 
    font-size:20px; 
    cursor: pointer; 
    transition:box-shadow 0.15s;
    font-family: Arial;
    padding: 4px 2px 4px 2px;
    width:125px;
    height:40px;
    display:inline-block;
}

.button-1:hover{
    opacity: 0.9;
}

.button-1:active{
    opacity: 0.3;
}

.checkbox-list{
    float: left;
    margin-left: 30px;
    margin-bottom: 20px;
}

.checkbox-label{
    
    margin-left: 30px;
    color: white;
    font-size: 18px;
}

.checkbox-box{
    
    width:20px;
    height:20px;
}

.right-side{
    margin-left: auto;
    margin-right: auto;
}

#chosen-courses{
    border-radius: 25px;
    border: solid 3px rgba(102, 102, 194);
    padding: 20px; 
    width: 500px;
    height: auto; 
    color: white;
    text-align: center;
    font-size: 18px;
    margin-top: 30px;
}

.course-button{
    margin-right: auto;
    margin-left: auto;
    padding: auto;
    background-color:rgba(122, 122, 206, 0.861);
    color:rgb(255, 255, 255);
    border:solid;
    border-radius: 3px; 
    font-size:10px; 
    cursor: pointer; 
    width:180px;
    height:40px;
}

.course-button:active{
    opacity: 0.3;
}

.course-button:hover{
    opacity: 0.9;
}

.course-button-2{
    margin-right: auto;
    margin-left: auto;
    padding: auto;
    background-color:rgba(155, 155, 209, 0.861);
    color:rgb(255, 255, 255);
    border:solid;
    border-radius: 3px; 
    font-size:20px; 
    cursor: pointer; 
    width:180px;
    height:40px;
}

.course-button-2:active{
    opacity: 0.3;
}

.course-button-2:hover{
    opacity: 0.9;
}

.course-button-3{
    margin-right: auto;
    margin-left: auto;
    padding: auto;
    background-color:rgba(192, 176, 204, 0.861);
    color:rgb(255, 255, 255);
    border:solid;
    border-radius: 3px; 
    font-size:15px; 
    cursor: pointer; 
    width:180px;
    height:40px;
}

.course-button-3:active{
    opacity: 0.3;
}

.course-button-3:hover{
    opacity: 0.9;
}

</style>

<!-- 
1
000318081    初級會計學（二）    黃政仁    3.0    二78E/商館260306    已額滿
7
000348071    管理學    廖經維    3.0    一EFG/研究250103    已額滿
16
002344001    體育[男女合班]—土風舞初級    曾明生    1.0    五12/    正常
25
031008041    國文－古典小說選讀    洪敬清    3.0    二D56/資訊140205    正常
30
042137001    法學素養    陳靜慧    3.0    三78E/綜合270751    正常
35
043038001    計算思維    劉吉軒    3.0    四78E/綜合270101    已額滿
38
090114001    數位轉型的智權與風險管理    萬幼筠    2.0    五78/資訊140104    老師異動於2022/01/07
42
306050011    程式設計二    林怡伶    2.0    二23/資管電腦室    已額滿
36
090020001    認識中醫藥    邱榮鵬    2.0    五78/資訊140201    已額滿
40
306048001    管理科學    周彥君等    3.0    三234/商館260105    已額滿 
-->