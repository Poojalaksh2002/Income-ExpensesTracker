const items = document.querySelector(".container2")
const balance = document.querySelector("#balance")
const income = document.querySelector("#income")
const expense = document.querySelector("#expenses")
const description= document.querySelector("#description")
const amount= document.querySelector("#amount")

// const dummyData = [
//     {id: 1, description:"Flower", amount: -100 },
//     {id: 3, description:"Book", amount: -1000},
//     {id: 2, description:"Salary", amount: 25000},
//     {id: 4, description:"Pen", amount: -20}
// ]
// let data = dummyData;
 
const localStorageItem = JSON.parse(localStorage.getItem('trans'))
let data = localStorage.getItem('trans') !=null ? localStorageItem : []

let createTransactionDetails=(data)=>{
  const sign = data.amount>0?"+":"-";
  const element = document.createElement("div")
  // element.setAttribute('class','items')
  element.classList.add('items')
  element.setAttribute('id',data.amount>0?'inc':'exp')
  element.innerHTML=`${data.description} ${sign} ${Math.abs(data.amount)} 
   <button class="cancel" onclick="cancel(${data.id})">X</button>`;
  items.appendChild(element)
 
}
const cancel=(id)=>{
    if(confirm('Are you sure you want to delete?')){
       const del = data.filter((datas)=> datas.id!= id)  // Bug 1
         console.log(id)// it mentions clicked id 
         console.log(del)
         update()
        updateLocalStorage()
    }else{
        return;
    }
}
let updateAmt=()=>{

    //total balance
   let amount = data.map((value)=>value.amount)
    const final = amount.reduce((acc, current)=>(acc +=current),0).toFixed(2)
    balance.innerHTML= `₹ ${final}`;
   
    //total income
    let revenue = data.map((value)=>value.amount).filter((val)=>val>0)
    let computedRevenue = revenue.reduce((acc, curr)=>(acc +=curr),0).toFixed(2)
    income.innerHTML= `₹ ${computedRevenue}`;
    
    //total expenses
    let exp = data.map((value)=>value.amount).filter((val)=>val<0)
    let computedExpense = exp.reduce((acc, curr)=>(acc +=curr),0).toFixed(2)
    expense.innerHTML= `₹ ${Math.abs(computedExpense)}`;

} 
 const addTransaction=(e)=>{
    e.preventDefault()
    if(description.value.trim()==""|| amount.value.trim()==""){
     alert("Oops you haven't entered Discription & Amount")
    }
    else{
        const newdata = {
            id : createId(),
            description : description.value,
            amount : +amount.value 
           }
            data.push(newdata);
            createTransactionDetails(newdata);
            console.log(newdata)

            description.value = ""
            amount.value = ""
            updateAmt()
            updateLocalStorage()
    }
  }
  const createId=()=>{
    Math.floor(Math.random())* 1000;// it gives 0 to 999 
  }
form.addEventListener("submit",addTransaction)

window.addEventListener("load", function (){
    update()
})
let update=()=>{
  items.innerhtml = "";
  data.forEach(createTransactionDetails)
  updateAmt()
}
function updateLocalStorage(){
    localStorage.setItem('trans',JSON.stringify(data))
}
