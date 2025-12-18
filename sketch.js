// キャンバスのサイズを定義
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

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
    document.getElementById('display_sc').innerText = scValue + " mm";

    let sliderYP5 = document.getElementById('yp5');
    let yp5Value = parseFloat(sliderYP5.value);
    document.getElementById('display_yp5').innerText = yp5Value + " mm";


    // --- 描画に反映 ---
    fill(255, 0, 0); // 赤色
    noStroke();
    
    // スライダーの値(sValue)を円の直径として使用
    // マウス位置を中心に描画
    ellipse(width / 2, height / 2, sValue, sValue); 
    ellipse(20, 20, s2Value, s2Value); 
    ellipse(40, 40, s3Value, s3Value); 
    ellipse(60, 60, s5Value, s5Value); 
    ellipse(80, 80, scValue, scValue); 
    ellipse(100, 100, yp5Value, yp5Value); 
}