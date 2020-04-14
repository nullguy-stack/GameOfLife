var size = 10;
var alive = "rgb(255,255,255)";
var dead = "rgb(0,0,0)";
var cells = [];
var cellstemp = [];
var generation = 0;
var speed = 0;
var gen = document.getElementById("generation");
var spe = document.getElementById("speed");

class Cell{
    constructor(x,y,status){
        this.x = x;
        this.y = y;
        this.status = status;
    }

    getNeightbours(){
        /*
        (x-1,y-1)  (x,y-1)  (x+1, y-1)
        (x-1,y)     (x,y)   (x+1, y)
        (x-1,y+1)  (x,y+1)  (x+1,y+1)
        */
        var count = 0;
        let x = this.x, y = this.y;
        let temp;
            temp = getCell(x-1,y-1);
            if(temp != undefined)
                count += temp.status;
            temp = getCell(x-1,y);
            if(temp != undefined)
                count += temp.status;
            temp = getCell(x-1,y+1);
            if(temp != undefined)
                count += temp.status;
            temp = getCell(x,y-1);
            if(temp != undefined)
                count += temp.status;
            temp = getCell(x,y+1);
            if(temp != undefined)
                count += temp.status;
            temp = getCell(x+1,y-1);
            if(temp != undefined)
                count += temp.status;
            temp = getCell(x+1,y);
            if(temp != undefined)
                count += temp.status;
            temp = getCell(x+1,y+1);
            if(temp != undefined)
                count += temp.status;
        return count;
    }

    check(){
        let neightbours = this.getNeightbours();
        if(this.status == 1 && neightbours <= 1)
            return 0;
        else if(this.status == 1 & neightbours >= 4)
            return 0;
        else if(this.status == 0 & neightbours == 3)
            return 1;
        else
            return this.status;
    }


}

var cantX, cantY;
var playing = true;
var slide;

function setup(){
    slide = createSlider(0,60,1,1);
    slide.style('display','block');
    var canvas = createCanvas(480,400);
    canvas.style('display','block');
    cantX = width / size;
    cantY = height / size;
    init(cantX,cantY);
    background(0);
}

function draw(){
    frameRate(slide.value());
    if(playing){
        update();
        paint();
        gen.innerHTML = "Generation: "+generation++;
    }
    spe.innerHTML = "Speed: " + slide.value();
    if(!playing){
        textSize(48);
        fill(255,0,0);
        text("Paused",width/3,height/2)
    }
}

function update(){
    cellstemp = [];
    cells.forEach(cell =>{
        cellstemp.push(new Cell(cell.x,cell.y,cell.check()));
    });
    cells = cellstemp;
}

function paint(){
    cells.forEach(cell => {
        fill(((cell.status == 1)? alive: dead));
        rect(cell.x*size,cell.y*size,size,size);
    })
}

function mousePressed(){
    let x = Math.floor(mouseX / size);
    let y = Math.floor(mouseY / size);
    let n = getCell(x,y);
    if(n.status == 0)
        n.status = 1;
    else
        n.status = 0
    paint();
    console.log(n.getNeightbours());
}

function getCell(x,y){
    return cells.find(cell => (cell.x == x && cell.y == y));
}

function initrandom(){
    cells = [];
    for(let i=0; i<cantX; i++)
        for(let j=0; j<cantY; j++)
            cells.push(new Cell(i,j,Math.floor(Math.random() * 2)));
}

function init(x,y){
    cells = [];
    for(let i=0; i < x; i++)
        for(let j=0; j< y; j++){
            cells.push(new Cell(i,j,0));
        }
}

document.getElementById("play").addEventListener("click", () =>{
    playing = true;
});

document.getElementById("pause").addEventListener("click", () =>{
    playing = false;
});

document.getElementById("clear").addEventListener("click", () =>{
    cells.forEach(cell =>{
        cell.status = 0;
    });
    paint();
    generation = 0;
});

document.getElementById("random").addEventListener("click", () =>{
    playing = false;
    generation = 0;
    initrandom();
    paint();
});

document.getElementById("step").addEventListener("click", () => {
    playing = false;
    update();
    generation++;
    paint();
});
