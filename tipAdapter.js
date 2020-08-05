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
                    shit_id: tip[1],
                    tip_count: 0
                }
            })
        })
            .then((obj) => obj.json())
    }
    fetchTip(e){
        return fetch(`http://localhost:3000/tips/${e.target.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                tip: {
                    tip_count: e.target.dataset.tipcount
                }
            })
        })
    }
}