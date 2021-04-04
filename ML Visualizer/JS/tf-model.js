/*
Reset:
 - Dispose of old tensors
 - Create list of node objects containing a list of their inputs and a var as their value
 - Determin the order that the nodes are activated in when predicting
*/

class Model {
    inputNodes = [];       // List of all nodes that are of type input
    outptuNodes = [];      // List of all nodes that are of type output
    activationOrder = [];  // The order in which the model's nodes must be activated in

    optimizer;             // Optimizer used to fit the model

    constructor () {

        this.biases = [];
        this.weights = [];

    }

    // Disposes of the old model and re-initialized it with a new structure
    reset (structure) {

        this.disposeOldModel();

        this.structure = structure;

        this.determinActivationOrder();

        this.optimizer = tf.train.adam(0.5);

        // Create a list of scalers as the biases for all the nodes
        this.biases = [];
        for(let i = 0; i < structure.length; i ++) {

            this.biases.push(tf.variable(tf.scalar(
                Math.random() * 2 - 1
            )));

        }

        // Create a list of scalers as the weights for all the connections
        this.weights = [];
        for(let i = 0; i < structure.length; i ++) {

            for(let j = 0; j < structure[i].inputs.length; j ++) {

                this.weights.push(tf.variable(tf.scalar(
                    Math.random() * 2 - 1
                )));

            }
        }

    }
    
    /*
    INFO:
     - Prediction function takes in a 2d array.  The 2d array is comprised of a list of 1d x/y pos pairs.  
     - This predict function is meant to evaluate density maps (IE what is density at point x, y, think classification of points on a graph)
     - Because of this, the output function is a 1d array of the densities at the given points
    REMEMBER TO USE TF.TIDY ARROUND THIS FUNCTION
    */
    predict (x_vals) {

        // Convert input from 2d array to tensor2D
        const xs = tf.tensor2d(x_vals); 

        // Assign the values of all input nodes
        for(let i = 0; i < this.inputNodes.length; i ++) {

            let nodeID = this.inputNodes[i];
            this.structure[nodeID].value = xs.gather(tf.scalar(i, "int32"), 1);

        }

        // Loop over each node in the pre-computer order
        for(let i = 0; i < this.activationOrder.length; i ++) {

            let nodeID = this.activationOrder[i];

            // Set the value of the current node to the sum of it's input nodes' values times their coresponding weights plus the node's bias (y = [x1*w1 + x2*w2 + x3*w3... + b])
            let nodeValue = this.biases[nodeID];
            for(let j = 0; j < this.structure[nodeID].inputs.length; j ++) {

                // v is equal to the node input [j]'s value times the node's weight [j]'s value
                let x = this.structure[this.structure[nodeID].inputs[j]].value;
                let w = this.weights[this.structure[nodeID].inputWeights[j]];

                let v = x.mul(w);

                nodeValue = nodeValue.add(v);

            }

            // Apply the activation function to the resulting value and save it to the structure
            this.structure[nodeID].value = nodeValue.sigmoid();

        }

        // Get the values from the output nodes
        let ys = this.structure[this.outptuNodes[0]].value;
        for(let i = 1; i < this.outptuNodes.length; i ++) {

            ys.concat(this.structure[i].value, 0);

        }

        return ys;
    }

    // Loss function for training process (Mean squared error)
    loss (pred, lables) {

        let mse = pred.squaredDifference(lables).mean();
        return mse;

    }

    // Trains the model on some given Xs and Ys
    train (x_vals, y_vals) {
        
        tf.tidy(() => {

            // Converts the list of y_vals into a 1d tensor
            const ys = tf.tensor2d(y_vals);

            this.optimizer.minimize(() => {

                return this.loss(this.predict(x_vals), ys)

            });

        });

    }

    // Gets the model's loss
    test (x_vals, y_vals) {

        let loss;
        
        tf.tidy(() => {

            // Converts the list of y_vals into a 1d tensor
            const ys = tf.tensor2d(y_vals);

            loss = this.loss(this.predict(x_vals), ys);

            loss = loss.dataSync()[0];

        });

        return loss;
    }

    // Finds all invalid nodes in the model's structure
    getInvalidNodes (nodes) {

        let invalidNodes = [];
        for(let i = 0; i < nodes.length; i ++) {
            if (!this.activationOrder.includes(i) && this.structure[i].type == 3) {
                invalidNodes.push(i);
            }
        }

        return invalidNodes;

    }

    // Prints a summary of the model's structure
    summary () {

        console.log("");
        console.log("Structure")
        for(let i = 0; i < this.structure.length; i ++) {
            console.log(this.structure[i]);
        }

    }

    // Disposes of all the tensors from the old model
    disposeOldModel () {

        // Dispose of old optimizer
        tf.dispose(this.optimizer);

        // Dispose of all old biases and weights
        for(let i = 0; i < this.biases.length; i ++) {
            this.biases[i].dispose();
        }

        for(let i = 0; i < this.weights.length; i ++) {
            this.weights[i].dispose();
        }

    }

    // Determins in what order the nodes will activate in, plus finds all the input/output nodes
    determinActivationOrder () {

        this.activationOrder = [];

        // Activate all the input nodes
        for(let i = 0; i < this.structure.length; i ++) {
            if (this.structure[i].type == 1) {
                this.structure[i].activated = true;
            }
        }
        
        // Continue looping until no new node has been activated
        let hasChanged = true;
        while(hasChanged == true) {
            hasChanged = false;

            // Loop over all the structure nodes
            for(let i = 0; i < this.structure.length; i ++) {
                let node = this.structure[i];

                // See if the node has not yet been updated and if it has at least 1 input
                if (node.activated == false && node.inputs.length >= 1) {
                    // See if all of the node's input nodes have been updated
                    let allInputsHaveActivated = true;
                    for(let j = 0; j < node.inputs.length; j ++) {
                        let inputIndex = node.inputs[j];
                        if (this.structure[inputIndex].activated == false) {
                            allInputsHaveActivated = false;
                        }
                    }

                    if (allInputsHaveActivated) {
                        // Activate the current node, add the node to the activation order, and set the hasChanged variable to true
                        node.activated = true;
                        this.activationOrder.push(i);
                        hasChanged = true;
                    }
                }
            }
        }

        // Find all the input nodes
        this.inputNodes = [];

        for(let i = 0; i < this.structure.length; i ++) {
            if (this.structure[i].type == 1) {
                this.inputNodes.push(i);
            }
        }

        // Find all the output nodes
        this.outptuNodes = [];

        for(let i = 0; i < this.structure.length; i ++) {
            if (this.structure[i].type == 2) {
                this.outptuNodes.push(i);
            }
        }

    }
}