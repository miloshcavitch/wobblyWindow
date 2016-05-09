var SmoothPath = function(context){
this.context = context;
this.positions = [];
this.isClosed = true;
this.strokeStyle = 'black';
this.fillStyle = 'yellow';
this.addPoint = function(point){
this.positions.push(point);
}

this.updateHandles = function(){
for (var i = 0; i < this.positions.length; i++){
  var firstPoint, secondPoint;
  if (this.positions[i - 1] === undefined){
    if (this.isClosed === true){
      firstPoint = this.positions[this.positions.length-1];
    } else {
      firstPoint = this.positions[i];
    }
  } else {
    firstPoint = this.positions[i-1];
  }
///////////////////////////////////////////
  if (this.positions[i+1] === undefined){
    if (this.isClosed === true){
      secondPoint = this.positions[0];
    } else {
      secondPoint = this.positions[i];
    }
  } else {
    secondPoint = this.positions[i+1];
  }

  this.positions[i].handleLength = Math.hypot(Math.abs(firstPoint.x - secondPoint.x), Math.abs(firstPoint.y - secondPoint.y))/3;

  var rise = firstPoint.y - secondPoint.y;
  var run = secondPoint.x - firstPoint.x;
  var angle = Math.atan(rise/run);
  this.positions[i].hAngle = angle;
  this.positions[i].handleIn.x = this.positions[i].x + ((Math.sin(angle - Math.PI/2) * this.positions[i].handleLength/2));
  this.positions[i].handleIn.y = this.positions[i].y + (Math.cos(angle - Math.PI/2) * this.positions[i].handleLength/2);
  this.positions[i].handleOut.x = this.positions[i].x - (Math.sin(angle - Math.PI/2) * this.positions[i].handleLength/2);
  this.positions[i].handleOut.y = this.positions[i].y - (Math.cos(angle - Math.PI/2) * this.positions[i].handleLength/2);
  if (secondPoint.x - this.positions[i].x <= 0 || i === 11){
    var tempPoint = this.positions[i].handleIn;
    this.positions[i].handleIn = this.positions[i].handleOut;
    this.positions[i].handleOut = tempPoint;
  }
  //console.log("index" + i + ', handleIn: x: ' + this.positions[i].handleIn.x + ", y: " + this.positions[i].handleIn.y);
  //console.log("index" + i + ', handleOut: x: ' + this.positions[i].handleOut.x + ", y: " + this.positions[i].handleOut.y);
  }
}

this.debugDraw = function(){
for (var i = 0; i < this.positions.length; i++){
  ctx.beginPath();
  ctx.arc(this.positions[i].handleIn.x,this.positions[i].handleIn.y, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(this.positions[i].handleOut.x,this.positions[i].handleOut.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(this.positions[i].handleIn.x,this.positions[i].handleIn.y);
  ctx.lineTo(this.positions[i].handleOut.x,this.positions[i].handleOut.y);
  ctx.stroke();
  ctx.closePath();
}
}
this.draw = function(){
ctx.beginPath();
ctx.moveTo(this.positions[0].x, this.positions[0].y);
for (var i = 0; i < this.positions.length-1; i++){
  ctx.bezierCurveTo(this.positions[i].handleOut.x,this.positions[i].handleOut.y,  this.positions[i+1].handleIn.x,this.positions[i+1].handleIn.y,  this.positions[i+1].x,this.positions[i+1].y);
}
ctx.fill();
ctx.closePath();
}
}


var SmoothPoint = function(x, y){
this.x = x;
this.y = y;
this.handleLength = 100;
this.hAngle = undefined;
this.handleIn = {x: undefined, y: undefined};
this.handleOut = {x: undefined, y: undefined};
}
