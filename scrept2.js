let thename = document.getElementById('thename');
let dolar = document.getElementById('dolar');
let thephone = document.getElementById('thephone');
let themoney = document.getElementById('themoney');
let themonth = document.getElementById('themonth');
let thedate = document.getElementById('thedate');
let thedicont = document.getElementById('thedicont');
let submit = document.getElementById('submit');
var opendetals = document.getElementsByClassName('more-btn');
var closedetals = document.getElementById('closedetals');
var borddetals = document.getElementById('borddetals');
let dt1 = document.getElementById('dt1');
let dt2 = document.getElementById('dt2');
let dt3 = document.getElementById('dt3');
let dt4 = document.getElementById('dt4');
let mood = 'creat';
let tmp;
let crazechatgpt = 0;
var bordarcreat1 = document.getElementById('bordarcreat1');


let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}   

submit.onclick = function(){
    let newPro = {
        thename:thename.value,
        dolar:dolar.value,
        thephone:thephone.value,
        themoney:themoney.value,
        themonth:themonth.value,
        thedate:thedate.value,
        thedicont:thedicont.value,
    }
    if(thename.value != ''&& thedate.value != '' && dolar.value != '' && themoney.value != ''&& thedicont !='' && thephone.value != ''){
        if(mood === 'creat'){
            dataPro.push(newPro)
        }else{
            dataPro[ tmp ] = newPro;
            mood = 'creat';
        }
        clearData()
    }
   
    localStorage.setItem('product', JSON.stringify(dataPro))
  
    showData()
}

function clearData(){
    thename.value = '';
    dolar.value = '';
    thephone.value = '';
    themoney.value = '';
    themonth.value = '';
    thedate.value = '';
    thedicont.value = '';
}

