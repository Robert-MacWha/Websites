class Node {
    /* Local vars */
    highlighted = false;
    selected = false;
    connectionPointHighlighted = false;

    isInvalid = false;

    //Pass in the position and size of the node allong with a p5 object
    constructor (x, y, w, h, type, p) {
        this.p = p;

        this.pos  = this.p.createVector(x, y);
        this.size = this.p.createVector(w, h);
        this.type = type;
    }

    // Renders the node allong with it's name
    render (newP) {
        this.p = newP;
        let p = this.p;

        p.push();

            // Draw the main rect
            p.fill(255);
            p.stroke(75);
            p.strokeWeight(2);

            if (this.highlighted) { p.stroke(20); }
            if (this.selected) { p.stroke(20); p.strokeWeight(3); }
            if (this.isInvalid) { p.strokeWeight(3); p.stroke(242, 84, 73); }

            if (this.type == 3) { p.drawingContext.setLineDash([5, 5]); }

            p.rect(this.pos.x, this.pos.y, this.size.x, this.size.y, 5);

            p.drawingContext.setLineDash([]);

            // Draw the connection point if the object is selected and not a output node
            if (this.selected && this.type != 2) {
                p.ellipseMode(p.CENTER);
                p.fill(20);
                p.noStroke();

                p.ellipse(
                    this.pos.x + this.size.x / 2,
                    this.pos.y + this.size.y,
                    10,
                    10
                );
            }

            // Write the node's type
            p.fill(20);
            p.strokeWeight(0.5);
            p.stroke(20);
            p.textSize(17);
            p.textAlign(p.CENTER);

            let textX = this.pos.x + (this.size.x / 2);
            let textY = this.pos.y + (this.size.y / 1.7);

            p.text(this.nameFromType(), textX, textY);

        p.pop();

        // set the highlighted checks to false
        this.highlighted = false;
        this.selected = false;
        this.connectionPointHighlighted = false;
    }

    // Scale the postion of the node to remain in the same relitive position when the canvas is scaled
    scalePosition (newP, oldW, oldH) {
        this.p = newP;
        let p = this.p;

        this.pos.x /= oldW;
        this.pos.x *= p.width;

        this.pos.y /= oldH;
        this.pos.y *= p.height;

        this.clamp();
    }

    // Moves the node to a new position
    updatePosition (newX, newY) {
        this.pos.x = newX;
        this.pos.y = newY;

        this.clamp();
    }

    // Returns whether a point is within the node's bounds
    pointIsInRect (x, y) {
        let x1 = this.pos.x - 5;
        let y1 = this.pos.y - 5;
        let x2 = this.pos.x + this.size.x + 5;
        let y2 = this.pos.y + this.size.y + 5;

        return (x > x1 && x < x2 && y > y1 && y < y2);
    }

    // Returns whether a point is within range x of the node's connection point
    pointIsInConnectionPoint(x, y) {

        let dSq = this.distSquared(x, y, 
            this.pos.x + this.size.x / 2,
            this.pos.y + this.size.y);

        return dSq < 50;

    }

    distSquared (x1, y1, x2, y2) {
        return ((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2));
    }

    nameFromType () {
        let out = "";

        if (this.type == 1) {
            out = "Input";
        } 
        else if (this.type == 2) {
            out = "Output";
        }
        else if (this.type == 3) {
            out = "Calculation"
        }
        else {
            out = "Error"
        }

        return out;
    }

    // Clamps the position of the node to within the canvas
    clamp () {
        let p = this.p;

        let maxX = p.width - this.size.x;
        let maxY = p.height - this.size.y;

        this.pos.x = p.constrain(this.pos.x, 0, maxX);
        this.pos.y = p.constrain(this.pos.y, 0, maxY);
    }
}