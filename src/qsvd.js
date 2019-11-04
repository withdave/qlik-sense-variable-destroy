// withdave
// Simple script to delete all user-set (i.e. not script or system managed) variables from a Qlik Sense app
// To use, you must have the variable screen open - this is by design to ensure you don't accidentally remove all your variables
// The definition of each variable is output to the browser console, JUST IN CASE you delete by accident

// Suppose we should check with the user prior to proceeding
if (confirm('Are you sure you wish to remove all variables?')) {

    // Establish a list of all the DOM elements we want to iterate over
    // We're using the DOM as it's a great way of ensuring we only have the variables we should see - we don't want to remove system set ones
    //var qsvd_variables;
    var qsvd_variables = document.querySelectorAll('ul.variable-list > li > div > div.var-name');
    // Set a variable with the total variables found
    var qsvd_variableCount = qsvd_variables.length;

    // Check to see if any variables were found
    if (qsvd_variableCount > 0) {

        // Let the user know we're staring
        var qsvd_alert = "QSVD: Starting, if you have many variables please be patient.";
        console.log(qsvd_alert);
        alert(qsvd_alert);

        // Let's get async up in here - runs better on slower PCs
        new Promise(async function(resolve, reject) {
            
            // Variables found, start the loop (this is more cross compatible than other methods)
            for (let qsvd_iter = 0; qsvd_iter < qsvd_variableCount; qsvd_iter++) {
                
                // Call our neighbourhood friendly engine to return the variable so we can print out the definition (just in case)
                engineModuleGlobal.currentApp.getVariableByName(qsvd_variables[qsvd_iter].innerHTML).then(function(qsvd_delete){

                    // This is wrong, sorry - but it works
                    var qsvd_currentVarName = qsvd_variables[qsvd_iter].innerHTML;

                    // Let's return the layout
                    qsvd_delete.getLayout().then(function(qsvd_peek_data) {
                
                        // Print out the relevant parts to the console, then delete it
                        var qsvd_currentVarValue = qsvd_peek_data.qText;
                        console.log("Loading variable " + (qsvd_iter+1) + "/" + qsvd_variableCount + " [" + qsvd_currentVarName + "]: [" + qsvd_currentVarValue + "]");
                        engineModuleGlobal.currentApp.destroyVariableByName(qsvd_currentVarName);

                        // Check to see if we reached the end (and nothing blew up)
                        if (qsvd_iter+1 == qsvd_variableCount) {
                            resolve();
                        }
                
                    });
                });

            };

        })
        .then(function() {
            // No errors, AOK
            var qsvd_alert = "QSVD: Process complete, attempted to clear " + qsvd_variableCount + " variables.";
            console.log(qsvd_alert);
            alert(qsvd_alert);

        });

    } else {

        // No variables found, print a message
        var qsvd_alert = "QSVD: Either the variables window isn't open, or no variables were found.";
        console.log(qsvd_alert);
        alert(qsvd_alert);
    }

} else {
    // User aborted
    console.log("You've cancelled the variable delete.");
}

