export const generateFetchComponent = () => {
    return {
        uploadImage: async(data) => {
            const response = await fetch("/img/add", {
                method: "POST",
                body: data
            }).catch(console.error);
            return response.json();
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