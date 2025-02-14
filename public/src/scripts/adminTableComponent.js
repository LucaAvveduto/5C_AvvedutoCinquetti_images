export const generateAdminTable = (parentElement,pubsub) => {
    let images = []
    let callback;
    const tableObject = {
        build: function(imagesInput,callbackInput) {
            images=imagesInput;
            callback=callbackInput
        },
        render: function() {
            let html = '<table class="table table-focus table-striped"><thead class="sticky-on-top">';
            
            html += images.map((image) => 
                `<tr><td><img src="${image.url}" class="d-block" alt="${image.url}"></td>`+
                '<td><a href="#article-' + image + '"id="' + image + '" class="imageLink">' + e + ' <i class="fa-solid fa-arrow-up-right-from-square"></i></a></td><td> <button type="button" id="delete-' + e + '" class="btn btn-danger deleteButton"><i class="fa-solid fa-trash"></i> Delete</button></td></tr>'
            ).join("");


            html += "</tbody>";
            html += '<tfoot><tr><td><button type="button" class="btn btn-info addButton"><i class="fa-solid fa-trash"></i> add Image</button></td></tr></tfoot></table>'
            parentElement.innerHTML = html;


            document.querySelectorAll(".deleteButton").forEach(b => {
                b.onclick = () => {
                    const playTitle = b.id.replace("delete-", "");
                    
                    delete images[playTitle];
                    
                    //pubsub.publish("el-deleted", data);
                };
            });

            document.querySelectorAll(".addButton").forEach(b => {
                b.onclick = callback();
            });
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