/* 
P5 graph object.  The graph function is responsible for:
 - Displaying both the training data and the results from the model
*/

function graph (p) {
    /* Args */
    p.defaultCanvasSize = p.createVector(1000, 1000);
    p.parent = "graph-container";

    p.setup = function () {
        
        // Create the graph's canvas with the correct size and parent
        p.canvas = p.createCanvas(p.defaultCanvasSize.x, p.defaultCanvasSize.y);
        p.canvas.parent("#" + p.parent);
        p.resize();
        p.background(255);

        p.background(255);

    }

    // Resizes the editor's canvas to be the width of its container
    p.resize = function () {

        let canvasStyle = getComputedStyle(document.getElementById(p.parent));

        let newCanvasWidth = document.getElementById(p.parent).clientWidth;                                // width with padding
        newCanvasWidth -= parseFloat(canvasStyle.paddingLeft) + parseFloat(canvasStyle.paddingRight);      // removes padding from measure

        // The height of the canvas is the same as its width
        let newCanvasHeight = newCanvasWidth;

        // Resize the canvas
        p.resizeCanvas(newCanvasWidth, newCanvasHeight);

        p.background(255);

    }

    p.updateCanvas = function (pixelData, dataset_xs, dataset_ys) {

        // load the pixels
        p.loadPixels();

        // Escape if the number of given pixels is different from the required number of pixels
        if (pixelData.length != p.pixels.length / 4) {
            return;
        }

        for(let i = 0; i < p.pixels.length; i += 4) {

            p.pixels[i + 0] = 200 - (pixelData[i / 4] * 100);
            p.pixels[i + 1] = 100;
            p.pixels[i + 2] = 100 + (pixelData[i / 4] * 100);

        }

        // Update pixels
        p.updatePixels();

        p.stroke(255);
        p.strokeWeight(0.5);

        let pointW = floor(p.width / 75);

        // Render datapoints
        for(let i = 0; i < dataset_xs.length; i ++) {

            if (dataset_ys[i] == 0) { p.fill(200, 100, 100); } 
            else { p.fill(100, 100, 200); }

            let x = dataset_xs[i][0] * p.width;
            let y = dataset_xs[i][1] * p.height;

            p.ellipse(x, y, pointW, pointW);

        }

    }

}