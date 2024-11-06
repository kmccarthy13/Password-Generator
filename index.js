let characterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

// determine number of passwords to generate, based on # of password boxes (<p> tags) utilized in the HTML
let pwGroup = document.querySelector('.passwordGroup')
let pTags = pwGroup.querySelectorAll("p")
let numPasswords = pTags.length

// generates X number of password options & shows them to the user
generatePasswords.addEventListener("click", function() {
    
    setCharacterArray()
    
    //  create passwords & buttons based on # of passwords required & add each pw to its correct <p> tag 
// EXAMPLE - FOR REFERENCE: <button class="copy" id="copyPassword1">
//           <img class="copyIcon" src="images/copy-solid1.svg" alt="copy icon">
//          </button>
    
    for (let i=0; i < numPasswords; i++) {
        let password = generatePassword()
        
        let copyButton = document.createElement("button")
        // set class and ID of button
        copyButton.classList.add("copy")
        copyButton.id = "copyPassword" + String(i)
        // create image element for button and add within the button
        let copyIcon = document.createElement("img")
        copyIcon.classList.add("copyIcon") 
        copyIcon.src = "images/copy-solid1.svg"
        copyIcon.alt = "copy icon"
        copyButton.appendChild(copyIcon)
        // add password to the appropriate place
        let paragraphEl = pTags[i]
        paragraphEl.classList.add("ellipsesGone")
        paragraphEl.textContent = password
        paragraphEl.appendChild(copyButton)
        copyButton.addEventListener("click", copyPassword.bind(copyButton, password))
    }
})

// set characterArray to include all checked items before generating passwords
function setCharacterArray() {
    let checkboxes = document.querySelectorAll(".checkInput")
    //console.log(characterArray.length)
    for (let i=0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i]
        let index = characterArray.indexOf(checkbox.name)
        if (checkbox.checked && index === -1) { // if value is not in characterArray, but is checked, add it
            characterArray.push(checkbox.name)
        } else if (checkbox.checked === false && index > -1) { // if value is in characterArray, but was unchecked, remove it
            characterArray.splice(index,1)
        }
    }
    //console.log(characterArray.length)
}

// return a random character
function randChar() {
    let index = Math.floor( Math.random() * characterArray.length)
    return characterArray[index]
}

// return a single password of length X (length is provided as a global variable)
function generatePassword() {
    let password = ""
    let length = getPasswordLength()
    for (let i=0; i<length; i++) {
        password += randChar()
    }
    return password
}


function numberofPasswords() {
    let pwGroup = document.querySelector('.passwordGroup')
    let pTags = pwGroup.querySelectorAll("p")
    return pTags.length
}

function getPasswordLength() {
    let lengthEl = document.querySelector("#lengthElement")
    let length = lengthEl.value
    return length
}

// when the copy button is clicked, copy the password to the user's keyboard
function copyPassword(password) {
    navigator.clipboard.writeText(password)
    
}