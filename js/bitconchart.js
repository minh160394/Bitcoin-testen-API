
class AjaxBitonApi{
    constructor(){
        const time = [];
        const price = [];
    }
    async getAPI(){
        const url = `https://api.coindesk.com/v1/bpi/historical/close.json`;
        const bitcoindata = await fetch(url);
        const data = await bitcoindata.json();
        return data;
    }
}
class displaychart{
    constructor (){
        this.curprice = document.getElementById("curprice");
        this.comprice = document.getElementById("comprice");
        this.date = document.getElementById("date");
    }
    display(data){
       const obj = Object.keys(data.bpi).map(key =>{
           return{
               time: key,
               price: data.bpi[key]
           }
           
       })
       let time=[];
       let dataapi=[];
       let curprice = obj[obj.length - 1].price;
       let comprice = obj[obj.length - 1].price - obj[0].price;
       let date = "From "+obj[0].time +" to  "+obj[obj.length - 1].time;
        this.curprice.textContent = "$ " + curprice.toFixed(2) ;
        this.comprice.textContent = comprice.toFixed(2);
        this.comprice.textContent = "$ " + comprice.toFixed(2);
        this.date.textContent = date;
        for ( let i=0; i <= obj.length-1; i++){
            time.push(obj[i].time);
            dataapi.push(obj[i].price);
        }
        if(comprice => 0){
            this.comprice.classList.add('headchart-right-pos')
            this.comprice.textContent = "$ +" + comprice.toFixed(2);
        }else{     
            this.comprice.classList.add('headchart-right-pos')
            this.comprice.textContent = "$ " + comprice.toFixed(2);
        }
        
        var myLineChart = new Chart(chart, {
            type: 'line',
            data: {
                labels: time,
                datasets: [
                    {
                        label: "bitcoin",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor:"#034f84",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 4,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor:"rgba(75,192,192,1)",
                        pointHoverBorderColor:"rgba(220,220,220,1)",
                        pointHoverBorderWidth:2,
                        pointRadius: 1,
                        pointHitRadius:10,
                        data: dataapi
                    }
                ]
            },
            
        });
        
       
       
    }
}
    const chart = document.getElementById("bitconchart");
    const bitconapi = new AjaxBitonApi();
    const displayapi = new displaychart(); 
    bitconapi.getAPI().then(data => displayapi.display(data));
    

   