// all DOM selected variables.
const btn = document.getElementById("submit-form");
const urladdr = "https://api.blockcypher.com/v1/btc/test3/addrs/";
const searchaddress = document.getElementById("search-address");
const piechart = document.getElementById("piechart");
const total_blance = document.querySelector(".total-blance");
const output = document.getElementById("output");
const bcaddress= document.getElementById("bcaddress");
const transnumber = document.getElementById("transnumber");
const transactionDOM = document.getElementById("transactionlist");
const transactionRem = document.getElementById("transaction");

const storagedb = {
    transaction: []
};
// create QR code custom
if (screen.width >414){
    var qrcode = new QRCode(output, {
    text: "",
    width: 214,
    height: 214,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});
};

if (screen.width <= 414){
var qrcode = new QRCode(output, {
    text: "",
    width: 78,
    height: 78,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});
};
// when button click every thing start.
btn.addEventListener("submit", function(e){
    e.preventDefault();
    const input = searchaddress.value;
    getdispdata(urladdr, input).then(data =>{
        displayboard()
        // create QR for address
        qrcode.clear();
        qrcode.makeCode(data.address);
        // display implement data from API 
        removeFunction();
        display(data);
        displaytransaction(data);
        // store data into datagedb
        buildupstoragebd(data);
    });
}); 
// function handle user input and API's url
function getdispdata(urladdress, input){
    /*const ajax = new XMLHttpRequest();
    const url = urladdress+ input+ "/full?limit=50";
    // AJAX create GET request to http server to retrive API from url.
    ajax.open('GET', url,true);
    ajax.onload = function(){
        if ( this.status === 200){
            const data = JSON.parse(this.responseText);
            displayboard()
            // create QR for address
            qrcode.clear();
            qrcode.makeCode(data.address);
            // display implement data from API 
            myFunction();
            display(data);
            displaytransaction(data);
            // store data into datagedb
            buildupstoragebd(data);
        } else{
            closeboard();
            this.onerror();
        }
    }
    // create error display when user type wrong address.
    ajax.onerror = function(){
        console.log("there something wrong");
    }
    ajax.send();
    */
   return new Promise(function(resolve, reject) {
    const ajax = new XMLHttpRequest();
    const url = urladdress+ input+ "/full?limit=50";
    ajax.open('GET', url,true);
    ajax.send();
    ajax.onload = function(){
        if ( this.status === 200){
        const data = JSON.parse(this.responseText);
        const compldata = data;
        resolve(compldata);
        } else{
            closeboard();
            reject(this.onerror());
        }
    };
});
}

// open transaction list
function displayboard(){
     if ( document.querySelector(".undisplayed").classList.contains('undisplayed')){
            document.querySelector(".undisplayed").classList.add("displayed");}
}
// close transaction list
function closeboard(){
    if ( document.querySelector(".undisplayed").classList.contains('displayed')){
        document.querySelector(".undisplayed").classList.remove("displayed");}
}
// display transaction 
function displaytransaction(data){
    transnumber.textContent= data.txs.length;
   
    // create transaction
    data.txs.forEach(element => {
        // create each Transaction. 
        const transaction = document.createElement("div");
         let script="" ;
         transaction.classList.add(
           "row",
           "mb-3",
           "p-3",
           "bg-info",
            "text-white"
         );   
        const v = window.innerWidth;
        // create script cause google will automatically close tag <> so it is hard to customize like i want.
        script += `<div class="col-md-12 text-center p-2">
        <span class="border border-light bg-light text-dark p-2 mb-2" style="border-radius:40px">Hash:
        ${ v <= 414 ? element.hash.substring(0, 20) : element.hash }.....</span></div>`;
        script += `<div class="col-md-5 p-2 text-center"><span>${element.inputs.length} Input Consumed</span><br>`;
            element.inputs.map(x => (
                script += `<div class="border border-light bg-light text-dark pr-2 pl-2 mb-2" style="border-radius:40px"><span>
                ${x.output_value/100000000} BTC from</span><br></be><span">
                ${v <= 414 ? x.addresses.toString().substring(0,25) + `....` : x.addresses}</span></div>`
            ))
        script += `</div><div class="col-md-2"></div><div class="col-md-5 text-center"><span>${element.outputs.length} Output Consumed</span><br>`;
            element.outputs.map(y => { 
                script += `<div class="border border-light bg-light text-dark pr-2 pl-2 mb-2" style="border-radius:40px"><span>
                ${y.value/100000000} BTC to</span><br><span>
                ${v <= 414 ? y.addresses.toString().substring(0,25) + `....` : y.addresses}</span><br></div>`;    
            });
        script+= `</div>`;
        // insert scripts to <div transaction></div>          
        transaction.innerHTML += script;
        transactionRem.appendChild(transaction);   
    });   
}   
function buildupstoragebd(data){
    storagedb.transaction= Object.keys(data.txs).map(key => {
        return{
            hash: data.txs[key].hash,
            address: data.address,
            from_value:  data.txs[key].total,
            fees: data.txs[key].fees,
            recieved: data.txs[key].received,
            recieved_value: data.txs[key].inputs.map(a => {
                   return a.output_value;
            })

        }
    })
  
}
function display(data){
    let totalbalance = 0;
    let totalsent = 0;
    let totalrec = 0;
    bcaddress.textContent = data.address;
    totalrec = data.total_received/100000000;
    totalsent = data.total_sent/100000000;
    totalbalance = data.balance/100000000;
    // set up / display Pie chart base on rec/sent/total
    let chart = new Chart(piechart,{
        type: 'doughnut',
        data: {
            labels: [
              "Total_received",
              "Total_sent",
              
            ],
            datasets: [{
                data: [totalrec, totalsent],
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  
                ]
            }]
        },
    } )
    total_blance.innerHTML = "<span>Total <br> "+totalbalance+" BTC </span>";
};
//remove duplicate display transaction 
function removeFunction() {
   while(transactionRem.hasChildNodes()){
       transactionRem.removeChild(transactionRem.firstChild);
   }
   const transaction = document.createElement("div");
   transaction.classList.add(
    "transactionlist"
   );
   transactionRem.appendChild(transaction);
  }
//Ajax handle UpdateDatabase, make sure transaction which are displaying stored into database.
$(function(){
    $('#get-button1').on('click', function(e){
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/products',
        contentType: 'application/json',
        data: JSON.stringify({name: storagedb}),
        success: function(response){
            $('#get-button').click(); //display database table
        }
    });
    })
})

