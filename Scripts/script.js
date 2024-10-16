document.addEventListener('DOMContentLoaded', () => {
    const tools = document.querySelectorAll('.tool');
    const canvas = document.getElementById('canvas');

    tools.forEach(tool => {
        tool.addEventListener('click', addElement);
    });

    function addElement(e) {
        const type = e.target.dataset.type;
        const element = createElement(type);
        canvas.appendChild(element);
    }

    function createElement(type) {
        const element = document.createElement('div');
        element.classList.add('canvas-element');

        switch (type) {
            case 'heading':
                element.innerHTML = '<h2>New Heading</h2>';
                break;
            case 'paragraph':
                element.innerHTML = '<p>New paragraph text.</p>';
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
});
