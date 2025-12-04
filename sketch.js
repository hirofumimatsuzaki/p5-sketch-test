// ====================================================================
// グローバル設定とユーティリティ
// ====================================================================

// p5.js キャンバスのサイズ (画面幅に応じて動的に設定)
const CANVAS_SIZE = 1200; 

let p5Instance; // p5.jsのインスタンス

// デフォルトのパラメータ設定 (HTMLに入力欄がない場合に使用)
const DEFAULTS = {
    type: 'chair',
    d: 10,
    s: 80,
    s2: 0,
    s3: 0,
    s5: 0,
    sc: 10,
    yp5: 100
};

// DXFファイル生成用ユーティリティ
function createDxfTemplate(entities_data) {
    const header = `0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1012\n0\nENDSEC`;
    const tables = `0\nSECTION\n2\nTABLES\n0\nENDSEC`;
    const entities = `0\nSECTION\n2\nENTITIES\n${entities_data}\n0\nENDSEC`;
    const eof = `0\nEOF`;
    return `${header}\n${tables}\n${entities}\n${eof}`;
}

function createLineEntity(x1, y1, x2, y2) {
    return `
0
LINE
8
0
10
${x1}
20
${y1}
11
${x2}
21
${y2}
`;
}

// ====================================================================
// パラメータ取得ヘルパー (HTML要素がなくてもエラーにならないようにする)
// ====================================================================
function getParam(id, defaultValue) {
    const el = document.getElementById(id);
    if (el) {
        return isNaN(parseFloat(el.value)) ? el.value : parseFloat(el.value);
    }
    return defaultValue;
}

// ====================================================================
// カスタム椅子のパス計算用ユーティリティ
// ====================================================================

function calculateX(xp, yp, xp2, yp2, yp3) {
    if (xp2 === xp) return xp;
    let m = (yp2 - yp) / (xp2 - xp);
    if (m === 0) return xp;
    let x = (yp3 - yp) / m + xp;
    return x;
}

function calculateOffset(x1, y1, x2, y2, d) {
    if (!p5Instance) return { offsetX: 0, offsetY: 0 };
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = p5Instance.dist(x1, y1, x2, y2);
    if (length === 0) return { offsetX: 0, offsetY: 0 };
    const perpDx = -dy / length;
    const perpDy = dx / length;
    return { offsetX: perpDx * d, offsetY: perpDy * d };
}

function pathExtractor(pathPoints) {
    const points = [];
    for (let i = 0; i < pathPoints.length; i += 2) {
        points.push([pathPoints[i], pathPoints[i+1]]);
    }
    return points;
}

// ====================================================================
// 部品パス生成関数
// ====================================================================

/** 側面パネルのパスを生成 (Side_Panel_Complex) */
function getSokumenPath(p, calc) {
    const x_base = 30;
    const y_base = 200;
    const y_min = y_base - p.d; 
    
    const path = [
        calc.xp6 - x_base, calc.yp6 - y_min,
        calc.xp7 + p.s2 - x_base, calc.yp7 - y_min,
        calc.xp7 + p.s2 - x_base, calc.yp7 - calc.offsetY2 - y_min,
        calc.newX3 + p.d - 10 - x_base, calc.newY3 - y_min,
        calc.resultX + p.s2 - x_base, calc.yp3 - y_min,
        calc.resultX + calc.offsetX + p.s2 - x_base, calc.yp3 + calc.offsetY - y_min,
        calc.resultX2 + calc.offsetX + p.s2 - x_base, calc.yp4 + calc.offsetY - y_min,
        calc.resultX2 + p.s2 - x_base, calc.yp4 - y_min,
        calc.resultX3 + p.s2 - x_base, calc.yp5 - y_min,
        calc.newX2 + p.s2 - x_base, calc.newY2 - y_min,
        (x_base + 170 + p.s2) - x_base, (y_base + 50) - y_min,
        (x_base + 170 + p.s2 - p.d) - x_base, (y_base + 50) - y_min,
        (x_base + 170 + p.s2 - p.d) - x_base, (y_base + 100 + p.s3) - y_min,
        (x_base + 170 + p.s2) - x_base, (y_base + 100 + p.s3) - y_min,
        (x_base + 170 + p.s2) - x_base, (y_base + 120 + p.s3 + p.d) - y_min,
        (x_base + 155 + p.s2) - x_base, (y_base + 120 + p.s3 + p.d) - y_min,
        (x_base + 155 + p.s2) - x_base, (y_base + 120 + p.s3) - y_min,
        (x_base + 140 + p.s2) - x_base, (y_base + 120 + p.s3) - y_min,
        (x_base + 120 + p.s5 + p.s2) - x_base, (y_base + 50) - y_min,
        (x_base + 45 - p.s5) - x_base, (y_base + 50) - y_min,
        (x_base + (p.d + 45 - p.s5) / 2) - x_base, (y_base + 120 + p.s3) - y_min,
        (x_base + 10) - x_base, (y_base + 120 + p.s3) - y_min,
        (x_base + 10) - x_base, (y_base + 120 + p.s3 + p.d) - y_min,
        x_base - x_base, (y_base + 120 + p.s3 + p.d) - y_min,
        x_base - x_base, (y_base + 100 + p.s3) - y_min,
        (x_base - p.d) - x_base, (y_base + 100 + p.s3) - y_min,
        (x_base - p.d) - x_base, (y_base + 50) - y_min,
        x_base - x_base, (y_base + 50) - y_min,
        x_base - x_base, y_base - y_min, 
    ];
    return [pathExtractor(path)];
}

