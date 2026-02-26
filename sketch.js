// キャンバスのサイズを定義
const CANVAS_WIDTH = 2700;
const CANVAS_HEIGHT = 1400;

let d=10;
let s=80;
let s2=0;
let s3=0;
let s4=0;
let s5=0;
let s6=40;
let s7=20;
let s8=-80;
let s9;
let s10;
let s11=0;
let s12=15;
//let sc=0;
let test=0;//test
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
let yp5=100;
let xp6
let yp6;
let xp7;
let yp7;
let resultX;
let resultX2;
let resultX3;
let resultX4;
let yp8;
let length2;
let length4;
let length5;
let length6;
//let length7;
let count=0;
let mx;
let my;
let mx2;
let my2;
let centerY;
let button;


function setup() {
    // 1. キャンバスを作成
    //let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, SVG);


    // 2. 作成したキャンバスを右側のカラムの要素にアタッチする
    canvas.parent('canvas-container'); 

    const btn = document.getElementById("download-button");

  btn.addEventListener("click", () => {
    saveS();
  });
}

function draw() {
  scale(0.6);
  translate(0,400);
    background(220); // 毎フレーム背景を塗りつぶす（残像を消すため）
   fill(50);
   textSize(24);
    text("側面縦幅"+(320+s3+d-(0+yp5))+"mm",10,20);
    text("側面横幅"+(170+d+s2)+"mm",220,20);
    text("全体縦幅"+(320+s3+d-(0+yp5)+20)+"mm",10,60);
    text("全体横幅"+(170+d*2+s2)+"mm",220,60);
    text(length6,10,60);
    translate(0,300);
    resultX = calculateX(x1, y1, x2, y2, yp3);
    resultX2 = calculateX(x1, y1, x2, y2, yp4);
    resultX3 = calculateX(x1, y1, x2, y2, yp5);
    resultX4 = calculateX(xp6, yp6, xp7, yp7, yp8);

    // 元の線の傾きを計算
  let dx = x2 - x1;
  let dy = y2 - y1;

  // 元の線に垂直な方向の単位ベクトルを計算
  let length = dist(x1, y1, x2, y2); // 元の線の長さ
  let perpDx = -dy / length; // 垂直な方向のx成分
  let perpDy = dx / length; // 垂直な方向のy成分

  // 移動する距離
  let distance = d; // 30ピクセル垂直方向に移動

  // 平行移動する分を計算
   offsetX = perpDx * distance;
   offsetY = perpDy * distance;

   // 平行移動後の新しい点を計算
   newX1 = x1 + offsetX;
   newY1 = y1 + offsetY;
  newX2 = resultX3 + offsetX;
   newY2 = yp5 + offsetY;
   newX3 = resultX4+s2-offsetX;
   newY3 = yp8+s2/60-offsetY2;//
   //let newX2 = resultX3 + offsetX;
  //let newY2 = yp5 + offsetY;

  length2=dist(resultX+s2,yp3,resultX2+s2, yp4);
  length4=dist(resultX2+s2, yp4,resultX3+s2,yp5);
  length5=dist(xp6,yp6,xp7+s2,yp7);

  let dx2 = x4 - x3;
  let dy2 = y4 - y3;

  // 元の線に垂直な方向の単位ベクトルを計算
  let length3 = dist(x3, y3, x4, y4); // 元の線の長さ
  let perpDx2 = -dy2 / length3; // 垂直な方向のx成分
  let perpDy2 = dx2 / length3; // 垂直な方向のy成分

   // 移動する距離
   let distance2 = d; // 30ピクセル垂直方向に移動

   // 平行移動する分を計算
    offsetX2 = perpDx2 * distance2;
    offsetY2 = perpDy2 * distance2;

    noStroke();
  let angle = atan2(y2 - y1, x2 - x1);
  let angleDegrees = degrees(angle);
  
  let theta = degrees(angle);
  //fill(0);
  //text("Angle: " + nf(angleDegrees, 1, 2) + " degrees", 10, 35);
  
  x1 = 140+s8
  x2=145+s7+s8;

  
  //scale(sc/10);
    
    let inputValue=document.getElementById('material_thickness');
    let iValue=parseFloat(inputValue.value);
    document.getElementById('display_i').innerText = iValue + " mm";
    // --- HTMLのスライダーから値を取得 ---
    // id="s" のスライダー要素を取得
    let sliderS = document.getElementById('s');
    // スライダーの現在の値（文字列）を数値に変換
    let sValue = parseFloat(sliderS.value);
   // ellipse(1000,100,iValue,iValue);

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

    /*let sliderSC = document.getElementById('sc');
    let scValue = parseFloat(sliderSC.value);
    document.getElementById('display_sc').innerText = scValue/10 + " 倍";*/

    let sliderYP5 = document.getElementById('yp5');
    let yp5Value = parseFloat(sliderYP5.value);
    document.getElementById('display_yp5').innerText = yp5Value + " mm";

    let sliderS6 = document.getElementById('s6');
    let s6Value = parseFloat(sliderS6.value);
    document.getElementById('display_s6').innerText = s6Value + " mm";

    let sliderS7 = document.getElementById('s7');
    let s7Value = parseFloat(sliderS7.value);
    document.getElementById('display_s7').innerText = s7Value + " mm";

    let sliderS8 = document.getElementById('s8');
    let s8Value = parseFloat(sliderS8.value);
    document.getElementById('display_s8').innerText = s8Value + " mm";

    let sliderS11 = document.getElementById('s11');
    let s11Value = parseFloat(sliderS11.value);
    document.getElementById('display_s11').innerText = s11Value + " mm";

    let sliderS12 = document.getElementById('s12');
    let s12Value = parseFloat(sliderS12.value);
    document.getElementById('display_s12').innerText = s12Value + " mm";


    d=iValue;
    s=sValue;
    s2=s2Value;
    s3=s3Value;
    s5=s5Value;
    s6=s6Value;
    s7=s7Value;
    s8=s8Value;
    s11=s11Value;
    s12=s12Value;
    //sc=scValue;
    yp5=yp5Value;
  

    // --- 描画に反映 ---
    fill(255); // 白色
    noStroke();

    sokumen(30,200);
    ue(230+s2,100);
    semotare(330+s2+s,100);
    mae(450+s2+s*2,200+s3);
    ushiro(500+s2+s*3,200+s3);
    ashi(300+s2,50);
    // スライダーの値(sValue)を円の直径として使用
    // マウス位置を中心に描画
    //ellipse(width / 2, height / 2, sValue, sValue); 
    /*ellipse(20, 20, s2Value, s2Value); 
    ellipse(40, 40, s3Value, s3Value); 
    ellipse(60, 60, s5Value, s5Value); 
    ellipse(80, 80, scValue, scValue); 
    ellipse(100, 100, yp5Value, yp5Value); */

    stroke(1);
  strokeWeight(1);
  
  /*if(mx2!=null){
  line(mx,my-300,mx2,my2-300);  
     length6=dist(mx,my,mx2,my2);

  }*/
  centerY=120+s3+d;


}

