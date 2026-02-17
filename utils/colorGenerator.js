const flatUIColors = [
    '#1abc9c', '#16a085', '#2ecc71', '#27ae60',
    '#3498db', '#2980b9', '#9b59b6', '#8e44ad',
    '#e74c3c', '#c0392b', '#e67e22', '#d35400',
    '#f39c12', '#f1c40f', '#ecf0f1', '#95a5a6',
    '#34495e', '#2c3e50'
];

function getRandomColor() {
    return flatUIColors[Math.floor(Math.random() * flatUIColors.length)];
}

function generateFlatUIColor() {
    // Expanded hues for full spectrum coverage (every 30 degrees)
    const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    // Moderate saturations for flat look
    const saturations = [50, 60, 70];
    // Lower lightnesses to avoid luminous/bright colors
    const lightnesses = [35, 40, 45, 50];

    const hue = hues[Math.floor(Math.random() * hues.length)];
    const saturation = saturations[Math.floor(Math.random() * saturations.length)];
    const lightness = lightnesses[Math.floor(Math.random() * lightnesses.length)];

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

module.exports = { getRandomColor, generateFlatUIColor };
