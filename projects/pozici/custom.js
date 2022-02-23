$("#cat").hide(); 
$("#hide").hide();
$("#show").on("click",function(){
    $("#cat").show(); 
    $("#show").hide();
    $("#hide").show();
})
$("#hide").on("click",function(){
    $("#cat").hide(); 
    $("#show").show();
    $("#hide").hide();
})
//
window.onload = function() {
    var myImage = document.getElementById("cat");
    var w = myImage.width, h = myImage.height;
    var c = document.getElementById("canvas");
    c.width = w;
    c.height = h;
    var ctx = c.getContext("2d");
    
    ctx.drawImage(myImage, 0, 0);
    var data = ctx.getImageData(0, 0, w, h);
    // console.log(data)
  

  var invert = function() {
    ctx.drawImage(myImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 255 - data[i];     // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
};
var sepia = function() {
    ctx.drawImage(myImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        
        data[i]     = (data[i] * .393) + (data[i + 1] * .769) + (data[i + 2] * .189)     // red
        data[i + 1] = (data[i] * .349) + (data[i + 1] * .686) + (data[i + 2] * .168) // green
        data[i + 2] = (data[i] * .272) + (data[i + 1] * .534) + (data[i + 2] * .131) // blue

        if(data[i]>255)
        data[i] = 255;

        if(data[i+1]>255)
        data[i] = 255;

        if(data[i+2]>255)
        data[i] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
};

var blur = function() {
    ctx.drawImage(myImage, 0, 0);
    var threshold = document.getElementById("threshold").value
    console.log(threshold)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        
        data[i]     = 255 // red)
        data[i + 1] = 255 // green
        data[i + 2] = 255 // blue

        
    }
    ctx.putImageData(imageData, 0, 0);
};

var original = function() {
    ctx.drawImage(myImage, 0, 0);
};

var hoveredColor = document.getElementById('hovered-color');
function pick(event, destination) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
  
      const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
      destination.style.background = rgba;
      destination.textContent = rgba;
  
      return rgba;
  }
  canvas.addEventListener('mousemove', function(event) {
    pick(event, hoveredColor);
});


    var grayscale = function() {
    ctx.drawImage(myImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
};

$("#neg").on("click",function(){
    invert()
})
$("#grey").on("click",function(){
    grayscale()
})
$("#sepia").on("click",function(){
    sepia()
})
$("#original").on("click",function(){
    original()
})
$("#blur").on("click",function(){
    blur()
})
};