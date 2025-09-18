// Right Click

const customMenu = document.getElementById('custom-menu');

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    if (e.clientY < 31) {return}

    const posX = e.clientX;
    const posY = e.clientY;

    customMenu.style.left = `${posX}px`;
    customMenu.style.top = `${posY}px`;

    customMenu.style.display = 'block';
});

document.addEventListener('click', function (e) {
    if (e.button !== 2) {
        customMenu.style.display = 'none';
    }
});

// TopBar Items

// // Time & Notifications

const elementDiv = document.getElementById('notification-window');
const timeDiv = document.getElementById('time');
var _isNotificationsOpen = false;

function openNotifications(e) {
    if (_isNotificationsOpen) {return}
    
    elementDiv.style.height = `${window.innerHeight/2}px`;

    document.addEventListener('click', closeNotifications);
    timeDiv.removeEventListener('click', openNotifications);
    
    e.stopPropagation();
    
    timeDiv.style.backgroundColor = 'rgba(150, 150, 150, 0.5)';
    
    _isNotificationsOpen = true;
    
    elementDiv.classList.remove('disappear');
    elementDiv.classList.add('appear');
}

function closeNotifications(e) {
    if (!_isNotificationsOpen) {return}

    //if (e.target in elementDiv.children) {return} // to fix // TODO
    
    document.removeEventListener('click', closeNotifications);
    timeDiv.addEventListener('click', openNotifications);
    
    e.stopPropagation();
    
    timeDiv.style.backgroundColor = '';
    
    _isNotificationsOpen = false;
    
    elementDiv.classList.remove('appear');
    elementDiv.classList.add('disappear');
}

timeDiv.addEventListener('click', openNotifications);

// Desktop Selection

const selectionDiv = document.getElementById('selection');

let startX, startY;

document.addEventListener('mousedown', function(e) {

    if (e.clientY <= 31) {return} // Prevent on Top


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
