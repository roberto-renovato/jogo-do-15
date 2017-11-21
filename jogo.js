var TAMANHO = 100;
var tabuleiro, referencia, ganhou, vazioI, vazioJ, embaralhamentos, vezes;

function inicializa() {
    tabuleiro = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
    referencia = JSON.stringify(tabuleiro);
    ganhou = false;
    vazioI = vazioJ = 3;
    embaralhamentos = 0;
    var resposta = prompt("Quantas vezes voce quer embaralhar?", 100);
    vezes = (resposta === null)? 0 : Number.parseInt(resposta);
}

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

function embaralha() {
    var randomI, randomJ;
    var vertical = random([true, false]);
    if (vertical) {
		randomJ = vazioJ;
        while (!dentroTabuleiro(randomI, randomJ)) {
            randomI = vazioI + random([-1, 1]);
        }
	} else { // horizontal
		randomI = vazioI;
        while (!dentroTabuleiro(randomI, randomJ)) {
            randomJ = vazioJ + random([-1, 1]);
        }
    }
    mexe(randomI, randomJ);
    embaralhamentos++;
}

//TO-DO: substituir embaralhar() por esta versão
function embaralhaInvisivel(vezes) {
    var randomI, randomJ, vertical, ultimoMexido;
    //var then = Date.now();
    for (var i = 0; i < vezes; i++) {
        randomI = randomJ = undefined;
        vertical = random([true, false]);
        if (vertical) {
            randomJ = vazioJ;
            while (!dentroTabuleiro(randomI, randomJ)) {
                randomI = vazioI + random([-1, 1]);
            }
        } else { // horizontal
            randomI = vazioI;
            while (!dentroTabuleiro(randomI, randomJ)) {
                randomJ = vazioJ + random([-1, 1]);
            }
        }
        if (tabuleiro[randomI][randomJ] !== ultimoMexido) {
            ultimoMexido = tabuleiro[randomI][randomJ];
            mexe(randomI, randomJ);
        } else {
            i--;
            pulou++;
        }
    }
   //console.log('Tempo: ' + (Date.now() - then));
}

function terminouEmbaralhar() {
    return embaralhamentos >= vezes;
}

function renderPosicao(i, j, fillColor) {
    fill(fillColor);
    rect(j * TAMANHO, i * TAMANHO, TAMANHO, TAMANHO);
    fill("black");
    textSize(TAMANHO/2);
    textAlign(CENTER, CENTER);
    text(tabuleiro[i][j], j * TAMANHO + TAMANHO/2, i * TAMANHO + TAMANHO/2);
}

function renderiza() {
    background(153);
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if (!vazio(i ,j)) {
                renderPosicao(i ,j, terminouEmbaralhar()? "#fffcd1" : "#ffe4e4");
            }
        }
    }
}

function setup() {
    inicializa();
    createCanvas(TAMANHO * 4 + 1, TAMANHO * 4 + 1);
}

function mouseClicked() {
	if (terminouEmbaralhar()) {
        var i = floor(mouseY / TAMANHO);
        var j = floor(mouseX / TAMANHO);
        if (dentroTabuleiro(i, j) && vazioAdjacente(i, j)) {
            mexe(i, j);
            ganhou = JSON.stringify(tabuleiro) === referencia;
        }
	}
}

function draw() { // Game loop
    if (!terminouEmbaralhar()) {
        embaralha();
    } else if (ganhou) {
		requestAnimationFrame(function () {
            alert("Você ganhou!!!");
			inicializa();
		});
	}
    renderiza();
}