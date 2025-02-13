export const generateNavbar = (parentElement) => {
    let data;
    return {
        build: (elements) => {
            data = elements;
        },
        render: () => {
            let html = `
            <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="#home"><img src="./assets/logo.png"></a>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
            `;
            html += data.map((e) => `<a class="nav-link" href="#${e}">${e}</a>`).join("");
            html += "</div></div></div></nav>";
            parentElement.innerHTML = html;

            window.addEventListener('popstate', () => {
                document.querySelectorAll(".actived").forEach((e) => e.classList.remove("actived"));
                const url = new URL(location.href);
                Array.from(document.querySelectorAll(`a[href="${url.hash}"]`)).pop().classList.add("actived");
                console.log(document.querySelector(`a[href="${url.hash}"]`));
            })
        }
    }
}