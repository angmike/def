var body = document.querySelector('tbody');
var button = document.getElementById('button');
var but = document.getElementById('but');
var fill = document.getElementById('fill');
var org = document.getElementById('arr');
var r = document.getElementById('rows');
var c = document.getElementById('cols');
var inputs = document.getElementsByClassName('size');
var custom = document.getElementById('custom');
var options = document.getElementById('options');

//toggle display of input field for row/column numbers and the button for effecting this
function setSize(){
    for(var i of inputs){
        if(i.style.display == 'inline-block'){
            i.style.display = 'none';
        } else {
            i.style.display = 'inline-block';
        }
    }
    if(custom.style.display == 'none'){
        custom.style.display = 'inline-block';
    } else {
        custom.style.display = 'none';
    }
}

custom.onclick = setSize;

/*setout the seats; default to 36 if numbers not provided
alternatively set default numbers as input fieldvalues*/
button.onclick = function(){
    var rows = r.value || 6;
    var cols = c.value || 6;
    for(var j=0; j<rows; j++){
        var row=document.createElement('tr');
        for(var i=0; i<cols; i++){
            var cell = document.createElement('td');
            //create passage isle(s)
            var data = document.createElement('input');
            // group items of each column in a corresponding class for later optional sorting
            data.setAttribute('class', i);
            cell.appendChild(data);
            row.appendChild(cell);
            body.appendChild(row);
        }
    }
    // toggle display of optional theater capacity selection fields and button
    if(custom.style.display == 'none'){
        setSize();
    }
};

var rows = body.children;

// function createIsle(){
//     for(var i=0; i<rows.length; i++){
//         var cells = rows[i].children;
//         for(var j=0; j<cells.length; j++){
//             var mid = Math.floor((cells.length-1)/2);
//             var isle = document.createElement('td');
//             cells.insertBefore(isle, cells[mid]);
//             // if(j==Math.floor((cells.length-1)/2)){
//             //     cells[j].style.background = 'red';
//             //     cells[j].style.width = '28%';
//             //     cells[j].firstElementChild.style.width = '32%';
//             //     console.log(cells[j+1].style.width);

//         }
//     }
// }

// optional function to randomly generate seat heights
function fillSeats(){
    for(var i=0; i<rows.length; i++){
        var cells = rows[i].children;
        for(var j=0; j<cells.length; j++){
            cells[j].firstElementChild.value = Math.floor(Math.random()*100).toString().padStart(2, '0');
        }
    }
}

//read array from table
function getN(){
    var n = [];
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].children;
        var rowArray = [];
        for (var j = 0; j < cells.length; j++) {
            rowArray.push(cells[j].children[0].value);
        }
        n.push(rowArray);
    }
    return n;
    }

//check sitting arrangement
function check(n){
    var l1 = n.length-1;
    var flag = true;
    var l2 = function(){
        var len=false;
        for(i of n){
            len = i.length;
        }
        return len;
    };
    for(var j=0; j<l2(); j++){
        for(var i=0; i<l1; i++){
            var current = n[i][j];
            var next = n[i+1][j];
            if(current>=next){
                rows[i+1].children[j].children[0].style.background = 'red';
                rows[i+1].children[j].children[0].style.boxShadow = '3px 1px 5px 3px inset, -15px -3px 8px 2px black inset';
                flag = false;
            } else {
                rows[i+1].children[j].children[0].style.background = 'green';
                rows[i+1].children[j].children[0].style.boxShadow = '3px 1px 5px 3px inset, -15px -3px 8px 2px darkgreen inset';
            }
        }
    }
    return flag;
}

//optional function to re-arrange seats to correct
function arrange(){
    var l;
    for(var i=0; i<rows.length; i++){
            var cells = rows[i].children;
            l = cells.length;
            }
    var cols = [];
    for(var c=0; c<l; c++){
        cols.push(document.getElementsByClassName(c));
    }
    for(var k=0; k<cols.length; k++){
        var col = cols[k];
        var sorted = [];
        for(var j=0; j<col.length; j++){
            sorted.push(col[j].value);
            }
        sorted.sort(function(a, b){return a - b});
        col = [].slice.call(col);
        col.forEach(function(v,u){
            v.value = sorted[u];
        });
        console.log(col);
        }
    }

function showOptions(){
    var extras = document.getElementsByClassName('option');
    for(var i of extras){
        if(i.style.display == 'initial'){
            i.style.display = 'none';
            options.style.borderTop = 'solid 10px darkgreen';
            options.style.borderBottom = 'none';
        } else {
            i.style.display = 'initial';
            options.style.borderBottom = 'solid 10px darkgreen';
            options.style.borderTop = 'none';
        }
    }
}

options.onclick = showOptions;

fill.onclick = fillSeats;
but.onclick=function(){check(getN());};
org.onclick = arrange;
