let currentP5;

// Function to switch sketches
function changeSketch(sketchName) {
    // 1. Remove the old sketch if it exists
    if (currentP5) {
        currentP5.remove();
    }

    // 2. Load the new sketch based on the selection
    if (sketchName === 'tree') {
        currentP5 = new p5(treeSketch, 'canvas-parent');
        document.getElementById('sketch-desc').innerText = "Move mouse to sway the branches.";
    } else if (sketchName === 'ripples') {
        currentP5 = new p5(rippleSketch, 'canvas-parent');
        document.getElementById('sketch-desc').innerText = "Click to drop a pebble in the water.";
    }
}

// Load the first sketch by default when the page opens
window.onload = () => {
    changeSketch('tree');
};
