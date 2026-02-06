const rippleSketch = (p) => {
    let ripples = [];

    p.setup = () => {
        let cnv = p.createCanvas(600, 400);
        cnv.parent('canvas-parent');
    };

    p.draw = () => {
        p.background(250, 247, 242);
        
        for (let i = ripples.length - 1; i >= 0; i--) {
            ripples[i].display();
            ripples[i].update();
            if (ripples[i].alpha <= 0) ripples.splice(i, 1);
        }
    };

    p.mousePressed = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            ripples.push(new Ripple(p.mouseX, p.mouseY));
        }
    };

    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.r = 0;
            this.alpha = 255;
        }
        update() {
            this.r += 2;
            this.alpha -= 3;
        }
        display() {
            p.noFill();
            p.stroke(148, 166, 132, this.alpha); // Sage
            p.strokeWeight(2);
            p.ellipse(this.x, this.y, this.r);
        }
    }
};
