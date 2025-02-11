export const generateFetchComponent = () => {
    return {
        uploadImage: (data) => {
            return new Promise((resolve, reject) => {
                fetch("/img/add", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        value: JSON.stringify(data)
                    })
                })
                .then(r => r.json())
                .then(data => resolve(data.result))
                .catch(err => reject(err.result));
            });
        },
        getImages: () => {
            return new Promise((resolve, reject) => {
                fetch("/img")
                .then(r => r.json())
                .then(data => {
                    let dict = JSON.parse(data.result);
                    resolve(dict);
                })
                .catch(err => reject(err.result));
            })
        },
        deleteImage: async(img) => {
            const response = await fetch("/img/"+img,{
                "method" :"DELETE",
                headers: {
                    "Content-Type": "application/json",
                  },
                })
            return await response.json();
        }
    };
}