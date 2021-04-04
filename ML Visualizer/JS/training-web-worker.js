this.onmessage = function (e) {

    // Include tensorflow
    importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.10.3');
    tf.setBackend('cpu');

    // Include model class
    importScripts('tf-model.js')

    // Extract the structure from the message
    let structure = e.data._structure;

    // Create a new model with the structure
    this.model = new Model();
    this.model.reset(structure);

    // Extract the canvas dims from the message
    this.canvas_width  = e.data._canvas_width;
    this.canvas_height = e.data._canvas_height;

    // Generate the x_values for calculating pixel color data
    this.pixelX_vals = [];

    for(let i = 0; i < this.canvas_width; i ++) {

        for(let j = 0; j < this.canvas_height; j ++) {

            this.pixelX_vals.push(
                [i / this.canvas_width, j / this.canvas_height]
            );

        }

    }

    // Extract the training data from the messgae
    this.x_vals = e.data._xs;
    this.y_vals = e.data._ys;

    // Begin the training loop
    // this.train();

    while(true) {

        this.train();

    }

}

this.train = function () {

    tf.tidy (() => {

        // Train the model
        this.model.train(this.x_vals, this.y_vals);

        // Get the updated pixel data
        //let pixelData = this.model.predict(this.pixelX_vals).dataSync();

        // Post back to the main thread
        let loss = this.model.test(this.x_vals, this.y_vals);

        this.postMessage({
        
            _loss: loss,
            //_pixel_data: pixelData

        });

    });
}