// Right Click

const customMenu = document.getElementById('custom-menu');

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    if (e.target !== document.getElementById('background') && e.target !== document.getElementById('selection')) return;

    const posX = e.clientX;
    const posY = e.clientY;

    customMenu.style.left = `${posX}px`;
    customMenu.style.top = `${posY}px`;

    customMenu.style.display = 'block';
});

document.addEventListener('mousedown', function (e) {
    if (e.button !== 2) {
        customMenu.style.display = 'none';
    }
});

// TopBar Items

const elementDiv = [document.getElementById('notification-window'), document.getElementById('accessibility-window'), document.getElementById('settings-window')];
const triggerDiv = [document.getElementById('time'), document.getElementById('accessibility'), document.getElementById('settings')];
var _isDivWindowOpen = [false, false, false];

function openWindow(n, e) {
    if (_isDivWindowOpen[n]) return;

    e.stopPropagation();

    const closeWindowHandler = closeWindow.bind(null, n);

    elementDiv[n].style.display = 'block';

    document.addEventListener('mousedown', closeWindowHandler);

    triggerDiv[n].removeEventListener('click', triggerDiv[n].openWindowHandler);

    triggerDiv[n].style.backgroundColor = 'rgba(150, 150, 150, 0.5)';

    _isDivWindowOpen[n] = true;

    elementDiv[n].classList.remove('disappear');
    elementDiv[n].classList.add('appear');
    
    triggerDiv[n].closeWindowHandler = closeWindowHandler;
}

function closeWindow(n, e) {
    if (!_isDivWindowOpen[n]) return;

    if (elementDiv[n].contains(e.target)) return;

    document.removeEventListener('mousedown', triggerDiv[n].closeWindowHandler);

    e.stopPropagation();

    const openWindowHandler = openWindow.bind(null, n);

    triggerDiv[n].addEventListener('click', openWindowHandler);

    triggerDiv[n].style.backgroundColor = '';

    _isDivWindowOpen[n] = false;

    elementDiv[n].classList.remove('appear');
    elementDiv[n].classList.add('disappear');

    triggerDiv[n].openWindowHandler = openWindowHandler

    setTimeout((() => {elementDiv[n].style.display = 'none'}), 150);
}

triggerDiv[0].addEventListener('click', openWindow.bind(null, 0));
triggerDiv[1].addEventListener('click', openWindow.bind(null, 1));
triggerDiv[2].addEventListener('click', openWindow.bind(null, 2));


// TODO: fix immediat reopen

// Desktop Selection

const selectionDiv = document.getElementById('selection');

let startX, startY;

document.addEventListener('mousedown', function(e) {

    if (e.target !== document.getElementById('background')) return;


    startX = e.clientX;
    startY = e.clientY;

    selectionDiv.style.left = `${startX}px`;
    selectionDiv.style.top = `${startY}px`;
    selectionDiv.style.width = '0px';
    selectionDiv.style.height = '0px';
    selectionDiv.style.display = 'block';

    document.addEventListener('mousemove', onMouseMove);
});

document.addEventListener('mouseup', function() {
    document.removeEventListener('mousemove', onMouseMove);
    selectionDiv.style.display = 'none';
});

function onMouseMove(e) {

    // Prevent overflow

    var height = e.clientY - startY - 1;
    var width = e.clientX - startX - 1;

    
    // Calc

    selectionDiv.style.width = `${Math.abs(width)}px`;
    selectionDiv.style.height = `${Math.abs(height)}px`;

    if (width < 0) {
        selectionDiv.style.left = `${e.clientX}px`;
    } else {
        selectionDiv.style.left = `${startX}px`;
    }

    if (height < 0) {
        selectionDiv.style.top = `${e.clientY}px`;
    } else {
        selectionDiv.style.top = `${startY}px`;
    }
}

// On start

// // // TODO: edit context menu spawn to prevent overflow
