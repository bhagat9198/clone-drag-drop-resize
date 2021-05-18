let diffX = null;
let diffY = null;
const ALL_ELEMENTS = [];

const both_ends_HTML = document.querySelector("#both_ends");

function onDragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
  const draggableElement = document.getElementById(event.target.id);
  let rect = draggableElement.getBoundingClientRect();

  const cursorX = event.clientX;
  const cursorY = event.clientY;
  const elLeft = rect.x;
  const elTop = rect.y;
  // console.log(cursorX, cursorY);
  // console.log(elTop, draggableElement.offsetTop);
  // console.log(parseInt(elLeft), draggableElement.offsetLeft);

  diffX = cursorX - elLeft;
  diffY = cursorY - elTop;

  // event
  // .currentTarget
  // .style
  // .backgroundColor = 'yellow';
}

function onDragOver(event) {
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

  userPostionX = cursorX - diffX -12;
  userPostionY = cursorY -  diffY  - 15;
  diffX = null;
  diffY = null;

  const relativeX = userPostionX - mainX;
  const relativeY = userPostionY - mainY;

  draggableElement.style.left = relativeX + "px";
  draggableElement.style.top = relativeY + "px";

  event.target.appendChild(draggableElement);
  console.log(draggableElement.offsetHeight);
  event.dataTransfer.clearData();
  ALL_ELEMENTS.push({
    id: id,
    height: draggableElement.offsetHeight,
    width: draggableElement.offsetWidth,
    name: 'unnamed'
  })
}

document.getElementById("both_ends").style.resize = "both";

let COUNTER_EL = 0;

const prev_id_form_HTML = document.querySelector('#prev_id_form');
const id_form_HTML = document.querySelector('#id_form');
const name_form_HTML = document.querySelector('#name_form');
const height_form_HTML = document.querySelector('#height_form');
const width_form_HTML = document.querySelector('#width_form');

function properties(event) {
 let idSelected = event.target.id;
 if(!idSelected) {
   return alert('click within the element');
 }

 let filteredEl = ALL_ELEMENTS.filter(el => el.id === idSelected);
 if(filteredEl.length > 0) {
   filteredEl = filteredEl[0]
 } else {
  return alert('Error');
 }

 prev_id_form_HTML.value = filteredEl.id;
 id_form_HTML.value = filteredEl.id;
 name_form_HTML.value = filteredEl.name;
 height_form_HTML.value = filteredEl.height;
 width_form_HTML.value = filteredEl.width;

}

function duplicate(event) {
  let original = document.getElementById(event.target.id);
  // if(original.nodeName === "IMG" ) {
  //   console.log(true);
  //   original = original.parentElement;
  //   console.log(original);
  // }
  // console.log(original);
  const clone = original.cloneNode(true);
  let elId = `${event.target.id}_${COUNTER_EL}`;
  ++COUNTER_EL;
  clone.id = elId;
  clone.draggable = true;
  clone.setAttribute("ondragstart", "onDragStart(event)");
  clone.setAttribute("ondblclick", "properties(event)");
  clone.removeAttribute("onclick");
  original.parentNode.appendChild(clone);
  makeResizableDiv(`#${clone.id}`)
}

both_ends_HTML.addEventListener("click", duplicate);

const both_end_HTML = document.querySelector('#both_end');

both_end_HTML.addEventListener("click", duplicate);

const vertical_HTML = document.querySelector('#vertical');

vertical_HTML.addEventListener("click", duplicate);

const top_pm_img_HTML = document.querySelector('#top_pm_img');

top_pm_img_HTML.addEventListener('click', duplicate);


function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = element.querySelectorAll('.resize_box')
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
      if (currentResizer.classList.contains('right')) {
        element.style.width = e.pageX - element.getBoundingClientRect().left + 'px'
      } else if (currentResizer.classList.contains('left')) {
        element.style.width = element.getBoundingClientRect().right - e.pageX + 'px'
      } else if (currentResizer.classList.contains('top')) {
        element.style.height = (e.pageY) - element.getBoundingClientRect().top + 'px'
      } else if (currentResizer.classList.contains('bottom')) {
        // console.log(e.pageY);
        // console.log(element.getBoundingClientRect().bottom);
        element.style.height = e.pageY - element.getBoundingClientRect().bottom + 'px'
      } else {
        // nothing
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}


// ///////////////////////////

let get_result_HTML = document.querySelector('#get_result');
let display_result_HTML = document.querySelector('#display_result');
// let right_activity_container_HTML = document.querySelector('#right_activity_container');

const getResult = () => {
  let eachEl = '';
  ALL_ELEMENTS.map(el => {
    let eachInfo = '';
    let row = '';
    let id = el['id'];
    let htmlEl = right_activity_container_HTML.querySelector(`#${id}`);
    el.height = htmlEl.offsetHeight;
    el.width = htmlEl.offsetWidth;

    for(let info in el) {
      row = `<div class="label">${info}</div>
      <div class="info"><strong>${el[info]}</strong></div>`;
      eachInfo += ` <div class="eachInfo">${row}</div>`;
    }
    eachEl += `<div class="eachEl">${eachInfo}</div>`;
  })

  display_result_HTML.innerHTML = eachEl;
}

get_result_HTML.addEventListener('click', getResult);

// ////////////////////////////////////////////////////////////


const update_el_HTML = document.querySelector('#update_el');

const updateEl = e => {
  let pId = prev_id_form_HTML.value;
  let id = id_form_HTML.value;
  let name = name_form_HTML.value;
  let height = height_form_HTML.value;
  let width = width_form_HTML.value;

  let filteredEl = ALL_ELEMENTS.filter(el => el.id === pId);
  if(filteredEl.length > 0) {
    filteredEl = filteredEl[0]
  } else {
   return alert('Error');
  }

  filteredEl.id = id;
  filteredEl.name = name;
  filteredEl.height = height;
  filteredEl.width = width;

  let htmlEl = document.querySelector(`#${pId}`);
  htmlEl.id = id;
  htmlEl.style.height = `${parseInt(height)}px`;
  htmlEl.style.width = `${parseInt(width)}px`;
  
  prev_id_form_HTML.value = '';
  id_form_HTML.value = '';
  name_form_HTML.value = '';
  height_form_HTML.value = '';
  width_form_HTML.value = '';
}

update_el_HTML.addEventListener('click', updateEl);


// //////////////////////////////////////////////////////////////

const delete_el_HTML = document.querySelector('#delete_el');

const deleteElement = e => {
  let elId = prev_id_form_HTML.value;
  console.log(elId);
  document.querySelector(`#${elId}`).remove();
  prev_id_form_HTML.value = '';
  id_form_HTML.value = '';
  name_form_HTML.value = '';
  height_form_HTML.value = '';
  width_form_HTML.value = '';
;}

delete_el_HTML.addEventListener('click', deleteElement)