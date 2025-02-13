export const generateForm = (parentElement, pubsub) => {    
    let onEdit;
    let callBack
    const formObject = {
        build : function(callBackInput) {
            callBack=callBackInput
        },
        render : function() {
            /*
            !-SOSTITUIRE L'HTML, INSERIRCI INSERIMENTO IMMAGINI, CORREGGERE CONTENUTO HTML VIENE SOSTITUITO DA SOLO TESTO ADD IMAGE, FARE RIFERIMENTO A GIT HUB
            */
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
            const inputFile = document.querySelector('#file');

            document.querySelectorAll(".clearForm").forEach(b => {
                b.onclick = async (event) => {
                    if (b.id === "submitButton") {
                        const formData = new FormData();
                        if (!imageInput.files[0]) {
                            this.setError("<p>Insert a file</p>")
                            return;
                        }
                        formData.append("file", imageInput.files[0]);
                        try { 
                            callBack(formData)
                            //pubsub.publish("form-submit");
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        onEdit = false;
                        document.getElementById("formTitle").innerHTML = "Add image";
                        resultLabel.innerText = "";
                    }
                };
            })
        },
        clear: () => {
            onEdit = false;
            document.getElementById("formTitle").innerText = "Add Image";
            document.getElementById("resultLabel").innerText = "" ;
        },
        setError: (error) => {
            document.getElementById("resultLabel").innerText = error;
        },
        getEdit: () => {
            return onEdit;
        }
    }
    return formObject;
};


