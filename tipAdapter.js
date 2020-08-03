class TipAdapter {
    constructor(url) {
        this.baseURL = url
    }
    addTip(tip) {
        return fetch(this.baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                tip: {
                    description: tip[0],
                    shit_id: tip[1]
                }
            })
        })
            .then((obj) => obj.json())
    }
}