function showData(){

    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
        <th>${i+1}</th>
        <th>${dataPro[i].dolar}</th>
        <th>${dataPro[i].thedate}</th>
        <th>${dataPro[i].thephone}</th>
        <th>${dataPro[i].thedicont}</th>
        <th>${dataPro[i].themonth}</th>
        <th>${dataPro[i].themoney}</th>
        <th>${dataPro[i].thename}</th>
        <th ><button class="more-btn" onclick="showData2(${i})" id="more-btn">تفاصيل الزبون</button></th>
    </tr>`
    }
    
    document.getElementById('tbody').innerHTML = table;
   
    
}
showData()


function showData2(i){

    
    let divg = '';
    if(borddetals.style.display == "none"){
        borddetals.style.display = "flex";
    } else {
        borddetals.style.display = "none";
    }
    
    divg += `

    <div class="bordar-details1">
        <div class="bordar-details2">
                <h3>معلومات الزبون</h3><br>
            <div class="bord-1-det" id="divg">
                <div class="bord-1-det1">
                    <h3>- الاسم -</h3><hr>
                    <h3>- رقم الهاتف -</h3><hr>
                    <h3>- المبلغ الكلي - </h3><hr>
                    <h3>- الاستقطاع -</h3><hr>
                    <h3>- الدولار $ -</h3><hr>
                    <h3>- عدد الاشهر -</h3><hr>
                    <h3>- تاريخ الانشاء -</h3> <hr>
                    <h3>- المتبقي -</h3>
                    <button class="Btn" onclick="updatData(${i})">تعديل
                     </button>                              
                </div>
                <div class="bord-1-det2" >
                    <h3>${dataPro[i].thename}</h3><hr>
                    <h3>${dataPro[i].thephone}</h3><hr>
                    <h3>${dataPro[i].themoney}</h3><hr>
                    <h3>${dataPro[i].thedicont}</h3><hr>
                    <h3>${dataPro[i].dolar}</h3><hr>
                    <h3>${dataPro[i].themonth}</h3><hr>
                    <h3>${dataPro[i].thedate}</h3> <hr>
                    <h3 id="remaining_${i}"> ${dataPro[i].themoney}</h3> 
                    <button class="Btn" onclick="deleteData(${i})">حذف
                         </button>   
                </div>
           </div>
        </div>
        <div class="bordar-details3" >
            <nav class="nav-details">
                <h3>تاريخ التسديد</h3>
                <h4>الاستطاع</h4>
            </nav>
            <div class="bordardetels5" id="bordardetels44">

            </div>
        </div>
    </div>
</div>
    `
    crazechatgpt = dataPro[i].themoney;
    document.getElementById('borddetals').innerHTML = divg;
    showData3(i)
}
showData2

document.write(crazechatgpt);

  
function showData3(i){
    let divg2 = ''; 
    for(let p = 1;p <= dataPro[i].themonth;p++){
        // Retrieve the value from localStorage
        let storedValue1 = localStorage.getItem('dt2_' + i + '_' + p) || '';
        let storedValue2 = localStorage.getItem('dt3_' + i + '_' + p) || '';

        divg2 += `
        <div class="bordar-detels4" >
        <button id="dt1_${p}" onclick="showData4(${i}, ${p})">تم</button>
        <input type="text" id="dt2_${i}_${p}" value="${storedValue1}">
        <input type="text" id="dt3_${i}_${p}" value="${storedValue2}">
        <h3 id="dt4_${p}">${storedValue1}</h3>
        <h3 id="dt5_${p}">${storedValue2}</h3>
        <h4 id="dt6_${p}">${p}</h4>
        </div>
       
        `    
    }

    document.getElementById('bordardetels44').innerHTML = divg2;
}


// الدالة التي تقوم بعرض التفاصيل
function showData4(i, p) {
    let value1 = document.getElementById('dt2_' + i + '_' + p).value;
    let value2 = document.getElementById('dt3_' + i + '_' + p).value;
    let remainingElement = document.getElementById('remaining_' + i);
    let remainingValue = parseFloat(remainingElement.textContent.replace(/,/g, ''));

    if (value1 !== '' && value2 !== '') {
        let newValue = remainingValue - parseFloat(value2);
        remainingElement.textContent = newValue.toLocaleString();

        localStorage.setItem('dt2_' + i + '_' + p, value1);
        localStorage.setItem('dt3_' + i + '_' + p, value2);
        localStorage.setItem('remaining_' + i, newValue);

        // تحديث القيمة المعروضة في العنصر النصي للمتبقي
        document.getElementById('dt4_' + p).textContent = value1;
        document.getElementById('dt5_' + p).textContent = value2;
    }
}


function loadData() {
    for (let i = 0; i < dataPro.length; i++) {
        let remainingElement = document.getElementById('remaining_' + i);
        let remainingValue = parseFloat(localStorage.getItem('remaining_' + i) || dataPro[i].themoney.replace(/,/g, ''));

        if (!localStorage.getItem('remainingSet_' + i)) {
            // قيمة تحسب بناءً على القيم الأصلية
            remainingValue = calculateRemainingValue(i);
            localStorage.setItem('remaining_' + i, remainingValue);
            localStorage.setItem('remainingSet_' + i, true);
        }
        
        remainingElement.textContent = remainingValue.toLocaleString();
    }
}


function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
    if(borddetals.style.display == "flex"){
         borddetals.style.display = "none";
    } else {
        borddetals.style.display = "flex";
    } 
}

function updatData(i)
{
    thename.value = dataPro[i].thename;
    dolar.value = dataPro[i].dolar;
    thedate.value = dataPro[i].thedate;
    thedicont.value = dataPro[i].thedicont;
    themoney.value = dataPro[i].themoney;
    themonth.value = dataPro[i].themonth;
    thephone.value = dataPro[i].thephone;
    mood = 'update';
    tmp = i;
    scroll({top:0,behavior:'smooth',})

    if(borddetals.style.display == "flex"){
         borddetals.style.display = "none";
    } else {
        borddetals.style.display = "flex";
    } 
    alert("تم الحفظ")
    bbb ()
    
}

function bbb (){
    if(bordarcreat1.style.display == "none"){
        bordarcreat1.style.display = "inline-block";
    }
    else{
        bordarcreat1.style.display = "none";
    }
}
bbb ()


function searchData(value)
{
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        if(dataPro[i].thename.includes(value)){
            table += `
            <tr>
            <th>${i}</th>
            <th>${dataPro[i].dolar}</th>
            <th>${dataPro[i].thedate}</th>
            <th>${dataPro[i].thephone}</th>
            <th>${dataPro[i].thedicont}</th>
            <th>${dataPro[i].themonth}</th>
            <th>${dataPro[i].themoney}</th>
            <th>${dataPro[i].thename}</th>
            <th ><button class="more-btn" onclick="showData2(${i})" id="more-btn">تفاصيل الزبون</button></th>
        </tr>`
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
//------------------------------------------------------------------------
function calculateTotal(property) {
    let total = 0;
    for(let i = 0; i < dataPro.length; i++){
        total += Number(dataPro[i][property]);
    }
    return total;
}

function showTotal(property, elementId) {
    let total = calculateTotal(property);
    // تحويل الرقم إلى شكل مع فواصل
    let formattedTotal = total.toLocaleString();
    document.getElementById(elementId).textContent = '' + formattedTotal;
}

// استدعاء الدوال لحساب المجموع وعرضه
showTotal('themoney', 'total1');
showTotal('dolar', 'total4');
showTotal('thedicont', 'total3');

// حساب عدد الزبائن وعرضه
document.getElementById('total2').textContent = '' + dataPro.length.toLocaleString();

function reloadPage() {
    location.reload();
}
