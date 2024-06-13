"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const UserList = "http://localhost:3000/User";
// for the sign-up form
class NewUser {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.cart = [];
    }
}
class AuthUsers {
    getUserdetails() {
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const email = document.getElementById("email");
        const signupbtn = document.getElementById("signupbtn");
        const errormessage = document.querySelector(".errormessage");
        if (signupbtn) {
            signupbtn.addEventListener(`click`, (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                if (!username.value || !password.value || !email.value) {
                    errormessage.innerHTML = `<p>Fill in all the boxes</p>`;
                    errormessage.style.display = "block";
                    errormessage.style.backgroundColor = "red";
                }
                else {
                    const userExists = yield this.checkUserExists(username.value);
                    if (userExists) {
                        errormessage.innerHTML = `<p>Username Already Exists</p><p>If you already have an account, log in</p>`;
                        errormessage.style.display = "block";
                        errormessage.style.backgroundColor = "red";
                    }
                    else {
                        errormessage.innerHTML = `<p>Registration Successful</p>`;
                        errormessage.style.display = "block";
                        errormessage.style.backgroundColor = "green";
                        this.AddUser(username.value, password.value, email.value);
                        window.location.href = "movies.html";
                    }
                }
            }));
        }
    }
    //for creating new user
    AddUser(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const UserExists = yield this.checkUserExists(username);
            if (UserExists) {
                console.log("Username already exists.Try another name");
                return;
            }
            let newUser = new NewUser(username, password, email);
            const response = yield fetch(UserList, {
                method: 'POST',
                body: JSON.stringify(newUser)
            });
        });
    }
    //checks username
    checkUserExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(UserList);
            if (response) {
                const users = yield response.json();
                return users.some(user => user.username === username);
            }
            return false;
        });
    }
    // for the login users
    loginAuth() {
        const loginUsername = document.getElementById("logusername");
        const loginPassword = document.getElementById("logpassword");
        const loginBtn = document.getElementById("loginbtn");
        const loginErrorMessage = document.querySelector(".errormessage");
        if (loginBtn) {
            console.log("Event listener attached");
            loginBtn.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const logUsername = loginUsername.value;
                const logpassword = loginPassword.value;
                if (!logUsername || !logpassword) {
                    loginErrorMessage.innerHTML = `<p>Fill in all the boxes</p>`;
                    loginErrorMessage.style.display = "block";
                    loginErrorMessage.style.backgroundColor = "red";
                }
                else {
                    const UserAlreadyExists = yield this.validateUser(logUsername, logpassword);
                    if (UserAlreadyExists) {
                        console.log("Login Successful");
                        sessionStorage.setItem("username", logUsername);
                        const pUsername = document.querySelector(".username");
                        if (pUsername) {
                            pUsername.textContent = logUsername || " ";
                        }
                        loginErrorMessage.innerHTML = `<p>Login Successful</p>`;
                        loginErrorMessage.style.display = "block";
                        loginErrorMessage.style.backgroundColor = "green";
                        window.location.href = "movies.html";
                    }
                    else {
                        loginErrorMessage.innerHTML = `<p>Invalid username or password</p>`;
                        loginErrorMessage.style.display = "block";
                        loginErrorMessage.style.backgroundColor = "red";
                    }
                }
            }));
        }
    }
    validateUser(logUsername, logpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(UserList);
            if (response) {
                const users = yield response.json();
                return users.some(user => user.username === logUsername && user.password === logpassword);
            }
        });
    }
}
const authUsers = new AuthUsers();
authUsers.getUserdetails();
authUsers.loginAuth();
//cart
class AllCartFunctions {
    displayUserCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = sessionStorage.getItem("username");
            if (!username) {
                console.log("No user logged in");
                return;
            }
            const response = yield fetch(UserList);
            const userData = yield response.json();
            // Find the user with the specified ID
            const user = userData.users.find((user) => user.id === userId);
            user.cart.forEach((movie) => {
                console.log(`Movie Image: ${movie.image},Movie Title: ${movie.title},
             Movie Description: ${movie.description},Movie Price: ${movie.price} Quantity: ${movie.instock}`);
            });
        });
    }
    AddToCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const buybtn = document.getElementById("buy-${movie.id}");
            buybtn.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault;
            }));
        });
    }
}
