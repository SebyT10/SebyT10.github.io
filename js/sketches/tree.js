const treeSketch = (p) => {
    p.setup = () => {
        let cnv = p.createCanvas(600, 300);
        cnv.parent('canvas-parent'); // Attach to div
        p.noLoop();
    };

    p.draw = () => {
        p.background(255); // White background
        p.stroke(148, 166, 132); // Sage Green
        p.translate(p.width / 2, p.height);
        branch(80);
    };

    p.mouseMoved = () => {
        p.redraw();
    };

    function branch(len) {
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        if (len > 4) {
            p.push();
            p.rotate(p.mouseX / 200); // Interaction
            branch(len * 0.67);
            p.pop();
            p.push();
            p.rotate(-p.mouseX / 200); // Interaction
            branch(len * 0.67);
            p.pop();
        }
    }
};
