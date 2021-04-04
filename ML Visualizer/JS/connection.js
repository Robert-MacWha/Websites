class Connection {
    /* Local vars */
    highlighted = false;
    selected = false;
    inX = -1000000;
    inY = -1000000;
    outX = -1000000;
    outY = -1000000;

    constructor (input, output) {

        this.in = input;
        this.out = output;

    }

    render (nodes, p) {

        // find the start pos x/y
        this.inX = nodes[this.in].pos.x + (nodes[this.in].size.x / 2);
        this.inY = nodes[this.in].pos.y + (nodes[this.in].size.y);

        // calculate the bounds of the out rect
        let a = p.createVector(nodes[this.out].pos.x,                         nodes[this.out].pos.y);
        let b = p.createVector(nodes[this.out].pos.x + nodes[this.in].size.x, nodes[this.out].pos.y);
        let c = p.createVector(nodes[this.out].pos.x + nodes[this.in].size.x, nodes[this.out].pos.y + nodes[this.in].size.y);
        let d = p.createVector(nodes[this.out].pos.x,                         nodes[this.out].pos.y + nodes[this.in].size.y);

        // calculate the distance from the start pos to the out rect's 4 sides
        let dAB = this.pDistanceSquared(this.inX, this.inY, a.x, a.y, b.x, b.y);
        let dBC = this.pDistanceSquared(this.inX, this.inY, b.x, b.y, c.x, c.y);
        let dCD = this.pDistanceSquared(this.inX, this.inY, c.x, c.y, d.x, d.y);
        let dDA = this.pDistanceSquared(this.inX, this.inY, d.x, d.y, a.x, a.y);

        let minDist = p.min([dAB, dBC, dCD, dDA]);

        // depending on whate side the start point is closest to, change what side it hits the box on
        if (minDist == dAB) {
            this.outX = nodes[this.out].pos.x + (nodes[this.out].size.x / 2);
            this.outY = nodes[this.out].pos.y;

        } else if (minDist == dBC) {
            this.outX = nodes[this.out].pos.x + nodes[this.out].size.x;
            this.outY = nodes[this.out].pos.y + (nodes[this.out].size.y / 2);

        } else if (minDist == dCD) {
            this.outX = nodes[this.out].pos.x + (nodes[this.out].size.x / 2);
            this.outY = nodes[this.out].pos.y + nodes[this.out].size.y;

        } else {
            this.outX = nodes[this.out].pos.x;
            this.outY = nodes[this.out].pos.y + (nodes[this.out].size.y / 2);
        }

        let base = p.createVector(this.inX, this.inY);
        let dir  = p.createVector(this.outX - this.inX, this.outY - this.inY);
        
        this.drawArrow(base, dir, p);

        // set the highlighted and selected checks to false
        this.highlighted = false;
        this.selected = false;

    }

    // Updates the connection's references after deleting a node, returns true if the connection should be deleted
    updateForDeletedNode (id) {

        if (this.in == id || this.out == id)
            return true;

        if (this.in > id)
            this.in --;

        if (this.out > id)
            this.out --;

    }

    pointIsWithinRange (x, y, r) {
        return this.pDistanceSquared(x, y, this.inX, this.inY, this.outX, this.outY) <= r;
    }

    // returns the distance squared from a point to a list segment
    pDistanceSquared (x, y, x1, y1, x2, y2) {
        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;
      
        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = -1;
        if (len_sq != 0) //in case of 0 length line
            param = dot / len_sq;
      
        var xx, yy;
      
        if (param < 0) {
          xx = x1;
          yy = y1;
        }
        else if (param > 1) {
          xx = x2;
          yy = y2;
        }
        else {
          xx = x1 + param * C;
          yy = y1 + param * D;
        }
      
        var dx = x - xx;
        var dy = y - yy;
        return dx * dx + dy * dy;
    }

    // Draws an arrow from a point [base] in direction [vec] on canvas [p]
    drawArrow (base, vec, p) {
        p.push();
            p.stroke(75);
            p.strokeWeight(2);
            p.fill(75);

            if (this.highlighted) {
                p.stroke(20);
                p.strokeWeight(2);
                p.fill(20);
            }

            if (this.selected) {
                p.stroke(20);
                p.strokeWeight(3);
                p.fill(20);
            }
            
            p.translate(base.x, base.y);
            p.line(0, 0, vec.x, vec.y);

            
            p.rotate(vec.heading());
            let arrowSize = 12;
            p.translate(vec.mag() - arrowSize, 0);
            p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
            //*/
            p.pop();
    }
}