// script.js

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('snowfall-container');
    const numberOfSnowflakes = 100;  // Number of snowflakes

    // Create snowflakes
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Set random size (between 5px to 10px)
        const size = Math.random() * 5 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        // Set random position (x axis from 0% to 100%)
        const startPosX = Math.random() * 100;
        snowflake.style.left = `${startPosX}%`;

        // Set random fall speed (slower speed for bigger flakes)
        const fallSpeed = Math.random() * 3 + 2;
        snowflake.style.animationDuration = `${fallSpeed + 5}s`;  // Add more time to slow it down

        // Randomize the snowflakes direction (horizontal movement)
        const direction = Math.random() * 2 - 1; // Random between -1 and 1
        snowflake.style.animationName = 'fall';
        snowflake.style.animationTimingFunction = `ease-in`;

        container.appendChild(snowflake);

        // Add a random delay to start animation at different times
        const delay = Math.random() * 5;
        snowflake.style.animationDelay = `${delay}s`;

        // Log to make sure snowflakes are created
        console.log('Snowflake created:', snowflake);
    }
});