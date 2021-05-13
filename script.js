let diffX = null;
let diffY = null;

const both_ends_HTML = document.querySelector("#both_ends");

function onDragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
  const draggableElement = document.getElementById(event.target.id);
  let rect = draggableElement.getBoundingClientRect();

  const cursorX = event.clientX;
  const cursorY = event.clientY;
  const elLeft = rect.x;
  const elTop = rect.y;
  console.log(cursorX, cursorY);
  console.log(elTop, draggableElement.offsetTop);
  console.log(parseInt(elLeft), draggableElement.offsetLeft);

  diffX = cursorX - elLeft - 10;
  diffY = cursorY - elTop - 10;

  // event
  // .currentTarget
  // .style
  // .backgroundColor = 'yellow';
}

function onDragOver(event) {
  console.log("onDragOver");
  event.preventDefault();
}

const right_activity_container_HTML = document.querySelector(
  "#right_activity_container"
);

const mainX = right_activity_container_HTML.offsetLeft;
const mainY = right_activity_container_HTML.offsetTop;

function onDrop(event) {
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  draggableElement.style.position = "absolute";
  const cursorX = event.clientX;
  const cursorY = event.clientY;

  let userPostionX, userPostionY;

  userPostionX = cursorX - diffX;
  userPostionY = cursorY - diffY;
  diffX = null;
  diffY = null;

  const relativeX = userPostionX - mainX;
  const relativeY = userPostionY - mainY;

  draggableElement.style.left = relativeX + "px";
  draggableElement.style.top = relativeY + "px";

  event.target.appendChild(draggableElement);

  event.dataTransfer.clearData();
}

document.getElementById("both_ends").style.resize = "both";

let COUNTER_EL = 0;

function properties(event) {
  console.log("sbidfg");
}

function duplicate(event) {
  const original = document.getElementById(event.target.id);
  const clone = original.cloneNode(true);
  clone.id = `${event.target.id}_${++COUNTER_EL}`;
  clone.draggable = true;
  clone.setAttribute("ondragstart", "onDragStart(event)");
  clone.setAttribute("ondblclick", "properties(event)");
  clone.removeAttribute("onclick");
  original.parentNode.appendChild(clone);
}
both_ends_HTML.addEventListener("click", duplicate);

