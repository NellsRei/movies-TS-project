const UserList ="http://localhost:3000/User"

// enum Role{"Manager"="manager","User"="user"}
interface User {
    username:string
    password: string
    email: string
    cart: Movie[]
}

// for the sign-up form

class NewUser implements User {
    id: any;
    username: string
    password: string
    email: string
    cart: Movie[]

    constructor(username: string, password: string, email: string) {
        this.username = username
        this.password = password
        this.email = email
        this.cart = []
        
    }
}

class AuthUsers {
    getUserdetails() {
        const username = document.getElementById("username")! as HTMLInputElement
        const password = document.getElementById("password")! as HTMLInputElement
        const email = document.getElementById("email")! as HTMLInputElement
        const signupbtn = document.getElementById("signupbtn")! as HTMLButtonElement
        const errormessage = document.querySelector(".errormessage")! as HTMLElement

        if (signupbtn){
        signupbtn.addEventListener(`click`, async (e) => {
            
            e.preventDefault()

            if (!username.value || !password.value || !email.value) {
                errormessage.innerHTML = `<p>Fill in all the boxes</p>`
                errormessage.style.display = "block"
                errormessage.style.backgroundColor = "red"

            } else {
                const userExists = await this.checkUserExists(username.value)
                if(userExists){
                errormessage.innerHTML = `<p>Username Already Exists</p><p>If you already have an account, log in</p>`
                errormessage.style.display = "block"
                errormessage.style.backgroundColor = "red"

                }else {
                errormessage.innerHTML = `<p>Registration Successful</p>`
                errormessage.style.display = "block"
                errormessage.style.backgroundColor = "green"
                this.AddUser(username.value,password.value,email.value)
                window.location.href = "movies.html"
            }
            }
        })
        }
    }
    //for creating new user
    public async AddUser(username: string, password: string, email: string) {

        const UserExists = await this.checkUserExists(username)
        if(UserExists){
            console.log ("Username already exists.Try another name")
            return
        }

        let newUser = new NewUser(username, password, email)
            
            const response = await fetch(UserList, {
                method: 'POST',
                body: JSON.stringify(newUser)
            })
    }
    //checks username
    private async checkUserExists(username: string): Promise<boolean> {
            const response = await fetch(UserList)
            if (response) {
                const users: User[] = await response.json()
                return users.some(user => user.username === username)
            }
            return false
    } 
    // for the login users
    loginAuth(){
        const loginUsername = document.getElementById("logusername")! as HTMLInputElement
        const loginPassword = document.getElementById("logpassword")! as HTMLInputElement
        const loginBtn = document.getElementById("loginbtn")! as HTMLButtonElement
        const loginErrorMessage = document.querySelector(".errormessage") as HTMLDivElement

        if(loginBtn){
            console.log("Event listener attached")
        loginBtn.addEventListener("click", async (e)=>{
            e.preventDefault()

            const logUsername:string = loginUsername.value
            const logpassword:string = loginPassword.value

            if(!logUsername || !logpassword){
                loginErrorMessage.innerHTML = `<p>Fill in all the boxes</p>`
                loginErrorMessage.style.display = "block"
                loginErrorMessage.style.backgroundColor = "red"
            }else{
                const UserAlreadyExists = await this.validateUser(logUsername,logpassword)
                if (UserAlreadyExists){
                    console.log("Login Successful")
                    sessionStorage.setItem("username", logUsername)
                        const pUsername = document.querySelector(".username") as HTMLParagraphElement
                        if (pUsername) {
                            pUsername.textContent = logUsername || " "
                        }
                    loginErrorMessage.innerHTML = `<p>Login Successful</p>`
                    loginErrorMessage.style.display = "block"
                    loginErrorMessage.style.backgroundColor = "green"
                    window.location.href = "movies.html"
                }else{
                    loginErrorMessage.innerHTML = `<p>Invalid username or password</p>`
                    loginErrorMessage.style.display = "block";
                    loginErrorMessage.style.backgroundColor = "red"
                }
            }
        })
        }
    }
    private async validateUser(logUsername:string,logpassword:string){
        const response = await fetch(UserList)
        if(response){
            const users: User[] = await response.json()
                return users.some(user => user.username === logUsername && user.password === logpassword)
        }
    }
}

const authUsers = new AuthUsers()
authUsers.getUserdetails()
authUsers.loginAuth()

//cart
class AllCartFunctions{
    public async displayUserCart(userId: number): Promise<void> {
        const username = sessionStorage.getItem("username")
        if (!username) {
            console.log("No user logged in")
            return;
        }
        const response = await fetch(UserList)
        const userData = await response.json()

        // Find the user with the specified ID
        const user = userData.users.find((user: any) => user.id === userId)
        user.cart.forEach((movie: any) => {
            console.log(`Movie Image: ${movie.image},Movie Title: ${movie.title},
             Movie Description: ${movie.description},Movie Price: ${movie.price} Quantity: ${movie.instock}`)
        })

    }
    public async AddToCart(userId:number){
        const buybtn = document.getElementById("buy-${movie.id}")! as HTMLButtonElement

        buybtn.addEventListener("click", async (e)=>{
            e.preventDefault

            


        
        })


    }
}