export const generateLoginComponent = (parentElement,pubsub) => {
    let isLogged;
    let privateClass;
    let conf;
    const login = (username, password) => {
        return new Promise((resolve, reject) => {
            fetch(conf["URL"], {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "key": conf["TOKEN"]
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(r => r.json())
            .then(data => resolve(data.result))
            .catch(err => reject(err.result));
        });
    };

    return {
        build: (config,inputPrivateClass) => {
            conf = config;
            isLogged = sessionStorage.getItem("logged") || false;
            privateClass = inputPrivateClass;

            if (isLogged) {
                parentElement.classList.add("d-none");
                document.querySelectorAll("." + privateClass).forEach(e => {
                    e.classList.remove("d-none");
                });
            }
            else {
                parentElement.classList.remove("d-none");
                document.querySelectorAll("." + privateClass).forEach(e => {
                    e.classList.add("d-none");
                });
            }
        },
        renderForm: () => {
            const types = ["text","password"];
            const labels = ["username","password"];
            let html = `
                        <div class="container text-center">
                        <div class='mb-3'>
            `;
            for(let i = 0; i < types.length; i++) {
                html += `
                <div class="row">
                    <div class="col" id="login-form">
                        <label for="`+ labels[i] +`" class="form-label">`+ labels[i] +`</label>
                        <input class="form-control" type`+ types[i] +` id="`+ labels[i] +`">
                    </div>
                </div>
                `;
            }
            html += `
                    </div>
                    <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-dark" id="loginButton">LOGIN</button>
                            </div>
                        </div>
                    <div class="row">
                        <p id="loginResult"></p>
                    </div>
                </div>`;
            parentElement.innerHTML = html;

            document.getElementById("loginButton").onclick = () => {
                const username = document.getElementById(labels[0]).value;
                const password = document.getElementById(labels[1]).value;
                const loginResult = document.getElementById("loginResult");

                if (username && password) {
                    login(username, password)
                    .then(r => {
                        if (r) {
                            sessionStorage.setItem("logged", true);
                            isLogged = true;
                            document.getElementById(labels[0]).value = "";
                            document.getElementById(labels[1]).value = "";

                            document.querySelectorAll("." + privateClass).forEach(e => {
                                e.classList.remove("d-none");
                            });
                            parentElement.classList.add("d-none");
                            
                            document.getElementById(labels[0]).value = "";
                            document.getElementById(labels[1]).value = "";
                            pubsub.publish("login")
                        } 
                        else {
                            loginResult.innerText = "Incorrect username or password";
                            document.getElementById(labels[1]).value = "";
                            document.getElementById(labels[0]).value = "";
                        }
                    })
                    .catch(err => {
                        console.log(err) ;
                    });
                }
                else {
                    loginResult.innerText = "Not all forms compiled";
                }
            };
        },
        isLogged: () => {
            return isLogged;
        }
    };
};