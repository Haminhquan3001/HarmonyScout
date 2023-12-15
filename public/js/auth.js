"use strict";
// Validate Data From Sign Up Form, sent to the server to add to the database
const signUpForm = document.getElementById("signUpForm")
if (signUpForm != null) {
    signUpForm.addEventListener('submit', (e) => {
        let errorMessage = "";
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value
        let reenterPass = document.getElementById("reenterPass").value
        let email = document.getElementById("email").value

        //     console.log(`email: ${email}, username: ${username},
        // pass: ${password}, re-enter: ${reenterPass}`)
        let isPasswordValid = validatePassword(password, reenterPass)
        if (username === "") {
            errorMessage += "Please enter a valid username<br>"
        } if (email === "") {
            errorMessage += "Please enter a valid email address<br>"
        }
        if (!isPasswordValid) {
            errorMessage += "Please enter a valid password<br>"
        }

        if (errorMessage !== "") {
            e.preventDefault()
            document.getElementById("errorDisplay").innerHTML = errorMessage;
            return false
            // document.getElementById("signUpForm").reset();
        } else {
            // confirm(`Are you sure you want to submit your application?\n
            //     You will not be able to change your information once submitted.`);
            return true

        }
    })
}

/* Validate password
The password will be invalid if
  length is less than 8 characters
  contain no digit
  not the same with reEnterpass */
function validatePassword(password, reEnterPass) {
    // console.log("passworD: ", password, "reenter: ", reEnterPass)
    let containDigit = false;
    //Check if the password contain digit
    for (let c of password) {
        if (Number.isInteger(parseInt(c))) {
            containDigit = true;
            break;
        }
    }

    if (password.length >= 8 && containDigit && password === reEnterPass) {
        return true;
    }
    return false;
}
const signInForm = document.getElementById("signInForm")

if (signInForm) {
    signInForm.addEventListener('submit', async (e) => {
        let errorMessage = "";
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value
        console.log(`username: ${username}, pass: ${password}`)
        let isPasswordValid = validatePassword(password, password)
        const account = {
            username: username,
            password: password
        }
        //validate password and username
        if (!isPasswordValid || username === "") {
            errorMessage += 'Invalid username or password'
        }

        if (errorMessage !== "") {
            e.preventDefault()
            document.getElementById("errorDisplay").innerHTML = errorMessage;
            return false
        } else {
            // console.log("account: ", account)
            const result = await fetch('/signin/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(account)
            })

            if (!result.ok) {
                document.getElementById("errorDisplay").innerHTML = 'Invalid Login';
            }
        }
    })
}
function redirectToSignUp() {
    location.href = "/signup"
}
function redirectSignIn() {
    location.href = "/signin"
}
