const express = require('express');
const multer = require('multer');
const { createCanvas, loadImage, Image } = require('canvas');
const FileReader = require('filereader');
const fs = require('fs');

const size_mult = 1;
var storagemanager = multer.diskStorage
({
  destination: function (req, file, cb)
  {
    cb(null,  __dirname + '/uploads/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
})



function canvas1(texture, numcanvas)
{
  return new Promise((resolve2, reject2) =>
  {
    var canvas = createCanvas(350, 350);
    var ctx = canvas.getContext("2d");
    ctx.patternQuality = 'best';
    ctx.antialias = 'default';
    ctx.filter = 'default';
    ctx.imageSmoothingEnabled = false;
    var productImg = new Image();

    function addImageProcess(img, src)
    {
      return new Promise((resolve, reject) =>
      {
        img.onload = () => resolve(img.height);
        img.onerror = reject;
        img.src = src;
      });
    }

    let imgUrl = "canvas"+numcanvas+".jpg";
    addImageProcess(productImg, imgUrl).then((h) =>
    {
      var iw = productImg.width;
      var ih = productImg.height;

      canvas.width = iw;
      canvas.height = ih;

      ctx.drawImage(productImg, 0, 0, productImg.width, productImg.height, 0, 0, iw, ih);
      
        ////////////////////////

      var new_img = new Image();

      addImageProcess(productImg, imgUrl).then((h) =>
      {
        ctx.patternQuality = 'best';
        ctx.antialias = 'default';
        ctx.filter = 'default';
        ctx.imageSmoothingEnabled = false;
        var iw = new_img.width;
        var ih = new_img.height;

        if(numcanvas==1)
        {
          var xOffset = 102; //left padding
          var yOffset = 110; //top padding

          //alert(ih)
          var a = 75.0; //image width
          var b = 10; //round ness

          var scaleFactor = iw / (4 * a);

          // draw vertical slices
          for (var X = 0; X < iw; X += 1) {

            var y = b / a * Math.sqrt(a * a - (X - a) * (X - a)); // ellipsis equation
            ctx.drawImage(new_img, X * scaleFactor, 0, iw / 9, ih, X + xOffset, y + yOffset, 1, 174);
          }
        }
        else if(numcanvas==2)
        {
          var xOffset = 101; //left padding
          var yOffset = 110; //top padding

          var a = 75.0; //image width
          var b = 10; //round ness

          var scaleFactor = iw / (4 * a);

          // draw vertical slices
          for (var X = 0; X < iw; X += 1) {
            var y = b / a * Math.sqrt(a * a - (X - a) * (X - a)); // ellipsis equation
            ctx.drawImage(new_img, X * scaleFactor, 0, iw / 3, ih, X + xOffset, y + yOffset, 1, 174);

          }
        }
        else if(numcanvas==3)
        {
          var xOffset = 102; //left padding
          var yOffset = 110; //top padding

          var a = 75.0; //image width
          var b = 10; //round ness

          var scaleFactor = iw / (3 * a);

          // draw vertical slices
          for (var X = 0; X < iw; X += 1) {
            var y = b / a * Math.sqrt(a * a - (X - a) * (X - a)); // ellipsis equation
            ctx.drawImage(new_img, X * scaleFactor, 0, iw / 1.5, ih, X + xOffset, y + yOffset, 1, 174);
          }
        }
        var strcanv = canvas.toDataURL();
        resolve2(strcanv);
      });
      new_img.src = texture;

        //////////////////////// 
      
    });
  });

};





const upload = multer({ storage: storagemanager })
//const upload = multer({dest: __dirname + '/uploads/images'});

var port = 80;
var app = express();
var server = app.listen(port);

app.use(express.static(__dirname + '/public'));
//app.use(express.static('public'));

app.get('/', function(req, res)
{
  console.log('Usuario acessou home');
  res.send("home");
});

app.get('/teste', function(req, res)
{
  var html = "<pre>";
  html += req.toString();
  html += "</pre>";
  console.log('Usuario testou');
  console.log(req.query);
  if(req.query.test==null) console.log("null");
  res.send(html);
});

app.get('/chat', function(req, res)
{
  const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
  });

readline.question(req.query.msg, (name) => {
  //console.log(`Hi ${name}!`);
  readline.close();
  res.send(name);
  });

});

