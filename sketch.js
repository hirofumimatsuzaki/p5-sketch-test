function setup() {
    // 800x600ピクセルのキャンバスを作成
    const canvas = createCanvas(800, 600);
    
    // HTML内の id="sketch-holder" の要素の中にキャンバスを配置
    canvas.parent('sketch-holder');
    
    background(220); // 背景をグレーに設定
}

function draw() {
    // 毎回背景をリセットしないことで軌跡を残す（動作確認用）
    // background(220); 
    
    // マウスが押されているときは黒、それ以外は白
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    
    // マウスの位置に円を描く
    ellipse(mouseX, mouseY, 50, 50);
    
    // 中央にメッセージを表示
    fill(0);
    noStroke();
    textSize(20);
    textAlign(CENTER);
    text("Canvas is working!", width / 2, height / 2);
}