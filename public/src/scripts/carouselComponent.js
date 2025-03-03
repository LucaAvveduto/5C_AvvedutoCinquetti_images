export const generateCarouselComponent = function(parentElement,pubSub) {
    let data;
    const fncts = {
        build: function(elements) {
            data = elements;
            pubSub.subscribe("img-change", (imgs) => {
                data = imgs;
                this.render();
            });
        },
        render: function() {
            let html = `
            <div id="carouselExample" class="carousel carousel-dark slide">
                <div class="carousel-inner">
            `;
            html += data.map((e, index) => 
                `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${e.url}" class="d-block w-100" alt="${e.url}">
                </div>`
            ).join("");            
            html += `</div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>`;
                console.log(html)
            parentElement.innerHTML = html;
        }
    }
    return fncts;
}