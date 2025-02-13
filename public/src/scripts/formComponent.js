export const generateForm = (parentElement, pubsub) => {    
    let onEdit;
    const formObject = {
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
                b.onclick = () => {
                    if (b.id === "submitButton") {
                        if (document.getElementById("imageInput").value) { //aggiungi condizione per quando è presente immagine 
                            document.getElementById("fomeTitle").innerText = "Add image";
                            pubsub.publish("form-submit");
                        }
                        else {
                            resultLabel.innerText = "Not all forms compiled";
                        }
                    }
                    else {
                        onEdit = false;
                        document.getElementById("formTitle").innerText = "Add image";
                        //reset immagine
                        resultLabel.innerText = "";
                    }
                };
            })
        },
        setInputsValue : (image) => {
            onEdit = true;
            document.getElementById("formTitle").innerText = "Change image";
            if (image) document.getElementById("workTitleInput").value = title ; //correggere per fare riferimento a valore inserimento immagine
        },
        clear: () => {
            onEdit = false;
            document.getElementById("formTitle").innerText = "Add Image";
            //aggiungere svuota campo immagine
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



/*   CODICE X INSERIMENTO IMMAGINI NEL FORM
const renderList = async() => {
    const link = document.querySelector("#link");
    const files = await fetch("/list");
    const images = await files.json();
    const urls = Array.from(images);
    const template = `<li><a href='%URL' target="_blank">%URL</a></li>`;
    let html = "<ul>"
    html += urls.map((e) => {
      return template.replaceAll("%URL",e);
    }).join("");
    html += "</ul>";
    link.innerHTML = html;
}

(async () => {
    const inputFile = document.querySelector('#file');
    const button = document.querySelector("#button");
    const errorDiv = document.querySelector("#error");
  
    handleSubmit = async (event) => {
      const formData = new FormData();
      if (!inputFile.files[0]) {
        errorDiv.innerHTML = "<p>Insert a file</p>";
        return;
      }
      formData.append("file", inputFile.files[0]);
      const body = formData;
      const fetchOptions = {
        method: 'post',
        body: body
      };
      try { mettere la fetch giusta, fare callback con immagine da dare al fetchComponent
        const res = await fetch("/upload", fetchOptions); 
        const data = await res.json();
        await renderList();
      } catch (e) {
        console.log(e);
      }
    }
    button.onclick = handleSubmit;
  })();

  renderList().then(() => {
    setInterval(async() => {
        await renderList();
    },30000)
  }).catch(console.error)
*/
