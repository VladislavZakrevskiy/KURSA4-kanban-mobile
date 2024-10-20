export function getRandomBrightColor() {
    // Generate random values for red, green, and blue channels
    const r = Math.floor(Math.random() * 128) + 127; // 127 to 255 for brightness
    const g = Math.floor(Math.random() * 128) + 127; // 127 to 255 for brightness
    const b = Math.floor(Math.random() * 128) + 127; // 127 to 255 for brightness
    
    // Return the color in hex format
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

