// --- TAB LOGIC ---
function openTab(evt, tabName) {
    // 1. Hide all content sections
    const sections = document.querySelectorAll(".content-section");
    sections.forEach(section => section.style.display = "none");

    // 2. Show the selected section
    const activeSection = document.getElementById(tabName);
    if (activeSection) {
        activeSection.style.display = "block";
        // Reset animation
        activeSection.style.animation = 'none';
        activeSection.offsetHeight; /* trigger reflow */
        activeSection.style.animation = 'fadeIn 0.8s ease';
    }
    
    // 3. Scroll to top (optional UX improvement)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// --- SKETCH MANAGER ---
let currentP5Instance = null;

function changeSketch(sketchName) {
    // 1. Remove the old sketch if it exists
    if (currentP5Instance) {
        currentP5Instance.remove();
    }

    // 2. Instantiate the new sketch
    if (sketchName === 'tree') {
        currentP5Instance = new p5(treeSketch, 'canvas-parent');
        updateHint("Move mouse left/right to sway the wind.");
    } else if (sketchName === 'ripples') {
        currentP5Instance = new p5(rippleSketch, 'canvas-parent');
        updateHint("Click anywhere to create ripples.");
    }
}

function updateHint(text) {
    const hint = document.getElementById('sketch-desc');
    if (hint) hint.innerText = text;
}

// Load default sketch on page load
window.onload = () => {
    // Start with the Tree sketch
    changeSketch('tree');
};
