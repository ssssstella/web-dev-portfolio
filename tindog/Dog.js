// Create the Dog class here
class Dog {
    constructor(data) {
        Object.assign(this, data)
    }

    getDogHtml() {
        return `<img class="profile-img" src=${this.avatar} alt=${this.name}>
                <div class="profile-info">
                    <h2>${this.name}, ${this.age}</h2>
                    <p>${this.bio}</p>
                </div>`
    }
    
}

export default Dog