app.get('/canvas', function(req, res)
{
  const { createCanvas, loadImage } = require('canvas')
  const canvas = createCanvas(200, 200)
  const ctx = canvas.getContext('2d')
 
// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText(req.query.frase, 50, 100)
 
// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()
 
// Draw cat with lime helmet
loadImage(req.query.img).then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70)
 
  res.send('<img src="' + canvas.toDataURL() + '" />')
})
});



app.post('/caneca', upload.single('img'), (req, res, next) => {

  


    if(req.file)
    {
      var file_dir = "uploads/images/"+req.file.filename;
      
      const canvas = createCanvas(755.905511811, 377.952755906);
      const ctx = canvas.getContext('2d');
 
      // Write "Awesome!"
      //ctx.font = '30px Impact'
      //ctx.rotate(0.1)
      //ctx.fillText(req.query.frase, 50, 100)
 
      // Draw line under text
      //var text = ctx.measureText('Awesome!')
      //ctx.strokeStyle = 'rgba(0,0,0,0.5)'
      //ctx.beginPath()
      //ctx.lineTo(50, 102)
      //ctx.lineTo(50 + text.width, 102)
      //ctx.stroke()
 
      // Draw cat with lime helmet
    //reader.readAsDataURL(file_dir); 

    loadImage(file_dir).then((image) => {
      ctx.patternQuality = 'best';
      ctx.antialias = 'default';
      ctx.filter = 'default';
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image,0,0, 755.905511811, 377.952755906);

      var file_dir2 = canvas.toDataURL();
      //var file_dir2 = file_dir;
      //var file_dir2 = ctx.getImageData(0, 0, 755.905511811, 377.952755906);

        var return_html = '<html><head><link rel="stylesheet" href="css/style.css" /></head><body>';
  return_html += "<form action='/caneca' enctype='multipart/form-data' method='post'>";
  return_html += "<input type='file' name='img' accept='image/*''><input type='submit'>Enviar</input>";
  return_html += "</form><hr>";
  return_html += "</body>";
  
        return_html += '<div id="capture">';
        return_html += '<img src="' + file_dir2 + '" style="margin: auto; display: block;" /><br>';

        loadImage(file_dir2).then((image) => {
        
        canvas1(file_dir2, 1).then((url_link)=>
        {
          return_html += '<img src="' + url_link + '" />';
          canvas1(file_dir2, 2).then((url_link)=>
          {
            return_html += '<img src="' + url_link + '" />';
            canvas1(file_dir2, 3).then((url_link)=>
            {
              return_html += '<img src="' + url_link + '" />';
              return_html += '</div></body></html>';
              res.set('Content-Type', 'text/html');
              res.send(return_html);
            });
          });
        });
      })


     
      //res.send(return_html);
    })

      






      //var reponse = "<img src='/uploads/images/"+req.file.filename+"'>";
      //res.set('Content-Type', 'image/png');
      //res.set('Content-Type', 'text/html');
      //res.send(reponse);
    }
    else throw 'error';
});

app.get('/caneca', function(req, res)
{
  var response = "<html><head></head><body>";
  var image_url = req.query.img;
  response += "<form action='/caneca' enctype='multipart/form-data' method='post'>";
  response += "<input type='file' name='img' accept='image/*''><input type='submit'>Enviar</input>";
  response += "</form>";
  if(image_url!=null)
  {
  }
  response += "</body></html>";
  res.set('Content-Type', 'text/html');
  res.send(response);
  //console.log(req);

  /*
  const { createCanvas, loadImage } = require('canvas')
  const canvas = createCanvas(200, 200)
  const ctx = canvas.getContext('2d')
 
// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText(req.query.frase, 50, 100)
 
// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()
 
// Draw cat with lime helmet
loadImage(req.query.img).then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70)
 
  res.send('<img src="' + canvas.toDataURL() + '" />')
})
*/
});


/*
app.get('*', function(req, res)
{
  console.log('Usuario acessou pagina invalida');
  res.send("404");
});
*/
console.log("Servidor ligado na porta "+port);