function saveS(){
   save("mySVG.svg"); // give file name
  print("saved svg");
  //noLoop(); // we just want to export once
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

  function sokumen(x,y){
    stroke(1);
    strokeWeight(1);
    
    beginShape();
    vertex(xp6,yp6);
    vertex(xp7+s2,yp7+s11);
    vertex(xp7+s2,yp7+s11-offsetY2);
    vertex(x1+s2-s11/5,yp7+s11-offsetY2-s11/5);
    vertex(resultX+s2,yp3);
    vertex(resultX + offsetX+s2, yp3 + offsetY);
    vertex(resultX2 + offsetX+s2, yp4 + offsetY);
    vertex(resultX2+s2, yp4);
    vertex(resultX3+s2,yp5);
    vertex(resultX3+s2+d,newY2);
    vertex(x+170+s2,y+centerY/4);
    vertex(x+170+s2-d,y+centerY/4);
    vertex(x+170+s2-d,y+centerY/1.5);
    vertex(x+170+s2,y+centerY/1.5);
    vertex(x+170+s2,y+120+s3+d);
    vertex(x+170+s2-s12/2,y+120+s3+d);
    vertex(x+170+s2-s12/2,y+120+s3);
    vertex(x+170+s2-s12,y+120+s3);
    vertex(x+170-40-d+s5+s2,y+s6);
    vertex(x+40-s5,y+s6);
    vertex(x-d+s12,y+120+s3);
    vertex(x-d+s12/2,y+120+s3);
    vertex(x-d+s12/2,y+120+s3+d);
    vertex(x,y+120+s3+d);
    vertex(x,y+centerY/1.5);
    vertex(x-d,y+centerY/1.5);
    vertex(x-d,y+centerY/4);
    vertex(x,y+centerY/4);
    vertex(x,y);
    s9=y+centerY/4;
    s10=y+centerY/1.5;
    endShape();
    
  }

  function ue(x,y){
    beginShape();
    vertex(x+d,y);
    vertex(x+40+s-d,y);
    vertex(x+40+s-d,y+40);
    vertex(x+40+s,y+40);
    vertex(x+40+s,y+170+5+d*2+s2);
    vertex(x,y+170+5+d*2+s2);
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

  function semotare(x,y){
    stroke(1);
    strokeWeight(1);
    beginShape();
    vertex(x,y);
    vertex(x+40+s,y);
    vertex(x+40+s,y+20);
    vertex(x+40+s-d,y+20);
    vertex(x+40+s-d,y+20+length4);
    vertex(x+40+s,y+20+length4);
    vertex(x+40+s,y+20+length4+length2);
    vertex(x,y+20+length4+length2);
    vertex(x,y+20+length4);
    vertex(x+d,y+20+length4);
    vertex(x+d,y+20);
    vertex(x,y+20);
    vertex(x,y);
    endShape();
  }

  function mae(x,y){
    beginShape();
    vertex(x,y+10-d-s3);
    vertex(x+s,y+10-d-s3);
    vertex(x+s,y+10-s3);
    vertex(x+s+20,y+10-s3);
    vertex(x+s+20,s9+d);
    vertex(x+s+20-d,s9+d);
    vertex(x+s+20-d,s10+d);
    vertex(x+s+20,s10+d);
    vertex(x+s+20,y+130+d);
    vertex(x+s+20-s12/2,y+130+d);
    vertex(x+s+20-s12/2,y+130);
    vertex(x+s+20-s12,y+130);
    vertex(x+s-20+s5/2,y+60-s3);
    vertex(x+20-s5/2,y+60-s3);
    vertex(x-20+s12,y+130);
    vertex(x-20+s12/2,y+130);
    vertex(x-20+s12/2,y+130+d);
    vertex(x-20,y+130+d);
    vertex(x-20,s10+d);
    vertex(x-20+d,s10+d);
    vertex(x-20+d,s9+d);
    vertex(x-20,s9+d);
    vertex(x-20,y+10-s3);
    vertex(x,y+10-s3);
    vertex(x,y+10-d-s3);
    endShape();
  }

  function ushiro(x,y){
    beginShape();
    vertex(x+d,y+30-s3);
    vertex(x+s+40-d,y+30-s3);
    vertex(x+s+40-d,s9+d);
    vertex(x+s+40,s9+d);
    vertex(x+s+40,s10+d);
    vertex(x+s+40-d,s10+d);
    vertex(x+s+40-d,y+130+d);
    vertex(x+s+40-s12/2,y+130+d);
    vertex(x+s+40-s12/2,y+130);
    vertex(x+s+40-s12,y+130);
    vertex(x+s+s5/2,y+60-s3);
    vertex(x+40-s5/2,y+60-s3);
    vertex(x+s12,y+130);
    vertex(x+s12/2,y+130);
    vertex(x+s12/2,y+130+d);
    vertex(x+d,y+130+d);
    vertex(x+d,s10+d);
    vertex(x,s10+d);
    vertex(x,s9+d);
    vertex(x+d,s9+d);
    vertex(x+d,y+30-s3);
    endShape();
  }

  function ashi(x,y){
    beginShape();
   vertex(x,y);
   vertex(x+s12/2,y);
   vertex(x+s12/2,y-d);
   vertex(x+s12,y-d);
   vertex(x+s12,y-d+s12/2);
   vertex(x+s12,y-d+s12/2);
   vertex(x+s12/2-d,y+s12);
   vertex(x-d,y+s12);
   vertex(x-d,y+s12/2);
   vertex(x,y+s12);
   vertex(x,y);

   endShape();
   /*beginShape();
   vertex(x,y);
   vertex(x+15,y);
   vertex(x+d+d+15,y+d+d+15-15);
   vertex(x+d+d+15,y+d+d+15);
   vertex(x+d+d,y+d+d+15);
   vertex(x+d+d,y+d+15);
   vertex(x+d,y+d+15);
   vertex(x+d,y+15);
   vertex(x,y+15);
   vertex(x,y);
   endShape();*/
    
  }

  function calculateX(xp, yp, xp2, yp2, yp3,xp6, yp6, xp7, yp7, yp8) {
    // 傾きを計算
    let m = (yp2 - yp) / (xp2 - xp);
  
    // 与えられた y に対する x の値を計算
    let x = (yp3 - yp) / m + xp;
  
    return x
    
  }

  // 元の線の2つの点
 //x1 = 140;
 y1 = 200-d;
//x2 = 160;
 y2 = 100;
x3 = 30;
 y3 = 200;
x4 = 160+s2;
//y4 = s11;
 y4 = 200;

// 使用例
let xp = x1;
let yp = y1;
let xp2 = x2;
let yp2 = y2;
yp3 = y1-20;
yp4 = y1-60;
//yp4 = y1-60;
yp5=100;
xp6 = x3;
yp6 = y3;
xp7 = x4;
yp7 = y4;
yp8=yp7-d/9;
resultX = calculateX(xp, yp, xp2, yp2, yp3);
resultX2 = calculateX(xp, yp, xp2, yp2, yp4);
resultX3 = calculateX(xp, yp, xp2, yp2, yp5);
resultX4 = calculateX(xp6, yp6, xp7, yp7, yp8);
console.log(); // 結果: 50

/*<div class="control-section">
                <h3>椅子のカスタムパラメータ</h3>
                <div class="control-group">
                    <label for="s">座面横幅 (s)</label>
                    <input type="range" id="s" value="80" min="50" max="500">
                    <span id="display_s">80 mm</span>
                </div>
                <div class="control-group">
                    <label for="s2">側面横幅調整 (s2)</label>
                    <input type="range" id="s2" value="0" min="-100" max="500">
                    <span id="display_s2">0 mm</span>
                </div>
                <div class="control-group">
                    <label for="s3">足長さ調整 (s3)</label>
                    <input type="range" id="s3" value="0" min="-50" max="500">
                    <span id="display_s3">0 mm</span>
                </div>
                <div class="control-group">
                    <label for="s5">足細さ調整 (s5)</label>
                    <input type="range" id="s5" value="0" min="-200" max="200">
                    <span id="display_s5">0 mm</span>
                </div>
                <div class="control-group">
                    <label for="yp5">背もたれ長さ (yp5)</label>
                    <input type="range" id="yp5" value="100" min="-500" max="130">
                    <span id="display_yp5">100 mm</span>
                </div>
                <div class="control-group">
                    <label for="s6">足調整 (s6)</label>
                    <input type="range" id="s6" value="40" min="-200" max="200">
                    <span id="display_s6">0 mm</span>
                </div>
            </div>*/