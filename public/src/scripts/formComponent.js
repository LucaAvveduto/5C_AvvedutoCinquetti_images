export const generateForm = (parentElement, pubsub) => {
    let onEdit;
    const formObject = {
        render : function() {
            /*
            !-SOSTITUIRE L'HTML, INSERIRCI INSERIMENTO IMMAGINI
            */
            let html = 
            `<form class="container-fluid">
                <div class="row md-row">
                    <div>
                    <button type="button" class="btn btn-danger clearForm" data-bs-dismiss="modal"><i class="fa-solid fa-ban"></i> Cancel</button>
                    <button type="button" class="btn btn-dark clearForm" data-bs-dismiss="modal" id="submitButton"><i class="fa-solid fa-floppy-disk"></i> Save</button>
                    </div>
                    <div id="resultLabel" class="form-text text-danger text-center"></div>
                </div>
            </form>
                            ` ;
            parentElement.innerHTML = html ;
            document.getElementById("FormTitle").innerText = "Add image";

            document.querySelectorAll(".clearForm").forEach(b => {
                b.onclick = () => {
                    if (b.id === "submitButton") {
                        if (true) { //aggiungi condizione per quando è presente immagine 
                            document.getElementById("adminFormTitle").innerText = "Add article";

                            if (playMainLink.value) newImages.push(playMainLink.value)
                            if (playSecondLink.value) newImages.push(playSecondLink.value)
                            if (playThirdLink.value) newImages.push(playThirdLink.value)
    
                            let article = {} ;
                            let title = workTitleInput.value ;
                            article.place = {
                                "name": playLocation.value,
                                "coords": []
                            } ;
                            article.yearofpub = playPubblicationYear.value ;
                            article.era = playEra.value ;
                            article.resume = textInput.value ;
                            article.images = newImages ;
                            article.characters = playCharacters.value ;
                            newImages = [];

                            let fullArticle = {
                                "title": title,
                                "article": article
                            }
                            
                            pubsub.publish("form-submit", fullArticle);
                        }
                        else {
                            resultLabel.innerText = "Not all forms compiled";
                        }
                    }
                    else {
                        onEdit = false;
                        document.getElementById("adminFormTitle").innerText = "Add article";
                        workTitleInput.value = "" ;
                        textInput.value = "" ;
                        playMainLink.value = "" ;
                        playSecondLink.value = "" ;
                        playThirdLink.value = "" ;
                        playLocation.value = "" ;
                        playCharacters.value = "" ;
                        playPubblicationYear.value = "" ;
                        playEra.value = "" ;
                        resultLabel.innerText = "";
                    }
                };
            })
        },
        setInputsValue : (title, articleDictionary) => {
            onEdit = true;
            document.getElementById("adminFormTitle").innerText = "Edit article (" + title + ")";
            if (title) document.getElementById("workTitleInput").value = title ;
            if (articleDictionary.resume) document.getElementById("textInput").value = articleDictionary.resume ;
            if (articleDictionary.images[0]) document.getElementById("playMainLink").value = articleDictionary.images[0] ;
            if (articleDictionary.images[1]) document.getElementById("playSecondLink").value =  articleDictionary.images[1] ;
            if (articleDictionary.images[2]) document.getElementById("playThirdLink").value =  articleDictionary.images[2] ;
            if (articleDictionary.place.name) document.getElementById("playLocation").value =  articleDictionary.place.name ;
            if (articleDictionary.characters) document.getElementById("playCharacters").value = articleDictionary.characters ;
            if (articleDictionary.yearofpub) document.getElementById("playPubblicationYear").value = articleDictionary.yearofpub ;
            if (articleDictionary.era) document.getElementById("playEra").value = articleDictionary.era ;
        },
        clear: () => {
            onEdit = false;
            document.getElementById("adminFormTitle").innerText = "Add article";
            document.getElementById("workTitleInput").value = "" ;
            document.getElementById("textInput").value = "" ;
            document.getElementById("playMainLink").value = "" ;
            document.getElementById("playSecondLink").value = "" ;
            document.getElementById("playThirdLink").value = "" ;
            document.getElementById("playLocation").value = "" ;
            document.getElementById("playCharacters").value = "" ;
            document.getElementById("playPubblicationYear").value = "" ;
            document.getElementById("playEra").value = "" ;
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
      try {
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
