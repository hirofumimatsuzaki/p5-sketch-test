// キャンバスのサイズを定義
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

function setup() {
    // 1. キャンバスを作成
    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // 2. 作成したキャンバスを右側のカラムの要素にアタッチする
    // IDは index.html で定義した "canvas-container"
    canvas.parent('canvas-container'); 
    
    background(220); // 背景色を設定
}

function draw() {
    // 描画コード
    fill(255, 0, 0); // 赤色
    ellipse(mouseX, mouseY, 50, 50); // マウスの位置に円を描画
}

// ウィンドウサイズが変更されたときにコンテナに合わせてキャンバスを再センタリングしたい場合は、
// このような関数を追加することもあります。
// function windowResized() {
//     // (ここではレイアウトがFlexboxで対応済みのため省略可能)
// }