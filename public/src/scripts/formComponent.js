export const generateForm = (parentElement, pubsub) => {    
    const formObject = {
        build: function() {
            pubsub.subscribe("open-modal",() => {
                this.render();
            });
        },
        render : function() {
            let html = 
            `
            <form class="container-fluid">
                <div class="row md-row">
                    <div class="col">
                        <input type="file" class="form-control" placeholder="image" id="imageInput">
                    </div>
                </div>
                <div class="row md-row">
                    <div id="resultLabel" class="form-text text-danger text-center"></div>
                </div>
            </form>
            ` ;
            parentElement.innerHTML = html ;
            document.getElementById("formTitle").innerHTML = "Add image";
            const imageInput = document.querySelector('#imageInput');
            const extensions = ["png","jpg","jpeg"];
            document.querySelectorAll(".clearForm").forEach(b => {                
                b.onclick = async (event) => {
                    if (b.id === "submitButton") {
                        const formData = new FormData();
                        let realImage = false;
                        const path = imageInput.value;
                        for (const e of extensions) {
                            if (path.includes(e)) {
                                realImage = true;
                                break;
                            }
                        }                        
                        if (!imageInput.files[0] || !realImage) {
                            this.setError("<p>Insert an image</p>");
                            console.log("errore files")
                            return;
                        }
                        formData.append("file", imageInput.files[0]);

                        try { 
                            pubsub.publish("form-submit",formData);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        document.getElementById("formTitle").innerHTML = "Add image";
                        resultLabel.innerText = "";
                    }
                };
            })
        },
        setError: (error) => {
            document.getElementById("resultLabel").innerText = error;
        },
    }
    return formObject;
};


