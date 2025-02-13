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
        getImages: async() => {
            const response = await fetch("/img").catch(console.error);
            return await response.json();
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