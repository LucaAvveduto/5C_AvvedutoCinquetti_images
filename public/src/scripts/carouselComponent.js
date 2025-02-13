export const generateCarouselComponent = (parentElement) => {
    let data;
    return {
        build: (elements) => {
            data = elements;
        },
        render: () => {
            let html = `
            <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
            `;
            html += data.map((e) => `<div class="carousel-item active"><img src="${e}" class="d-block w-100"></div>').join("")`);
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
            parentElement.innerHTML = html;
        }
    }
}