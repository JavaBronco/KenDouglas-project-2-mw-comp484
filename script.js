$(document).ready(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name: "Biscuit", weight: 10, happiness: 50};

    // Array to track all user actions for the action log
    var actionLog = [];

    // Helper to record an action, log it to console, and update the log display
    function logAction(action) {
        var timestamp = new Date().toLocaleTimeString();
        var entry = '[' + timestamp + '] ' + action;
        actionLog.push(entry);
        console.log(entry);
        updateActionLogInHtml();
    }

    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();

    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);

    // Handle form submission to update pet info
    $('.pet-form').submit(function(event) {
        event.preventDefault();
        console.log('Form submitted - raw data:', $(this).serialize());

        var changes = [];
        var formData = $(this).serializeArray();
        formData.forEach(function(field) {
            if (field.name === 'name' && field.value !== '') {
                pet_info['name'] = field.value;
                changes.push('name="' + field.value + '"');
            } else if (field.name === 'weight' && field.value !== '') {
                pet_info['weight'] = parseFloat(field.value);
                changes.push('weight=' + field.value);
            } else if (field.name === 'happiness' && field.value !== '') {
                pet_info['happiness'] = parseFloat(field.value);
                changes.push('happiness=' + field.value);
            }
        });

        if (changes.length > 0) {
            logAction('Form submitted: updated ' + changes.join(', '));
        }

        checkAndUpdatePetInfoInHtml();
        $(this)[0].reset();
    });

    // Download action log as a .txt file
    $('.download-log-button').click(function() {
        if (actionLog.length === 0) {
            alert('No actions recorded yet.');
            return;
        }
        var logText = 'Pet Action Log\n==============\n' + actionLog.join('\n');
        var blob = new Blob([logText], {type: 'text/plain'});
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'pet_action_log.txt';
        a.click();
        URL.revokeObjectURL(url);
        logAction('Action log downloaded as pet_action_log.txt');
    });


    function clickedTreatButton() {
        // Increase pet happiness
        pet_info['happiness'] += 10;
        // Increase pet weight
        pet_info['weight'] += 5;
        // Use .closest() to find and log the nearest parent div
        console.log('Nearest parent div:', $(this).closest('div')[0]);
        logAction('Treat button clicked (happiness +10, weight +5)');
        checkAndUpdatePetInfoInHtml();
    }

    function clickedPlayButton() {
        // Increase pet happiness
        pet_info['happiness'] += 5;
        // Decrease pet weight
        pet_info['weight'] -= 3;
        // Use .closest() to find and log the nearest parent div
        console.log('Nearest parent div:', $(this).closest('div')[0]);
        logAction('Play button clicked (happiness +5, weight -3)');
        checkAndUpdatePetInfoInHtml();
    }

    function clickedExerciseButton() {
        // Decrease pet happiness
        pet_info['happiness'] -= 5;
        // Decrease pet weight
        pet_info['weight'] -= 5;
        // Use .closest() to find and log the nearest parent div
        console.log('Nearest parent div:', $(this).closest('div')[0]);
        logAction('Exercise button clicked (happiness -5, weight -5)');
        checkAndUpdatePetInfoInHtml();
    }

    function checkAndUpdatePetInfoInHtml() {
        checkWeightAndHappinessBeforeUpdating();
        updatePetInfoInHtml();
    }

    function checkWeightAndHappinessBeforeUpdating() {
        // If weight drops below zero, reset it to 0
        if (pet_info['weight'] < 0) {
            pet_info['weight'] = 0;
        }
        // If happiness drops below zero, reset it to 0
        if (pet_info['happiness'] < 0) {
            pet_info['happiness'] = 0;
        }
    }

    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
        $('.name').text(pet_info['name']);
        $('.weight').text(pet_info['weight']);
        $('.happiness').text(pet_info['happiness']);
    }

    // Updates the action log list in the HTML
    function updateActionLogInHtml() {
        var $list = $('.action-log-list');
        $list.empty();
        actionLog.forEach(function(entry) {
            $list.append('<li>' + entry + '</li>');
        });
    }

});