/** 座面パネルのパスを生成 (Seat_Top/Ue) */
function getUePath(p) {
    const x_base = 250;
    const y_base = 100;
    const outerPath = [
        (x_base + p.d) - x_base, y_base - y_base,
        (x_base + 40 + p.s - p.d) - x_base, y_base - y_base,
        (x_base + 40 + p.s - p.d) - x_base, (y_base + 40) - y_base,
        (x_base + 40 + p.s) - x_base, (y_base + 40) - y_base,
        (x_base + 40 + p.s) - x_base, (y_base + 180 + p.d + p.s2) - y_base,
        x_base - x_base, (y_base + 180 + p.d + p.s2) - y_base,
        x_base - x_base, (y_base + 40) - y_base,
        (x_base + p.d) - x_base, (y_base + 40) - y_base,
        (x_base + p.d) - x_base, y_base - y_base,
    ];
    const slotPath = [
        (x_base + 20) - x_base, (y_base + 170 + p.s2 - p.d + p.d) - y_base,
        (x_base + 40 + p.s - 20) - x_base, (y_base + 170 + p.s2 - p.d + p.d) - y_base,
        (x_base + 40 + p.s - 20) - x_base, (y_base + 170 + p.s2 + p.d) - y_base,
        (x_base + 20) - x_base, (y_base + 170 + p.s2 + p.d) - y_base,
        (x_base + 20) - x_base, (y_base + 170 + p.s2 - p.d + p.d) - y_base,
    ];
    return [pathExtractor(outerPath), pathExtractor(slotPath)];
}

/** 背もたれのパスを生成 (Backrest/Semotare) */
function getSemotarePath(p, calc) {
    const x_base = 500;
    const y_base = 100;
    const path = [
        x_base - x_base, y_base - y_base,
        (x_base + 40 + p.s) - x_base, y_base - y_base,
        (x_base + 40 + p.s) - x_base, (y_base + 20) - y_base,
        (x_base + 40 + p.s - p.d) - x_base, (y_base + 20) - y_base,
        (x_base + 40 + p.s - p.d) - x_base, (y_base + 20 + calc.length4) - y_base,
        (x_base + 40 + p.s) - x_base, (y_base + 20 + calc.length4) - y_base,
        (x_base + 40 + p.s) - x_base, (y_base + 20 + calc.length4 + calc.length2) - y_base,
        x_base - x_base, (y_base + 20 + calc.length4 + calc.length2) - y_base,
        x_base - x_base, (y_base + 20 + calc.length4) - y_base,
        (x_base + p.d) - x_base, (y_base + 20 + calc.length4) - y_base,
        (x_base + p.d) - x_base, (y_base + 20) - y_base,
        x_base - x_base, (y_base + 20) - y_base,
        x_base - x_base, y_base - y_base,
    ];
    return [pathExtractor(path)];
}

