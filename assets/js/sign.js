
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

   
    const name = signupForm.querySelector('input[placeholder="Name"]').value.trim();
    const email = signupForm.querySelector('input[placeholder="Email or Phone Number"]').value.trim();
    const password = signupForm.querySelector('input[placeholder="Password"]').value.trim();

  
    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

   
    const userData = {
        name: name,
        email: email,
        password: password
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const isExist = users.some(user => user.email === email);

    if (isExist) {
        alert("This email is already registered");
        return;
    }

 
    users.push(userData);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully 🎉");

   
    signupForm.reset();

});
