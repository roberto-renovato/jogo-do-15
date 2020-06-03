var TAMANHO = 100;
var tabuleiro = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
var referencia = JSON.stringify(tabuleiro);
var vazioI = vazioJ = 3;
var ganhou = false;

function dentroTabuleiro(i, j) {
    return i >= 0 && i <=3 && j >= 0 && j <=3;
}

function vazio(i, j) {
    return dentroTabuleiro(i, j) && tabuleiro[i][j] === 0;
}

function vazioAdjacente(i, j) {
    return vazio(i-1, j) || vazio(i+1, j) || vazio(i, j-1) || vazio(i, j+1);
}

function mexe(i, j) {
    tabuleiro[vazioI][vazioJ] = tabuleiro[i][j];
    tabuleiro[i][j] = 0;
    vazioI = i;
    vazioJ = j;
}

function embaralha(vezes) {
    var randomI, randomJ, vertical, ultimoMexido;
    for (var i = 0; i < vezes; i++) {
        randomI = randomJ = undefined;
        vertical = random([true, false]);
        if (vertical) {
            randomJ = vazioJ;
            randomI = vazioI + random([-1, 1]);
        } else { // horizontal
            randomI = vazioI;
            randomJ = vazioJ + random([-1, 1]);
        }
        if (dentroTabuleiro(randomI, randomJ) && tabuleiro[randomI][randomJ] !== ultimoMexido) {
            ultimoMexido = tabuleiro[randomI][randomJ];
            mexe(randomI, randomJ);
        } else {
            i--;
        }
    }
}

function renderizaPosicao(i, j) {
    fill("#ffcc4d");
    stroke("#ca7f10");
    rect(j * TAMANHO, i * TAMANHO, TAMANHO, TAMANHO);
    fill("#ca7f10");
    textSize(TAMANHO/2);
    textAlign(CENTER, CENTER);
    text(tabuleiro[i][j], j * TAMANHO + TAMANHO/2, i * TAMANHO + TAMANHO/2);
}

function renderizaTabuleiro() {
    background("#ca7f10");
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if (!vazio(i ,j)) {
                renderizaPosicao(i ,j);
            }
        }
    }
}

function reset() {
    ganhou = false;
    embaralha(1000);
}

function setup() {
    createCanvas(TAMANHO * 4 + 1, TAMANHO * 4 + 1);
    reset();
}

function mouseClicked() {
    var i = floor(mouseY / TAMANHO);
    var j = floor(mouseX / TAMANHO);
    if (dentroTabuleiro(i, j) && vazioAdjacente(i, j)) {
        mexe(i, j);
        ganhou = JSON.stringify(tabuleiro) === referencia;
    }
}

function draw() { // Game loop
    if (ganhou) {
        requestAnimationFrame(function () {
            reset();
            alert("Você ganhou!!!");
        });
    }
    renderizaTabuleiro();
}