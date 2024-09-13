let contactCount = 0;
let outputCount = 0;

// A接点の追加
document.getElementById('addAContact').addEventListener('click', function() {
    contactCount++;
    const connectionType = document.getElementById('connectionType').value;

    const newContact = createContactElement(`A接点${contactCount}`, 'a-contact', toggleAContact);

    if (connectionType === 'series') {
        addSeriesContact(newContact);
    } else {
        addParallelContact(newContact);
    }
});

// B接点の追加
document.getElementById('addBContact').addEventListener('click', function() {
    contactCount++;
    const connectionType = document.getElementById('connectionType').value;

    const newContact = createContactElement(`B接点${contactCount}`, 'b-contact', toggleBContact);

    if (connectionType === 'series') {
        addSeriesContact(newContact);
    } else {
        addParallelContact(newContact);
    }
});

// 出力のA接点追加
document.getElementById('addOutputAContact').addEventListener('click', function() {
    outputCount++;
    const connectionType = document.getElementById('connectionType').value;

    const newOutputA = createOutputContactElement(`出力A接点${outputCount}`, 'a-contact', 'off');

    if (connectionType === 'series') {
        addSeriesContact(newOutputA);
    } else {
        addParallelContact(newOutputA);
    }
});

// 出力のB接点追加
document.getElementById('addOutputBContact').addEventListener('click', function() {
    outputCount++;
    const connectionType = document.getElementById('connectionType').value;

    const newOutputB = createOutputContactElement(`出力B接点${outputCount}`, 'b-contact', 'on');

    if (connectionType === 'series') {
        addSeriesContact(newOutputB);
    } else {
        addParallelContact(newOutputB);
    }
});

// 出力の追加
document.getElementById('addOutput').addEventListener('click', function() {
    outputCount++;
    const rungContainer = document.getElementById('rungContainer');
    const rungs = rungContainer.getElementsByClassName('rung');
    
    if (rungs.length > 0) {
        const lastRung = rungs[rungs.length - 1];
        const outputElement = document.createElement('span');
        outputElement.classList.add('output', 'off');
        outputElement.textContent = `出力${outputCount}`;

        lastRung.appendChild(outputElement);
    }
});

// 要素の削除
document.getElementById('removeElement').addEventListener('click', function() {
    const rungContainer = document.getElementById('rungContainer');
    const rungs = rungContainer.getElementsByClassName('rung');
    
    if (rungs.length > 0) {
        rungContainer.removeChild(rungs[rungs.length - 1]);
    }
});

// A接点の切り替え
function toggleAContact(event) {
    const outputElement = event.target.closest('.rung').querySelector('.output');
    if (outputElement) {
        toggleOutput(outputElement, 'a-contact');
    }
}

// B接点の切り替え
function toggleBContact(event) {
    const outputElement = event.target.closest('.rung').querySelector('.output');
    if (outputElement) {
        toggleOutput(outputElement, 'b-contact');
    }
}

// 出力のON/OFF切り替え
function toggleOutput(outputElement, contactType) {
    if (outputElement.classList.contains('off')) {
        outputElement.classList.remove('off');
        outputElement.classList.add('on');
        outputElement.textContent = outputElement.textContent.replace('OFF', 'ON');
    } else {
        outputElement.classList.remove('on');
        outputElement.classList.add('off');
        outputElement.textContent = outputElement.textContent.replace('ON', 'OFF');
    }
}

// 接点を作成する関数
function createContactElement(text, className, toggleFunction) {
    const newRung = document.createElement('div');
    newRung.classList.add('rung');

    const contactElement = document.createElement('button');
    contactElement.classList.add(className);
    contactElement.textContent = text;
    contactElement.addEventListener('click', toggleFunction);

    const lineElement = document.createElement('span');
    lineElement.classList.add('line');

    newRung.appendChild(contactElement);
    newRung.appendChild(lineElement);

    return newRung;
}

// 出力接点を作成する関数
function createOutputContactElement(text, className, state) {
    const newRung = document.createElement('div');
    newRung.classList.add('rung');

    const outputElement = document.createElement('span');
    outputElement.classList.add('output', state);
    outputElement.textContent = text;

    newRung.appendChild(outputElement);

    return newRung;
}

// 直列に接点を追加
function addSeriesContact(newRung) {
    const rungContainer = document.getElementById('rungContainer');
    rungContainer.appendChild(newRung);
}

// 並列に接点を追加
function addParallelContact(newRung) {
    const rungContainer = document.getElementById('rungContainer');
    const parallelContainer = document.createElement('div');
    parallelContainer.classList.add('rung');
    parallelContainer.style.display = 'flex';
    parallelContainer.style.flexDirection = 'column';

    parallelContainer.appendChild(newRung);
    rungContainer.appendChild(parallelContainer);
}
