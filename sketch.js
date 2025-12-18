// キャンバスのサイズを定義
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

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

    // --- 描画に反映 ---
    fill(255, 0, 0); // 赤色
    noStroke();
    
    // スライダーの値(sValue)を円の直径として使用
    // マウス位置を中心に描画
    ellipse(width / 2, height / 2, sValue, sValue); 
}