/** 前足パネルのパスを生成 (Front_Panel/Mae) */
function getMaePath(p) {
    const x_base = 800;
    const y_base = 100;
    const y_base_offset = y_base + 10 - p.d - p.s3; 
    const path = [
        x_base - x_base, (y_base + 10 - p.d - p.s3) - y_base_offset,
        (x_base + p.s) - x_base, (y_base + 10 - p.d - p.s3) - y_base_offset,
        (x_base + p.s) - x_base, (y_base + 10 - p.s3) - y_base_offset,
        (x_base + p.s + 20) - x_base, (y_base + 10 - p.s3) - y_base_offset,
        (x_base + p.s + 20) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + p.s + 20 - p.d) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + p.s + 20 - p.d) - x_base, (y_base + 110) - y_base_offset,
        (x_base + p.s + 20) - x_base, (y_base + 110) - y_base_offset,
        (x_base + p.s + 20) - x_base, (y_base + 130 + p.d) - y_base_offset,
        (x_base + p.s + 5) - x_base, (y_base + 130 + p.d) - y_base_offset,
        (x_base + p.s + 5) - x_base, (y_base + 130) - y_base_offset,
        (x_base + p.s - 10) - x_base, (y_base + 130) - y_base_offset,
        (x_base + p.s - 20 + p.s5 / 2) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + 20 - p.s5 / 2) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + 10) - x_base, (y_base + 130) - y_base_offset,
        (x_base - 5) - x_base, (y_base + 130) - y_base_offset,
        (x_base - 5) - x_base, (y_base + 130 + p.d) - y_base_offset,
        (x_base - 20) - x_base, (y_base + 130 + p.d) - y_base_offset,
        (x_base - 20) - x_base, (y_base + 110) - y_base_offset,
        (x_base - 20 + p.d) - x_base, (y_base + 110) - y_base_offset,
        (x_base - 20 + p.d) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base - 20) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base - 20) - x_base, (y_base + 10 - p.s3) - y_base_offset,
        x_base - x_base, (y_base + 10 - p.s3) - y_base_offset,
        x_base - x_base, (y_base + 10 - p.d - p.s3) - y_base_offset,
    ];
    return [pathExtractor(path)];
}

/** 後ろ足パネルのパスを生成 (Back_Panel/Ushiro) */
function getUshiroPath(p) {
    const x_base = 780;
    const y_base = 300;
    const y_base_offset = y_base + 30 - p.s3;
    const path = [
        (x_base + p.d) - x_base, (y_base + 30 - p.s3) - y_base_offset,
        (x_base + p.s + 40 - p.d) - x_base, (y_base + 30 - p.s3) - y_base_offset,
        (x_base + p.s + 40 - p.d) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + p.s + 40) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + p.s + 40) - x_base, (y_base + 110) - y_base_offset,
        (x_base + p.s + 40 - p.d) - x_base, (y_base + 110) - y_base_offset,
        (x_base + p.s + 40 - p.d) - x_base, (y_base + 130 + p.d) - y_base_offset,
        (x_base + p.s + 20) - x_base, (y_base + 130 + p.d) - y_base_offset,
        (x_base + p.s + 20) - x_base, (y_base + 130) - y_base_offset,
        (x_base + p.s + 5) - x_base, (y_base + 130) - y_base_offset,
        (x_base + p.s + p.s5 / 2) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + 40 - p.s5 / 2) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + 35) - x_base, (y_base + 130) - y_base_offset,
        (x_base + 20) - x_base, (y_base + 130) - y_base_offset,
        (x_base + 20) - x_base, (y_base + 130 + p.d) - y_base_offset,
        (x_base + p.d) - x_base, (y_base + 130 + p.d) - y_base_offset,
        (x_base + p.d) - x_base, (y_base + 110) - y_base_offset,
        x_base - x_base, (y_base + 110) - y_base_offset,
        x_base - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + p.d) - x_base, (y_base + 60 - p.s3) - y_base_offset,
        (x_base + p.d) - x_base, (y_base + 30 - p.s3) - y_base_offset,
    ];
    return [pathExtractor(path)];
}

/** 足サポートのパスを生成 (Foot_Support/Ashi) */
function getAshiPath(p) {
    const d = p.d;
    const s5 = p.s5;
    const path = [
        (-d - 20 + (d + 45 - s5) / 2), 0,
        15, 0,
        25 + d, 10 + d,
        25 + d, 25 + d,
        -10 + (d + 45 - s5) / 2, 25 + d,
        -10 + (d + 45 - s5) / 2, 25,
        -20 + (d + 45 - s5) / 2, 25,
        -20 + (d + 45 - s5) / 2, (d + 45 - s5) / 4,
        -d - 20 + (d + 45 - s5) / 2, (d + 45 - s5) / 4,
        -d - 20 + (d + 45 - s5) / 2, 0,
    ];
    return [pathExtractor(path)];
}


// ====================================================================
// メインデータ構造: 選択された家具の部品リストとパスを返す
// ====================================================================

