// キャンバスのサイズを定義
const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 700;

let d=10;
let s=80;
let s2=0;
let s3=0;
let s4=0;
let s5=0;
let sc=0;
let offsetX;
let offsetY;
let offsetX2;
let offsetY2;
let newX1;
let newY1;
let newX2;
let newY2;
let newX3;
let newY3;
let x1,y1;
let x2,y2;
let x3,y3;
let x4,y4;
let yp3;
let yp4;
let yp5;
let resultX;
let resultX2;
let resultX3;
let resultX4;
let yp8;
let length2;
let length4;
let length5;
let length6;
let count=0;
let mx;
let my;
let mx2;
let my2;

function setup() {
    // 1. キャンバスを作成
    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // 2. 作成したキャンバスを右側のカラムの要素にアタッチする
    canvas.parent('canvas-container'); 
}

function draw() {
    background(220); // 毎フレーム背景を塗りつぶす（残像を消すため）

    let sD = document.getElementById('d');
    let dValue = parseFloat(sD.value);
    document.getElementById('display_d').innerText = dValue + " mm";

    // --- HTMLのスライダーから値を取得 ---
    // id="s" のスライダー要素を取得
    let sliderS = document.getElementById('s');
    // スライダーの現在の値（文字列）を数値に変換
    let sValue = parseFloat(sliderS.value);

    // --- 数値表示の更新 ---
    // id="display_s" のスパンに現在の値を表示
    document.getElementById('display_s').innerText = sValue + " mm";

    let sliderS2 = document.getElementById('s2');
    let s2Value = parseFloat(sliderS2.value);
    document.getElementById('display_s2').innerText = s2Value + " mm";

    let sliderS3 = document.getElementById('s3');
    let s3Value = parseFloat(sliderS3.value);
    document.getElementById('display_s3').innerText = s3Value + " mm";

    let sliderS5 = document.getElementById('s5');
    let s5Value = parseFloat(sliderS5.value);
    document.getElementById('display_s5').innerText = s5Value + " mm";

    let sliderSC = document.getElementById('sc');
    let scValue = parseFloat(sliderSC.value);
    document.getElementById('display_sc').innerText = scValue + " 倍";

    let sliderYP5 = document.getElementById('yp5');
    let yp5Value = parseFloat(sliderYP5.value);
    document.getElementById('display_yp5').innerText = yp5Value + " mm";

    d=dValue;
    s=sValue;
    s2=s2Value;
    s3=s3Value;
    s5=s5Value;
    sc=scValue;
    yp5=yp5Value;

    // --- 描画に反映 ---
    fill(255); // 白色
    noStroke();
    ue(250,100);
    mae(800,100);
    ushiro(780,300);
    ashi(300,50);
    // スライダーの値(sValue)を円の直径として使用
    // マウス位置を中心に描画
    //ellipse(width / 2, height / 2, sValue, sValue); 
    /*ellipse(20, 20, s2Value, s2Value); 
    ellipse(40, 40, s3Value, s3Value); 
    ellipse(60, 60, s5Value, s5Value); 
    ellipse(80, 80, scValue, scValue); 
    ellipse(100, 100, yp5Value, yp5Value); */

    stroke(0);
  strokeWeight(1);
  
  if(mx2!=null){
  line(mx,my,mx2,my2);  
     length6=dist(mx,my,mx2,my2);

  }
}

function mousePressed(){
    count++;
    if(count>2){
      count=0;
      mx=null;
      my=null;
      mx2=null;
      my2=null;
    }
    if(count==1){
      mx=mouseX;
      my=mouseY;
    }
    if(count==2){
      mx2=mouseX;
      my2=mouseY;
    }
  }

  function ue(x,y){
    beginShape();
    vertex(x+d,y);
    vertex(x+40+s-d,y);
    vertex(x+40+s-d,y+40);
    vertex(x+40+s,y+40);
    vertex(x+40+s,y+180+d+s2);
    vertex(x,y+180+d+s2);
    vertex(x,y+40);
    vertex(x+d,y+40);
    vertex(x+d,y);
    endShape();
    
    stroke(0);
    
    beginShape();
    vertex(x+20,y+170+s2-d+d);
    vertex(x+40+s-20,y+170+s2-d+d);
    vertex(x+40+s-20,y+170+s2+d);
    vertex(x+20,y+170+s2+d);
    vertex(x+20,y+170+s2-d+d);
    endShape();
    
    noStroke();
  }

  function mae(x,y){
    beginShape();
    vertex(x,y+10-d-s3);
    vertex(x+s,y+10-d-s3);
    vertex(x+s,y+10-s3);
    vertex(x+s+20,y+10-s3);
    vertex(x+s+20,y+60-s3);
    vertex(x+s+20-d,y+60-s3);
    vertex(x+s+20-d,y+110);
    vertex(x+s+20,y+110);
    vertex(x+s+20,y+130+d);
    vertex(x+s+5,y+130+d);
    vertex(x+s+5,y+130);
    vertex(x+s-10,y+130);
    vertex(x+s-20+s5/2,y+60-s3);
    vertex(x+20-s5/2,y+60-s3);
    vertex(x+10,y+130);
    vertex(x-5,y+130);
    vertex(x-5,y+130+d);
    vertex(x-20,y+130+d);
    vertex(x-20,y+110);
    vertex(x-20+d,y+110);
    vertex(x-20+d,y+60-s3);
    vertex(x-20,y+60-s3);
    vertex(x-20,y+10-s3);
    vertex(x,y+10-s3);
    vertex(x,y+10-d-s3);
    endShape();
  }

  function ushiro(x,y){
    beginShape();
    vertex(x+d,y+30-s3);
    vertex(x+s+40-d,y+30-s3);
    vertex(x+s+40-d,y+60-s3);
    vertex(x+s+40,y+60-s3);
    vertex(x+s+40,y+110);
    vertex(x+s+40-d,y+110);
    vertex(x+s+40-d,y+130+d);
    vertex(x+s+20,y+130+d);
    vertex(x+s+20,y+130);
    vertex(x+s+5,y+130);
    vertex(x+s+s5/2,y+60-s3);
    vertex(x+40-s5/2,y+60-s3);
    vertex(x+35,y+130);
    vertex(x+20,y+130);
    vertex(x+20,y+130+d);
    vertex(x+d,y+130+d);
    vertex(x+d,y+110);
    vertex(x,y+110);
    vertex(x,y+60-s3);
    vertex(x+d,y+60-s3);
    vertex(x+d,y+30-s3);
    endShape();
  }

  function ashi(x,y){
    beginShape();
  /*vertex(x,y-15);
    vertex(x+(d+45-s5)/2,y-15);
    vertex(x+(d+45-s5)/2,y);
    vertex(x+30,y);
    vertex(x+30,y+15);
    vertex(x+45,y+15);
    vertex(x+45,y+30);
    vertex(x+20,y+30);
    vertex(x,y+15);
    vertex(x,y-15);*/
    
    vertex(x-d-20+(d+45-s5)/2,y);
    vertex(x+15,y);
    //vertex(x+25+d,y);
    vertex(x+25+d,y+10+d);
    vertex(x+25+d,y+25+d);
    vertex(x-10+(d+45-s5)/2,y+25+d);
    vertex(x-10+(d+45-s5)/2,y+25+d-d);
    vertex(x-20+(d+45-s5)/2,y+25+d-d);
    vertex(x-20+(d+45-s5)/2,y+(d+45-s5)/4);
    vertex(x-d-20+(d+45-s5)/2,y+(d+45-s5)/4);
    vertex(x-d-20+(d+45-s5)/2,y);
    
    endShape();
  }