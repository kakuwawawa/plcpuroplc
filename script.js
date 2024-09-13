let contactCount = 0;
let outputCount = 0;
let ladderState = [];

document.getElementById('addAContact').addEventListener('click', function() {
    addContact('A接点', 'a-contact', toggleAContact);
});

document.getElementById('addBContact').addEventListener('click', function() {
    addContact('B接点', 'b-contact', toggleBContact);
});

document.getElementById('addOutput').addEventListener('click', function() {
    outputCount++;
    const newRung = document.createElement('div');
    newRung.classList.add('rung');

    const outputElement = document.createElement('span');
    outputElement.classList.add('output', 'off');
    outputElement.textContent = `出力コイル${outputCount}`;
    outputElement.setAttribute('data-state', 'off');

    newRung.appendChild(outputElement);
    document.getElementById('rungContainer').appendChild(newRung);

    ladderState.push({
        type: 'output',
        id: outputCount,
        state: 'off'
    });
});

document.getElementById('simulate').addEventListener('click', function() {
    simulateLadder();
});

document.getElementById('reset').addEventListener('click', function() {
    resetLadder();
});

function addContact(type, className, toggleFunction) {
    contactCount++;
    const newRung = document.createElement('div');
    newRung.classList.add('rung');

    const contactElement = document.createElement('span');
    contactElement.classList.add(className, 'contact');
    contactElement.textContent = `${type}${contactCount}`;
    contactElement.setAttribute('data-state', 'off');
    contactElement.addEventListener('click', toggleFunction);

    newRung.appendChild(contactElement);
    document.getElementById('rungContainer').appendChild(newRung);

    ladderState.push({
        type: type === 'A接点' ? 'a-contact' : 'b-contact',
        id: contactCount,
        state: 'off'
    });
}

function toggleAContact(event) {
    toggleContact(event.target, 'a-contact');
}

function toggleBContact(event) {
    toggleContact(event.target, 'b-contact');
}

function toggleContact(contactElement, type) {
    const currentState = contactElement.getAttribute('data-state');
    const newState = currentState === 'off' ? 'on' : 'off';
    contactElement.setAttribute('data-state', newState);
    contactElement.classList.toggle('on', newState === 'on');

    // 更新するラダー状態
    const index = ladderState.findIndex(item => item.type === type && item.id === parseInt(contactElement.textContent.replace(type === 'a-contact' ? 'A接点' : 'B接点', '')));
    if (index !== -1) {
        ladderState[index].state = newState;
    }
}

function simulateLadder() {
    let output = true;

    // 各接点の状態を確認
    ladderState.forEach(element => {
        if (element.type === 'a-contact' && element.state === 'off') {
            output = false; // A接点が開いている場合
        }
        if (element.type === 'b-contact' && element.state === 'on') {
            output = false; // B接点が閉じている場合
        }
    });

    // 出力コイルの状態を更新
    const outputElement = document.querySelector('.output');
    if (output && outputElement) {
        outputElement.classList.add('on');
        outputElement.textContent = '出力コイルON';
        outputElement.setAttribute('data-state', 'on');
        document.getElementById('simulationOutput').textContent = '出力がONになりました！';
    } else if (outputElement) {
        outputElement.classList.remove('on');
        outputElement.textContent = '出力コイルOFF';
        outputElement.setAttribute('data-state', 'off');
        document.getElementById('simulationOutput').textContent = '出力がOFFになりました。';
    }
}

function resetLadder() {
    document.getElementById('rungContainer').innerHTML = '';
    document.getElementById('simulationOutput').textContent = '';
    ladderState = [];
    contactCount = 0;
    outputCount = 0;
}
