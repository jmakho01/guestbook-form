// When the form is submitted, validate
document.getElementById('contact-form').onsubmit = () => 
{    
    clearErrors();

    // Flag variable to determine if form data is valid
    let isValid = true;

    // Validate first name
    let fname = document.getElementById('fname').value.trim();
    if(!fname) {
        document.getElementById('err-fname').style.display = "inline";
        isValid = false;
    }

    // Validate last name
    let lname = document.getElementById('lname').value.trim();
    if(!lname) {
        document.getElementById('err-lname').style.display = "inline";
        isValid = false;
    }

    // Set variable for mailing list checkbox
    let mailCheck = document.getElementById('addmail');

    // Set variable for email
    let email = document.getElementById('email').value.trim();

    // Validate email address (optional unless mailCheck is checked)
    if(mailCheck.checked || email !== "" )
    {
        if(!email || regexEmail(email) === false) {
            document.getElementById('err-email').style.display = "inline";
            isValid = false;
        }
    }
    // Validate LinkedIn address (optional)
    let linked = document.getElementById('linkurl').value.trim();
    if(linked !== "") {
        if(!linked.includes("https://linkedin.com/in/"))
        {
            document.getElementById('err-linked').style.display = "inline";
            isValid = false;
        }
    }

    // Validate "How we met" field
    validateMeet();

    // Return isValid flag
    return isValid;
}

document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('addmail');
    const formatField = document.getElementById('show-format');

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            formatField.style.display = 'block';
        } else {
            formatField.style.display = 'none';
        }
    });
});

function regexEmail(email) { //regex example courtesy of GeeksforGeeks
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //URL: https://www.geeksforgeeks.org/javascript/javascript-program-to-validate-an-email-address/
  return emailRegex.test(email);
}

function validateMeet()
{
    let dropdown = document.getElementById('meet');
    let otherField = document.getElementById('show-other');
    let errorField = document.getElementById('err-meet');

    if(dropdown.value === "none") {
        errorField.style.display = "inline";
        isValid = false;
    } else if(dropdown.value === "other") {
        otherField.style.display = "inline";
    } else {
        otherField.style.display = "none";
    }
}

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for(let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}