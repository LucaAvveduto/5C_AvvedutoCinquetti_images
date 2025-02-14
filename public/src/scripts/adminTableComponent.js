export const generateAdminTable = (parentElement,pubsub) => {
    let images = [];
    const tableObject = {
        build: function(imagesInput) {
            images = imagesInput;
            pubsub.subscribe("img-change", (imgs) => {
                images = imgs;
                this.render();
            });
        },
        render: function() {
            let html = '<table class="table table-focus table-striped"><thead class="sticky-on-top">';
            
            html += images.map((image) => 
                `<tr><td><img src="${image.url}" class="d-block" alt="${image.url}"></td>`+
                `<td><p class="img-id">${image.id}</p></td>` +
                `<td><button type="button" id="${image.id}" class="btn btn-danger deleteButton">Delete</button></td></tr>`
            ).join("");
            html += "</tbody></table>";
            parentElement.innerHTML = html;


            document.querySelectorAll(".deleteButton").forEach(b => {
                b.onclick = () => {
                    pubsub.publish("el-to-delete", b.id);
                };
            });

            document.querySelector("#addButton").onclick = () => {
                pubsub.publish("open-modal");
            }
        },
        setImages: function(inputImages) {
            images = inputImages;
        },
        getImages: function() {
            return images;
        }
    };
    return tableObject;
};