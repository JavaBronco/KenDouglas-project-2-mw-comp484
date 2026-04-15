$(document).ready(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name: "Biscuit", weight: 10, happiness: 50};

    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();

    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);


    function clickedTreatButton() {
        // Increase pet happiness
        pet_info['happiness'] += 10;
        // Increase pet weight
        pet_info['weight'] += 5;
        // Use .closest() to find and log the nearest parent div
        console.log('Nearest parent div:', $(this).closest('div')[0]);
        checkAndUpdatePetInfoInHtml();
    }

    function clickedPlayButton() {
        // Increase pet happiness
        pet_info['happiness'] += 5;
        // Decrease pet weight
        pet_info['weight'] -= 3;
        // Use .closest() to find and log the nearest parent div
        console.log('Nearest parent div:', $(this).closest('div')[0]);
        checkAndUpdatePetInfoInHtml();
    }

    function clickedExerciseButton() {
        // Decrease pet happiness
        pet_info['happiness'] -= 5;
        // Decrease pet weight
        pet_info['weight'] -= 5;
        // Use .closest() to find and log the nearest parent div
        console.log('Nearest parent div:', $(this).closest('div')[0]);
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
        // Use .serialize() to log form data if a form exists on the page
        if ($('form').length) {
            console.log('Form data:', $('form').serialize());
        }
    }

});
