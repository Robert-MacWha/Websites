/*

// P5 objects, used to display two canvases on the window
let editor_p5;
let graph_p5;

// JS web worker, used to run the model training in parallel
let worker;

// Model used to manage errors with editor node positions (IE handle finding invalid nodes)
let manager_model;

/* ARGs */
let graphPixelDensity = 10;  // divisor for how many pixel brightness values are calculated.  Higher means a lower resolution but a faster preformance

// Event for when the window is resized, resize the two p5 canvases
window.addEventListener('resize', reportWindowSize);

function setup () {
    // Initialize the editor
    editor_p5 = new p5(editor);

    // Initialize the graph
    graph_p5 = new p5(graph);

    // Initialize a web worker
    initializeWebWorker();

    // Initialize the managerial model
    manager_model = new Model();

}

function draw () {
    // See if the editor's model has changed at all
    if (editor_p5.hasChanged) {

        // Update the managerial model
        manager_model.reset(editor_p5.constructStructure());

        // Get all the invalid nodes and pass them to the editor
        let invalidNodes = manager_model.getInvalidNodes(editor_p5.nodes);

        editor_p5.updateInvalidNodes(invalidNodes);

    }
}

function reportWindowSize() {
    // Resize the two p5 objects
    editor_p5.resize();
    graph_p5.resize();

    // Terminate the old web worker
    worker.terminate();

    // Create a new worker
    initializeWebWorker();
}

function keyPressed () {

    if (key == "d") {

        // Terminate the old web worker
        worker.terminate();

        // Create a new worker
        initializeWebWorker();

    }

}

function initializeWebWorker () {
    // Initialize the web worker object
    worker = new Worker("JS/training-web-worker.js");

    // Initialize the message for the web worker
    let message = {

        _structure: editor_p5.constructStructure(),
        _canvas_width: graph_p5.width,
        _canvas_height: graph_p5.height,
        _xs: dataset_linear_xs,
        _ys: dataset_linear_ys

    }

    // Send the message to the worker
    worker.postMessage(message);

    // On receiving the message, push the updated pixel data to the graph_p5 canvas 
    worker.onmessage = (result) => {

        console.log(result.data._loss);
        
        /*
        graph_p5.updateCanvas(
            result.data._pixel_data,
            dataset_diagonals_xs,
            dataset_diagonay_ys
            );
        */ 

    };

}