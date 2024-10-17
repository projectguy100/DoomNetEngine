let selectedElement = null;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.type);
}

function drop(ev) {
    ev.preventDefault();
    const type = ev.dataTransfer.getData("text");
    addElement(type, ev.clientX, ev.clientY);
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
    element.style.position = 'absolute';
    element.style.left = `${x - preview.getBoundingClientRect().left}px`;
    element.style.top = `${y - preview.getBoundingClientRect().top}px`;

    element.onclick = function(e) {
        e.stopPropagation();
        if (selectedElement) {
            selectedElement.classList.remove('selected');
        }
        this.classList.add('selected');
        selectedElement = this;
        updateProperties();
    };

    element.draggable = true;
    element.ondragstart = drag;

    preview.appendChild(element);
}

function updateProperties() {
    if (selectedElement) {
        document.getElementById('elementText').value = selectedElement.textContent || '';
        document.getElementById('elementColor').value = rgb2hex(selectedElement.style.color);
        document.getElementById('elementSize').value = parseInt(selectedElement.style.fontSize) || 16;
    }
}

function applyProperties() {
    if (selectedElement) {
        selectedElement.textContent = document.getElementById('elementText').value;
        selectedElement.style.color = document.getElementById('elementColor').value;
        selectedElement.style.fontSize = document.getElementById('elementSize').value + 'px';
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
document.getElementById('preview').onclick = function() {
    if (selectedElement) {
        selectedElement.classList.remove('selected');
        selectedElement = null;
    }
};