function getFurnitureParts(type, customParams) {
    const p = customParams;
    const parts = [];
    
    // パラメータが正しく渡ってきているか確認
    // console.log("Current Params:", p);

    const x1 = 140;
    const y1 = 200 - p.d;
    const x2 = 190;
    const y2 = 100;
    const x3 = 30;
    const y3 = 200;
    const x4 = 160 + p.s2;
    const y4 = 200 + p.d;

    const calc = {};
    calc.xp6 = x3;
    calc.yp6 = y3;
    calc.xp7 = x4;
    calc.yp7 = y4;
    calc.yp3 = y1 - 20;
    calc.yp4 = y1 - 60;
    calc.yp5 = p.yp5;
    calc.yp8 = calc.yp7 - p.d / 9;

    calc.resultX = calculateX(x1, y1, x2, y2, calc.yp3);
    calc.resultX2 = calculateX(x1, y1, x2, y2, calc.yp4);
    calc.resultX3 = calculateX(x1, y1, x2, y2, calc.yp5);
    calc.resultX4 = calculateX(calc.xp6, calc.yp6, calc.xp7, calc.yp7, calc.yp8);

    const offset1 = calculateOffset(x1, y1, x2, y2, p.d);
    calc.offsetX = offset1.offsetX;
    calc.offsetY = offset1.offsetY;

    const offset2 = calculateOffset(x3, y3, x4, y4, p.d);
    calc.offsetX2 = offset2.offsetX;
    calc.offsetY2 = offset2.offsetY;

    calc.newX2 = calc.resultX3 + calc.offsetX;
    calc.newY2 = calc.yp5 + calc.offsetY;
    calc.newX3 = calc.resultX4 + p.s2 - calc.offsetX;
    calc.newY3 = calc.yp8 + p.s2 / 60 - calc.offsetY2;
    
    if (p5Instance) {
        calc.length2 = p5Instance.dist(calc.resultX + p.s2, calc.yp3, calc.resultX2 + p.s2, calc.yp4);
        calc.length4 = p5Instance.dist(calc.resultX2 + p.s2, calc.yp4, calc.resultX3 + p.s2, calc.yp5);
    } else {
        calc.length2 = 0;
        calc.length4 = 0;
    }

    switch (type) {
        case 'chair':
            // 1. 側面パネル
            const sokumenPath = getSokumenPath(p, calc);
            const sokumen_w = 170 + p.s2 + p.d; 
            const sokumen_h_max = 120 + p.s3 + p.d + 20; 
            parts.push({ name: "Side_Panel_Complex", width: sokumen_w, height: sokumen_h_max, paths: sokumenPath });

            // 2. 座面
            const uePaths = getUePath(p);
            parts.push({ 
                name: "Seat_Top (Ue)", 
                width: p.s + 40, 
                height: 180 + p.d + p.s2, 
                paths: uePaths 
            });

            // 3. 背もたれ
            const semotarePath = getSemotarePath(p, calc);
            const semotare_h = 20 + calc.length4 + calc.length2;
            parts.push({ name: "Backrest (Semotare)", width: p.s + 40, height: semotare_h, paths: semotarePath });

            // 4. 前足
            const maePath = getMaePath(p);
            parts.push({ name: "Front_Leg", width: p.s + 40, height: 130 + p.d, paths: maePath });

            // 5. 後ろ足
            const ushiroPath = getUshiroPath(p);
            parts.push({ name: "Back_Leg", width: p.s + 40, height: 130 + p.d, paths: ushiroPath });
            
            // 6. 足裏
            const ashiPath = getAshiPath(p);
            parts.push({ name: "Foot_Support", width: 100, height: 25 + p.d, paths: ashiPath });
            
            break;

        case 'desk':
            const desk_w = 1200 * p.sc / 100;
            const desk_h = 750 * p.sc / 100;
            parts.push({ name: "Desk_Top", paths: [pathExtractor([0,0, desk_w,0, desk_w,desk_h*0.5, 0,desk_h*0.5, 0,0])], width: desk_w, height: desk_h*0.5 });
            break;
        case 'shelf':
            const shelf_w = 600 * p.sc / 100;
            const shelf_h = 1500 * p.sc / 100;
            parts.push({ name: "Shelf_Panel", paths: [pathExtractor([0,0, shelf_w*0.2,0, shelf_w*0.2,shelf_h, 0,shelf_h, 0,0])], width: shelf_w*0.2, height: shelf_h });
            break;
        case 'house':
            const house_w = 2000 * p.sc / 100;
            const house_h = 2500 * p.sc / 100;
            parts.push({ name: "House_Wall", paths: [pathExtractor([0,0, house_w,0, house_w,house_h, 0,house_h, 0,0])], width: house_w, height: house_h });
            break;
    }

    return parts;
}


// ====================================================================
// p5.js スケッチ
// ====================================================================

