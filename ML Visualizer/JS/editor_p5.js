/* 
P5 editor object.  The editor function is responsible for:
 - Allowing the user to manipulate the nodes and connections
*/

function editor (p) {
    /* ARGs */
    p.defaultCanvasSize = p.createVector(1000, 1000);

    p.defaultNodes = [
        new Node(50, 50, 100, 50, 1, p),       // Input node
        new Node(300, 50, 100, 50, 1, p),      // Input node
        new Node(50, 450, 100, 50, 3, p),      // Hidden node in Center left
        new Node(50, 950, 100, 50, 2, p),      // Input node in Bottom left corner
    ];

    p.defaultConnections = [
        new Connection(0, 2),
        new Connection(1, 2),
        new Connection(2, 3)
    ];

    p.parent = "editor-container";

    p.graphLineRatio = 25;  /* The # of lines on the graph will be the canvas's width divided by this */
    p.graphLineWeight = 1;

    /* Local vars */
    p.hNode       = -1;     /* Nodes */
    p.hConnection = -1;     /* Connections */
    p.hAttachment = -1;     /* Connection points (origin for connections) */

    p.sNode       = -1;
    p.sConnection = -1;
    p.sAttachment = -1;

    p.movingNode = false;
    p.makingConnection = false;
    p.hasChanged = false;

    p.setup = function () {

        // initialize the nodes and connections lists
        p.nodes = p.defaultNodes;
        p.connections = p.defaultConnections;

        // create editor's canvas with the correct size and parent
        p.canvas = p.createCanvas(p.defaultCanvasSize.x, p.defaultCanvasSize.y);
        p.canvas.parent("#" + p.parent);
        p.resize();

        p.hasChanged = true;

    }

    p.draw = function () {

        p.background(255);
        p.cursor("auto");

        p.update();

        p.drawGrid();
        p.drawConnections();
        
        if (p.makingConnection) {
            p.drawConnectionLine(
                p.createVector(
                    p.nodes[p.sAttachment].pos.x + (p.nodes[p.sAttachment].size.x / 2),
                    p.nodes[p.sAttachment].pos.y +  p.nodes[p.sAttachment].size.y
                ), 
                p.createVector(
                    p.mouseX - (p.nodes[p.sAttachment].pos.x + (p.nodes[p.sAttachment].size.x / 2)),
                    p.mouseY - (p.nodes[p.sAttachment].pos.y +  p.nodes[p.sAttachment].size.y),
                )
            );
        }

        p.drawNodes();

    }

    p.update = function () {

        // Find what object (if any) is highlighted and highlight it
        let highlights = p.getHighlightedObject();

        p.hNode = highlights.x;
        p.hConnection = highlights.y;
        p.hAttachment = highlights.z;

        // Visualty signify what object is highlighted by changing the cursor and making it as highlighted / selected
        if (p.hNode != -1) {
            p.cursor("pointer");
            p.nodes[p.hNode].highlighted = true;
        }

        if (p.hConnection != -1 && p.makingConnection == false) {  // only highlight other connections when not making a connection
            p.cursor("pointer");
            p.connections[p.hConnection].highlighted = true;
        }

        if (p.movingNode) {
            p.cursor("grabbing");
        }

        if (p.hAttachment != -1) {
            p.cursor("grab");
            p.nodes[p.hAttachment].connectionPointHighlighted = true;
        }

        if (p.makingConnection) {
            p.cursor("grabbing");
        }
        
        if (p.sNode != -1) {
            p.nodes[p.sNode].selected = true;
        }

        if (p.sConnection != -1) {
            p.connections[p.sConnection].selected = true;
        }

        // if moving is enabled move the selected node
        if (p.movingNode) {
            p.nodes[p.sNode].updatePosition(p.mouseX - p.relativeMouseToNodePosition.x, p.mouseY - p.relativeMouseToNodePosition.y);
        }

    }

    p.mousePressed = function () {

        // Deselect everything
        p.sNode = -1;
        p.sConnection = -1;
        p.sAttachment = -1;

        // If a node is highlighted, select it and allow the movement of it
        if (p.hNode != -1) {
            p.sNode = p.hNode;

            p.movingNode = true;
            p.relativeMouseToNodePosition = p.createVector(
               p.mouseX - p.nodes[p.sNode].pos.x,
               p.mouseY - p.nodes[p.sNode].pos.y
            );

            return;
        }

        // If a connection is highlighted, select it
        if (p.hConnection != -1) {
            p.sConnection = p.hConnection;

            return;
        }

        // If a connection point is highlighted, select it and begin making a new connection
        if (p.hAttachment != -1) {
            p.sAttachment = p.hAttachment;
            
            p.makingConnection = true;
        }

    }

    p.mouseReleased = function () {

        // Disable the moving of nodes
        p.movingNode = false;

        // If the user was creating a new connection, see if that connection is valid
        if (p.makingConnection) {
            
            if (p.hNode != -1 && p.sAttachment != p.hNode && p.nodes[p.hNode].type != 1) { /* Is there a highlighted node, is it different that the selected one, and is it not of type input */
                
                // Create a new connection between the selected node and the highlighted node
                let newConnection = new Connection(p.sAttachment, p.hNode, p);

                // Make sure the new connection is unique
                let unique = true;
                for(let i = 0; i < p.connections.length; i ++) {

                    if (p.connections[i].in == p.sAttachment && p.connections[i].out == p.hNode) { /* If there is a connection with the same in.out node IDs then the connection is not unique */
                        console.log("Not unique");
                        unique = false;
                    }

                }

                // Add the connection to the list of connections if it's unique
                if (unique) {
                    p.connections.push(newConnection);
                    
                    // Also mark the editor as having changed for the sketch to pick up on
                    p.hasChanged = true;
                }

            }

        }

        // Disable the making of connections
        p.makingConnection = false;

    }

    p.doubleClicked = function () {
        
        // See if the mouse is over a node
        if (p.hNode != -1) {
            // Delete the node
            p.deleteNode(p.hNode);

            // Reset the highlight and selection vars
            p.hNode = -1;
            p.sNode = -1;

            // Mark the editor as having changed
            p.hasChanged = true;

            return;
        }

        // See if the mouse is over a connection
        if (p.hConnection != -1) {
            // Delete the connection
            p.connections.splice(p.hConnection, 1);

            p.hConnection = -1;
            p.sConnection = -1;

            // Mark the editor as having changed
            p.hasChanged = true;

            return;
        }

        // See if the mouse is within the canvas bounds
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            // Create a new node
            p.nodes.push(new Node(0, 0, 100, 50, 3, p));
            
            // Move it to the mouse' position
            p.nodes[p.nodes.length - 1].updatePosition(p.mouseX - 50, p.mouseY - 20);
            
            // Select it
            p.sNode = p.nodes.length - 1;

            // Mark the editor as having changed
            p.hasChanged = true;

            return;
        }

    }

    p.keyPressed = function () {

        if (p.keyCode == "32") {                            // If the key pressed was the space bar
            
            // Create a new node hidden under the mouse cursor (if it's on the canvas)
            if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
                // Create a new node
                p.nodes.push(new Node(0, 0, 100, 50, 3, p));
                
                // Move it to the mouse' position
                p.nodes[p.nodes.length - 1].updatePosition(p.mouseX - 50, p.mouseY - 20);
                
                // Select it
                p.sNode = p.nodes.length - 1;
    
                // Mark the editor as having changed
                p.hasChanged = true;
    
                return;
            }

        } else if (p.keyCode == "8" || p.keyCode == "46") { // If the key pressed was the backspace or delete key

            // If a node is selected, delete it
            if (p.sNode != -1) {
                p.deleteNode(p.sNode);

                // Mark the editor as having changed
                p.hasChanged = true;
            }

            // If a connection is selected, delete it
            if (p.sConnection != -1) {
                p.connections.splice(p.sConnection, 1);

                // Mark the editor as having changed
                p.hasChanged = true;
            }

            p.sNode = -1;
            p.sConnection = -1;

        }

    }

    p.updateInvalidNodes = function (invalidNodes) {

        for(let i = 0; i < p.nodes.length; i ++) {
            p.nodes[i].isInvalid = invalidNodes.includes(i);
        }

    }

    // Converts the list of nodes and connections into a structure list that is usable in the tf-model
    p.constructStructure = function () {

        let structure = [];

        // Loop over all the nodes
        for(let i = 0; i < p.nodes.length; i ++) {

            // Loop over each connection and see which ones output to this node
            let inputIDs = [];
            let inputWeightIDs = [];
            for(let j = 0; j < p.connections.length; j ++) {
                if (p.connections[j].out == i) {
                    // push the id of the input node to the the inputIDs list
                    inputIDs.push(p.connections[j].in);
                    inputWeightIDs.push(j);
                }
            }

            // Create a node object containing both the list of inputs, a variable to store it's value, and a bool for recognising if it's been updated
            let newNode = {
                type: p.nodes[i].type,
                value: 0,
                activated: false,
                inputs: inputIDs,
                inputWeights: inputWeightIDs
            }

            structure.push(newNode);

        }

        return structure;
    }

    p.getHighlightedObject = function () {

        // If there is a selected node, see if it's connection point is highlighted
        if (p.sNode != -1 && p.nodes[p.sNode].pointIsInConnectionPoint(p.mouseX, p.mouseY)) {
            return p.createVector(-1, -1, p.sNode);
        }

        // Loop over all the nodes and see if one of them is highlighted
        for(let i = 0; i < p.nodes.length; i ++) {
            if (p.nodes[i].pointIsInRect(p.mouseX, p.mouseY)) {
                return p.createVector(i, -1, -1);
            }
        }

        // Loop over all the connections and see if one of them is highlighted
        for(let i = 0; i < p.connections.length; i ++) {
            if(p.connections[i].pointIsWithinRange(p.mouseX, p.mouseY, 50)) {
                return p.createVector(-1, i, -1);
            }
        }

        return p.createVector(-1, -1, -1);

    }

    // Draws all the graph lines.  No functional purpose, simply to add a sense of space to the editor 
    p.drawGrid = function () {

        p.push();

            p.stroke(225);
            p.strokeWeight(p.graphLineWeight);

            // X-axis
            for(let i = 0; i < p.graphLineCount; i ++) {
                let x = (i / p.graphLineCount) * p.width;
                p.line(x, 0, x, p.height);
            }

            // Y-axis
            for(let i = 0; i <= p.graphLineCount; i ++) {
                let y = (i / p.graphLineCount) * p.height;
                p.line(0, y, p.width, y);
            }

        p.pop();

    }

    // Draws all connections
    p.drawConnections = function () {
        
        for(let i = 0; i < p.connections.length; i ++) {
            p.connections[i].render(p.nodes, p);
        }

    }

    // Draws all the nodes
    p.drawNodes = function () {

        for(let i = 0; i < p.nodes.length; i ++) {
            p.nodes[i].render(p);
        }

    }

    // Draw a connection line from a given position in a given direction.  Used when making connections to preview the new connection
    p.drawConnectionLine = function (base, dir) {

        p.push();

            p.stroke(75);
            p.strokeWeight(2);
            p.fill(75);
            
            p.translate(base.x, base.y);
            p.line(0, 0, dir.x, dir.y);
            
            p.rotate(dir.heading());
            let arrowSize = 7;
            p.translate(dir.mag() - arrowSize, 0);
            p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);

        p.pop();

    }

    // Deletes a node at a given index I
    p.deleteNode = function (i) {

        // Make sure the node's type is hidden
        if (p.nodes[i].type != 3) 
            return;

        // Splice the node from the nodes list
        p.nodes.splice(i, 1);

        // When a node is deleted, the references of all connections need to be updated
        for(let j = p.connections.length - 1; j >= 0; j --) {
            
            if (p.connections[j].updateForDeletedNode(i)) {
                p.connections.splice(j, 1);
            }
        }

    }

    // Resizes the editor's canvas to be the width of its container
    p.resize = function () {
        let canvasStyle = getComputedStyle(document.getElementById(p.parent));

        let newCanvasWidth = document.getElementById(p.parent).clientWidth;                                // width with padding
        newCanvasWidth -= parseFloat(canvasStyle.paddingLeft) + parseFloat(canvasStyle.paddingRight);      // removes padding from measure

        // The height of the canvas is the same as its width
        let newCanvasHeight = newCanvasWidth;

        // Save the old canvas w/h for scaling the node positions
        let oldW = p.width; 
        let oldH = p.height;

        // Resize the canvas
        p.resizeCanvas(newCanvasWidth, newCanvasHeight);

        // Scale the positions of the nodes
        for(let i = 0; i < p.nodes.length; i ++) {
            p.nodes[i].scalePosition(p, oldW, oldH);
        }

        // Change the # of graph lindes
        p.graphLineCount = p.floor(newCanvasWidth / 25);

    }
}