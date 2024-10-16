document.addEventListener('DOMContentLoaded', () => {
    const tools = document.querySelectorAll('.tool');
    const canvas = document.getElementById('canvas');

    tools.forEach(tool => {
        tool.addEventListener('dragstart', dragStart);
    });

    canvas.addEventListener('dragover', dragOver);
    canvas.addEventListener('drop', drop);

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.type);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const type = e.dataTransfer.getData('text');
        const element = createElement(type);
        canvas.appendChild(element);
    }

    function createElement(type) {
        const element = document.createElement('div');
        element.classList.add('canvas-element');
        element.draggable = true;
        element.addEventListener('dragstart', elementDragStart);

        switch (type) {
            case 'heading':
                element.innerHTML = '<h2 contenteditable="true">New Heading</h2>';
                break;
            case 'paragraph':
                element.innerHTML = '<p contenteditable="true">New paragraph text.</p>';
                break;
            case 'image':
                element.innerHTML = '<img src="https://via.placeholder.com/150" alt="Placeholder Image">';
                break;
            case 'button':
                element.innerHTML = '<button>New Button</button>';
                break;
        }

        return element;
    }

    function elementDragStart(e) {
        e.dataTransfer.setData('text/plain', 'move');
        e.target.id = 'dragging';
    }

    canvas.addEventListener('dragover', canvasDragOver);
    canvas.addEventListener('drop', canvasDrop);

    function canvasDragOver(e) {
        e.preventDefault();
        const draggingElement = document.getElementById('dragging');
        if (draggingElement) {
            const afterElement = getDragAfterElement(canvas, e.clientY);
            if (afterElement == null) {
                canvas.appendChild(draggingElement);
            } else {
                canvas.insertBefore(draggingElement, afterElement);
            }
        }
    }

    function canvasDrop(e) {
        const draggingElement = document.getElementById('dragging');
        if (draggingElement) {
            draggingElement.removeAttribute('id');
        }
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.canvas-element:not(#dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
