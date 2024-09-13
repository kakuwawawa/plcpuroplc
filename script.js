let switchCount = 0;
let outputCount = 0;

// スイッチの追加
document.getElementById('addSwitch').addEventListener('click', function() {
    switchCount++;
    const rungContainer = document.getElementById('rungContainer');
    const newRung = document.createElement('div');
    newRung.classList.add('rung');
    
    const switchElement = document.createElement('button');
    switchElement.classList.add('switch');
    switchElement.textContent = `スイッチ${switchCount}`;
    switchElement.addEventListener('click', toggleSwitch);

    const lineElement = document.createElement('span');
    lineElement.classList.add('line');

    newRung.appendChild(switchElement);
    newRung.appendChild(lineElement);
    rungContainer.appendChild(newRung);
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

// スイッチのオン/オフ切り替え
function toggleSwitch(event) {
    const outputElement = event.target.nextElementSibling.nextElementSibling;
    if (outputElement && outputElement.classList.contains('output')) {
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
}
