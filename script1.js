const headerCellsContainer = document.querySelector(".header");
let verticalcells = 26,
  horizentalcells = 50;
const snoContainer = document.getElementById("sno-container");
const activecell = document.getElementById("Active_cell");
let activecellid = null;
let takeInput=document.getElementById("textbox");

const state = {}; 
// headcell

for (let row = 1; row <= verticalcells; row++) {
  const headcell = document.createElement("div");
  headcell.innerText = String.fromCharCode(64 + row);
  headcell.className = "header-cells";
  //    headerCellsContainer.appendChild(headcell);
  // console.log(headerCellsContainer);
  headerCellsContainer.appendChild(headcell);
}
// // snocells
for (let col = 0; col < horizentalcells; col++) {
  let sonocells = document.createElement("div");
  sonocells.className = "side-cells";
  sonocells.innerText = col;
  snoContainer.appendChild(sonocells);
}
const body = document.getElementById("body");
// // innercells
for (let col = 0; col < verticalcells; col++) {
  const rowElement = document.createElement("div");
  rowElement.className = "row";
  for (let rows = 0; rows < horizentalcells; rows++) {
    const Cell = document.createElement("div");
    Cell.className = "body-cells";
    Cell.id = `${String.fromCharCode(65 + col)}${rows}`;
    Cell.contentEditable = true;
    rowElement.appendChild(Cell);
    Cell.addEventListener("focus", onFocusCell);
    Cell.addEventListener("keyup",takeInputValue)

  }

  body.appendChild(rowElement);
}
// object that store default stylesvalues
const defaultStyles = {
  fontFamily: "Arial",
  fontSize: 16,
  isBold: false,
  isItaclic: false,
  isUnderline: false,
  text_align: left,
  color: "#000000",
  background_color: "#ffffff",
};
// onfocuscell
function onFocusCell(e) {
  takeInput.value=e.target.innerText;
  if (activecellid === e.target.id) return;
  activecellid = e.target.id;
  activecell.innerText = activecellid;
  if (state[activecellid]) {
    resetstylesform(state[activecellid]);
  } else {
    resetstylesform(defaultStyles);
  }
}


//  cell fontStyle and aligment
const cellFontStyleForm = document.getElementById("options");
cellFontStyleForm.addEventListener("change", onChangeCellStyleData);
function onChangeCellStyleData(event) {
  const options = {
    fontFamily: cellFontStyleForm["font_family"].value,
    fontSize: cellFontStyleForm["font_size"].value,
    isBold: cellFontStyleForm["isBold"].checked,
    isItaclic: cellFontStyleForm["isItalic"].checked,

    isUnderline: cellFontStyleForm["isUnderline"].checked,
    text_align: cellFontStyleForm.text_align.value,
    color: cellFontStyleForm["color"].value,
    background_color: cellFontStyleForm["background"].value,
  };
  applyCellStyle(options);
  //  console.log(cellFontStyleForm)
}
function applyCellStyle(styles) {
  if (!activecellid) {
    cellFontStyleForm.reset();
    alert("please select a cell");
    return;
  }
  const currenctcell = document.getElementById(activecellid);
  currenctcell.style.color = styles.color;
  currenctcell.style.backgroundColor = styles.background_color;
  currenctcell.style.fontFamily = styles.fontFamily;
  currenctcell.style.fontSize = styles.fontSize + "px";
  currenctcell.style.textAlign = styles.text_align;
  // console.log(styles.text_align);
  currenctcell.style.textDecoration = styles.isUnderline ? "underline" : "none";
  currenctcell.style.fontStyle = styles.isItaclic ? "italic" : "normal";
  currenctcell.style.fontWeight = styles.isBold ? "bold" : "normal";
  state[activecellid] = { ...styles, text: currenctcell.innerText 
  };

}
//  default values for styles
function resetstylesform(stylesvalue) {
  cellFontStyleForm.font_size.value = stylesvalue.fontSize;
  cellFontStyleForm.font_family.value = stylesvalue.fontFamily;
  cellFontStyleForm.isBold.checked = stylesvalue.isBold;
  cellFontStyleForm.isUnderline.checked = stylesvalue.isUnderline;
  cellFontStyleForm.isItalic.checked = stylesvalue.isItaclic;
  cellFontStyleForm.color.value = stylesvalue.color;
  cellFontStyleForm.background.value = stylesvalue.background_color;
  cellFontStyleForm.text_align.value = stylesvalue.text_align;}
//input text from fn
takeInput.addEventListener("input",activecelladdtext);
function takeInputValue(e){
  takeInput.value=e.target.innerText;
}
function activecelladdtext(){
  if(activecellid){
document.getElementById(activecellid).innerText=takeInput.value;
  }
  
}