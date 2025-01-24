// Canvas setup
const canvas = document.getElementById('preview-canvas');
const ctx = canvas.getContext('2d');
let selectedElement = null;

function resizeCanvas() {
    const container = document.getElementById('canvas-container');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    drawCanvas();
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Add grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.type || ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const type = ev.dataTransfer.getData("text");
    if (type.startsWith('element-')) {
        // Move existing element
        const element = document.getElementById(type);
        element.style.left = `${ev.clientX - ev.target.getBoundingClientRect().left}px`;
        element.style.top = `${ev.clientY - ev.target.getBoundingClientRect().top}px`;
    } else {
        // Create new element
        addElement(type, ev.clientX, ev.clientY);
    }
}

function addElement(type, x, y) {
    const preview = document.getElementById('preview');
    let element;

    switch(type) {
        case 'h1':
            element = document.createElement('h1');
            element.textContent = 'Heading';
            break;
        case 'p':
            element = document.createElement('p');
            element.textContent = 'Paragraph text';
            break;
        case 'img':
            element = document.createElement('img');
            element.src = 'https://via.placeholder.com/150';
            element.alt = 'Placeholder image';
            break;
    }

    element.className = 'preview-element';
    element.style.left = `${x - preview.getBoundingClientRect().left}px`;
    element.style.top = `${y - preview.getBoundingClientRect().top}px`;
    element.id = `element-${Date.now()}`; // Unique ID for each element

    element.onclick = function(e) {
        e.stopPropagation();
        selectElement(this);
    };

    element.draggable = true;
    element.ondragstart = drag;

    preview.appendChild(element);
    selectElement(element);
}

function selectElement(element) {
    if (selectedElement) {
        selectedElement.classList.remove('selected');
    }
    element.classList.add('selected');
    selectedElement = element;
    updateProperties();
}

function updateProperties() {
    if (selectedElement) {
        document.getElementById('elementText').value = selectedElement.textContent || '';
        document.getElementById('elementColor').value = rgb2hex(selectedElement.style.color || '#000000');
        document.getElementById('elementSize').value = parseInt(selectedElement.style.fontSize) || 16;
    }
}

function applyProperties() {
    if (selectedElement) {
        if (selectedElement.tagName !== 'IMG') {
            selectedElement.textContent = document.getElementById('elementText').value;
        }
        selectedElement.style.color = document.getElementById('elementColor').value;
        selectedElement.style.fontSize = `${document.getElementById('elementSize').value}px`;
    }
}

function rgb2hex(rgb) {
    if (rgb.search("rgb") == -1) return rgb;
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

// Initialize drag events for toolbar items
document.querySelectorAll('.draggable').forEach(item => {
    item.ondragstart = drag;
});

// Deselect elements when clicking on the preview area
document.getElementById('preview').onclick = function(e) {
    if (e.target === this) {
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            selectedElement = null;
        }
    }
};

// Initial canvas draw
drawCanvas();
