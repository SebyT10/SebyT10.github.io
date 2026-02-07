// --- SKETCH MANAGER ---
let currentP5Instance = null;

function changeSketch(sketchName) {
    // SAFETY CHECK: 
    // If we are on the "About" or "Projects" page, this element won't exist.
    // We stop the function here to prevent errors.
    const container = document.getElementById('canvas-parent');
    if (!container) return;

    // 1. Remove the old sketch if it exists (prevents memory leaks)
    if (currentP5Instance) {
        currentP5Instance.remove();
    }

    // 2. Instantiate the new sketch
    // (This assumes treeSketch and rippleSketch are defined in your other JS files)
    if (sketchName === 'tree') {
        // Check if the sketch function actually exists before running
        if (typeof treeSketch !== 'undefined') {
            currentP5Instance = new p5(treeSketch, 'canvas-parent');
            updateHint("Move mouse left/right to sway the wind.");
        }
    } else if (sketchName === 'ripples') {
        if (typeof rippleSketch !== 'undefined') {
            currentP5Instance = new p5(rippleSketch, 'canvas-parent');
            updateHint("Click anywhere to create ripples.");
        }
    }
}

function updateHint(text) {
    const hint = document.getElementById('sketch-desc');
    if (hint) hint.innerText = text;
}

// --- INITIALIZATION ---
// Use DOMContentLoaded to ensure HTML is ready
document.addEventListener('DOMContentLoaded', () => {
    
    // Only attempt to load the default sketch if we are on the Sketches page
    if (document.getElementById('canvas-parent')) {
        changeSketch('tree');
    }

});