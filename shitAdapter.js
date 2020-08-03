class ShitAdapter {
    constructor(url){
        this.baseURL = url
    }
    fetchShits(){
        return fetch(this.baseURL)
            .then((obj) => obj.json())
    }
    addShit({ name }) {
        return fetch(this.baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                shit: {
                    name
                }
            })
        })
        .then((obj) => obj.json())    
    }
}