const sketch = (s) => {
    const CANVAS_W = CANVAS_SIZE;
    const CANVAS_H = CANVAS_SIZE;

    s.setup = () => {
        p5Instance = s; // インスタンスを確保
        s.createCanvas(CANVAS_W, CANVAS_H);
        s.noLoop();
        
        // HTML要素が存在する場合のみイベントリスナーを設定
        const controls = document.querySelectorAll('#controls input, #controls select');
        if (controls.length > 0) {
            controls.forEach(el => {
                el.addEventListener('input', () => s.redraw());
            });
        }
        
        const dlBtn = document.getElementById('download-button');
        if (dlBtn) {
            dlBtn.addEventListener('click', generateAndDownloadDxf);
        }
    };

    s.draw = () => {
        s.background(s.color('var(--canvas-bg)'));

        // パラメータ取得 (HTML要素がない場合はデフォルト値を使用)
        const currentType = getParam('furniture_type', DEFAULTS.type);
        const d = getParam('material_thickness', DEFAULTS.d);
        const s_val = getParam('s', DEFAULTS.s);
        const s2 = getParam('s2', DEFAULTS.s2);
        const s3 = getParam('s3', DEFAULTS.s3);
        const s5 = getParam('s5', DEFAULTS.s5);
        const sc = getParam('sc', DEFAULTS.sc);
        const yp5 = getParam('yp5', DEFAULTS.yp5);

        const scale_factor = sc / 10;
        const padding = 50;

        const customParams = { d: d, s: s_val, s2: s2, s3: s3, s5: s5, sc: sc, yp5: yp5 };
        const parts = getFurnitureParts(currentType, customParams);

        let max_height = 0;
        parts.forEach(part => {
            part.paths.forEach(path => {
                path.forEach(pt => {
                    if(pt[1] > max_height) max_height = pt[1];
                });
            });
        });

        const y_offset = max_height * scale_factor + padding;
        
        s.push();
        s.translate(padding + d * scale_factor, y_offset);
        s.scale(scale_factor);

        let current_x = 0;
        
        parts.forEach(part => {
            if (part.name === "Example_Part" && currentType !== 'chair') return;

            s.fill(50);
            s.noStroke();
            s.textSize(20 / scale_factor);
            s.text(part.name, current_x, -(max_height + 10));

            s.stroke(50);
            s.strokeWeight(1.5 / scale_factor);
            
            part.paths.forEach((path, index) => {
                s.beginShape();
                if (index > 0) { s.noFill(); s.stroke(s.color(200, 0, 0)); }
                else { s.fill(s.color(220)); s.stroke(50); }

                path.forEach(([x, y]) => {
                    s.vertex(x + current_x, -y);
                });
                s.endShape(s.CLOSE);
            });

            current_x += part.width + 20;
        });
        
        s.pop();

        s.fill(0);
        s.noStroke();
        s.textSize(16);
        s.textAlign(s.LEFT, s.BOTTOM);
        s.text(`Type: ${currentType}, d: ${d}mm, s: ${s_val}mm, scale: ${scale_factor}`, 20, CANVAS_H - 20);
    };
};

new p5(sketch, 'furniture-sketch');


// ====================================================================
// DXFダウンロード
// ====================================================================

function generateAndDownloadDxf() {
    const currentType = getParam('furniture_type', DEFAULTS.type);
    const d = getParam('material_thickness', DEFAULTS.d);
    const s_val = getParam('s', DEFAULTS.s);
    const s2 = getParam('s2', DEFAULTS.s2);
    const s3 = getParam('s3', DEFAULTS.s3);
    const s5 = getParam('s5', DEFAULTS.s5);
    const sc = getParam('sc', DEFAULTS.sc);
    const yp5 = getParam('yp5', DEFAULTS.yp5);

    const customParams = { d: d, s: s_val, s2: s2, s3: s3, s5: s5, sc: 10, yp5: yp5 };
    const parts = getFurnitureParts(currentType, customParams);
    
    let entities_data = '';
    let current_x = 0;
    const dxf_offset_x = d;

    parts.forEach(part => {
        part.paths.forEach(path => {
            for (let i = 0; i < path.length; i++) {
                const p1 = path[i];
                const p2 = path[(i + 1) % path.length];
                const x1 = p1[0] + current_x + dxf_offset_x;
                const y1 = p1[1];
                const x2 = p2[0] + current_x + dxf_offset_x;
                const y2 = p2[1];
                entities_data += createLineEntity(x1, y1, x2, y2);
            }
        });
        current_x += part.width + 20;
    });

    const final_dxf_data = createDxfTemplate(entities_data);
    const filename = `custom_${currentType}_${Date.now()}.dxf`;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(final_dxf_data));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}