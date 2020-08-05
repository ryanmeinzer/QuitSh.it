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
                    name,
                    shit_count: 0
                }
            })
        })
        .then((obj) => obj.json())    
    }
    fetchShit(e){
        return fetch(`${this.baseURL}/${e.target.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                shit: {
                    shit_count: e.target.dataset.shitcount
                }
            })
        })
    }
}