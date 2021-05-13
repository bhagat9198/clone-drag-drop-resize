function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  let setData =  ev.dataTransfer.setData("text", ev.target.id);
  console.log('-----------drag-------------------');
  // console.log('ev.dataTransfer', ev.dataTransfer);
  console.log('setData', setData);
}

function drop(ev) {
  // ev.preventDefault();
  console.log('-----------drappppp-------------------');
  var data = ev.dataTransfer.getData("text");
  console.log('data', data);
  console.log('ev.target', ev.target);
  ev.target.appendChild(document.getElementById(data));
}

// function allowDrop(ev) {
//   ev.preventDefault();
// }

// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }