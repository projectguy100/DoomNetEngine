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
