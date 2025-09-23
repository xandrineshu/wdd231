// 1st Example

const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");

openButton.addEventListener("click", () =>  {
    dialogBox.showModal();
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});


// 2nd Example

const openButton1 = document.querySelector("#openButton1");
const dialogBox1 = document.querySelector("#dialogBox1");
const closeButton1 = document.querySelector("#closeButton1");
const dialogBoxText = document.querySelector("#dialogBox1 div");

openButton1.addEventListener("click", () => {
    dialogBox1.showModal();
    dialogBoxText.innerHTML = 'Strawberry is the first fruit that ripens in the spring season.'
});

openButton2.addEventListener("click", () => {
    dialogBox1.showModal();
    dialogBoxText.innerHTML = 'Native Americans used blueberries for medicinal purposes.'
});

openButton3.addEventListener("click", () => {
    dialogBox1.showModal();
    dialogBoxText.innerHTML = 'Peaches are low in calories and high in fibre'
});

closeButton1.addEventListener("click", () => {
    dialogBox1.close();
});