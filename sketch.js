// キャンバスのサイズを定義
const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 700;

let d;
let s;
let s2;
let s3;
let s4;
let s5;
let sc;
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


    // --- 描画に反映 ---
    strokeWeight(0.1); // do 0.1 for laser
  stroke(255, 0, 0); // red is good for laser
  noFill(); // better not to have a fill for laser
    
    // スライダーの値(sValue)を円の直径として使用
    // マウス位置を中心に描画
    ellipse(width / 2, height / 2, sValue, sValue); 
    
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
  //console.log(length2);

  /*rect(resultX, yp3, 5, 5);
  rect(resultX + offsetX, yp3 + offsetY, 5, 5);
  rect(resultX2, yp4, 5, 5);
  rect(resultX2 + offsetX, yp4 + offsetY, 5, 5);*/
  
  //console.log(length2);
  //fill(0);
  noStroke();
  let angle = atan2(y2 - y1, x2 - x1);
  let angleDegrees = degrees(angle);
  
  let theta = degrees(angle);
  text("Angle: " + nf(angleDegrees, 1, 2) + " degrees", 10, 30);
  
  scale(sc/10);
  
}
  