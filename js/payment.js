//Javascript files divided into two sections: A and B. 


// SECTION - A: Script to Display input details on Card

const card = document.querySelector(".card");
const nameField = document.querySelector("#username");
const nameDisplay = document.querySelector("#card-holder-name");
const cvvField = document.querySelector("#cvv");
const cvvDisplay = document.querySelector("#cvv-display");
const expiresField = document.querySelector("#expiry");
const expiresDisplay = document.querySelector("#expires-display");
const cardNumField = document.querySelector("#cardnumber");
const cardNumDisplay = document.querySelector(".card-num");
const visaLogos = document.querySelectorAll('.visa-logo');
const mastercardLogos = document.querySelectorAll('.master-card-logo');
const rupayLogos = document.querySelectorAll('.rupay-logo');
let isCardBack = false;

//Check whether card is flipped or not
function cardFlipBack() {
  card.classList.add("flip");
  isCardBack = true;
}
function cardFlipFront() {
  if (isCardBack) {
    card.classList.remove("flip");
  }
}

//Display fields on the card
function displayOnCard() {
  nameDisplay.innerText = nameField.value;
  if (nameField.value.length == 0) {
    nameDisplay.innerText = "________________";
  }
  cvvDisplay.innerText = cvvField.value;
  if (cvvField.value.length == 0) {
    cvvDisplay.innerText = "____";
  }
  expiresDisplay.innerText = expiresField.value;
  if (expiresField.value.length == 0) {
    expiresDisplay.innerText = "__ / __";
  }
}


// Display Card Num with space after four letters
function displayCardNum() {
  
  if(cardNumField.value.length == 0){
    cardNumDisplay.innerText = " ____ \u00a0 \u00a0____ \u00a0 \u00a0____  \u00a0\u00a0 ____";
  }else if(cardNumField.value.length == 4){
    cardNumDisplay.innerText = cardNumField.value[0] + cardNumField.value[1] + cardNumField.value[2] + cardNumField.value[3] + "\u00a0 \u00a0";
  }else if(cardNumField.value.length == 8){
    cardNumDisplay.innerText += cardNumField.value[4] + cardNumField.value[5] + cardNumField.value[6] + cardNumField.value[7] + "\u00a0 \u00a0";
  }else if(cardNumField.value.length == 12){
    cardNumDisplay.innerText += cardNumField.value[8] + cardNumField.value[9] + cardNumField.value[10] + cardNumField.value[11] + "\u00a0 \u00a0";
  }else if(cardNumField.value.length == 16){
    cardNumDisplay.innerText += cardNumField.value[12] + cardNumField.value[13] + cardNumField.value[14] + cardNumField.value[15];
  }
  
  // Auto Company detect using inital input(s) of Card Num 
  if(cardNumField.value[0]==4){
    visaLogos.forEach(visaLogo =>{
      visaLogo.style.display = "block";
      })
      rupayLogos.forEach(rupayLogo =>{
        rupayLogo.style.display = "none";
      })
      mastercardLogos.forEach(mastercardLogo =>{
        mastercardLogo.style.display = "none";
      })
    }else if(cardNumField.value[0]==5 && (cardNumField.value[1]==1 || cardNumField.value[1]==5)){
      visaLogos.forEach(visaLogo =>{
        visaLogo.style.display = "none";
      })
      rupayLogos.forEach(rupayLogo =>{
        rupayLogo.style.display = "none";
      })
      mastercardLogos.forEach(mastercardLogo =>{
        mastercardLogo.style.display = "block";
      })
    }else if(cardNumField.value[0]==6 && (cardNumField.value[1]==0 || cardNumField.value[1]==5)){
      visaLogos.forEach(visaLogo =>{
        visaLogo.style.display = "none";
      })
      rupayLogos.forEach(rupayLogo =>{
        rupayLogo.style.display = "block";
      })
      mastercardLogos.forEach(mastercardLogo =>{
        mastercardLogo.style.display = "none";
      })
    }else{
      visaLogos.forEach(visaLogo =>{
        visaLogo.style.display = "none";
      })
      rupayLogos.forEach(rupayLogo =>{
        rupayLogo.style.display = "none";
      })
      mastercardLogos.forEach(mastercardLogo =>{
        mastercardLogo.style.display = "none";
      })
    }
  }
  
  // SECTION - B: To authenticate and process payment using user input card details.

const submitBtn = document.querySelector('.payment-btn');
const paymentForm = document.querySelector('form');
const successBox = document.querySelector('.success-container');
const confettiContainer = document.querySelector('.confetti-wrapper');
const okayBtn = document.querySelector('.okay-btn');

// To setup post-success confetti animation
const animItem = bodymovin.loadAnimation({
    wrapper: confettiContainer,
    animType: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://assets8.lottiefiles.com/packages/lf20_rovf9gzu.json'
})

// Javascript Promise to authenticate/process payment or throw error acc. to user input
function processPayment(){
  return new Promise((resolve, reject) =>{
    // Client side authentication of card details.
      if(cardNumField.value.length != 16){
          reject('CARD NUMBER')
      }else if(expiresField.value.length != 5){
          reject('CARD EXPIRY DATE')
      }else if(cvvField.value.length != 3){
          reject('CVV NUMBER')
      }else if(nameField.value.length == 0){
          reject('CARD HOLDER NAME')
      }else{
        // Actual payment process will take place here
        // Prefrebly another JS promise to show payment success or throw error
        //if payment successful then the below resolve is passed.
          resolve()
      }
  })
}


// On click of 'Pay Now' option, code runs from here
submitBtn.addEventListener('click', ()=>{
  // Dialog box to showcase payment processing
  successBox.innerHTML = 
  `<h1> Processing Payment...</h1> 
  <img class="loaderGIF" src="images/loaderResized.gif" alt=""/>
  <h4 style="text-align: center;">Do not refresh or close this tab. 
  <br>It may take a few seconds to process your payment. <br>Keep Patience!</h4>`
  successBox.style.backgroundColor = "rgb(250,252,249)";
  successBox.style.transform = "scale(1)";

  //Set Timeout function to signify time taken in processing payment while communicating with card company database. 
  setTimeout(()=>{
      processPayment().then(()=>{
        // Success Event Dialog Box
          successBox.innerHTML = 
          `<h1 class="successMessage"> Payment Successful! </h1>
           <h4 style="text-align: center;">You can now close this window and continue browsing.</h4>  
           <button class="okay-btn"> Okay! </button>`
          setTimeout(()=>{
            animItem.goToAndPlay(0, true);
        }, 300)
      }).catch((err) =>{
        //Error Event Dialog Box
          successBox.innerHTML = 
          `<h1 class="errMessage"> Payment Unsuccessful! </h1>
           <h4 style="text-align: center;">Whoops! 
           <br> It seems you have entered incorrect ${err}.</h4>  
           <button class="okay-btn">Retry</button>`
      })
  }, 4500)
})
// Exit button
okayBtn.addEventListener('click', ()=>{
  successBox.style.transform = "scale(0)";
  setTimeout(()=>{
      location.reload()
  }, 500)
})




// successBox.style.transform = "scale(1)";
//     setTimeout(()=>{
//         animItem.goToAndPlay(0, true);
//     }, 300)

  