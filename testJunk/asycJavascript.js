const cardLength = 15;
const cvvLength = 3;
const expiresLength = 5;



function processPayment(){
    return new Promise((resolve, reject) =>{
        if(cardLength != 16){
            reject('card number')
        }else if(expiresLength != 5){
            reject('card expiry')
        }else if(cvvLength != 3){
            reject('CVV number')
        }else{
            resolve()
        }
    })
}

console.log("Processing Payment......");
setTimeout(()=>{
    processPayment().then(()=>{
        console.log("Payment Successful!")
    }).catch((err) =>{
        console.log("Payment Unsuccessful");
        console.log(`Incorrect ${err}`)
    })
    
}, 3000)
