class SimonSays {
    constructor(levels) {
        this.levels = levels
        this.keys = this.setKeys(levels)
        this.startButton = document.getElementById("start")
        this.difficulties = document.getElementById("difficulties")
        this.button_difficulties = document.querySelectorAll(".difficulties-button")
        this.keyboard = document.querySelectorAll('.key')
        this.init()
    }

    init() {
        this.startButton.style.display = "flex"
        this.startButton.addEventListener("click", this.selectDifficulty.bind(this))
    }

    selectDifficulty() {
        this.difficulties.style.display = "flex"
        this.startButton.style.display = "none"
        for (let button of this.button_difficulties) {
            button.addEventListener("click", this.start.bind(this))
        }
    }

    start(event) {
        this.difficulty = event.target.innerText.toLowerCase()
        this.difficulties.style.display = "none"
        this.addKeyEvents()
        this.play()
    }

    addKeyEvents() {
        window.addEventListener("keydown", this.keyDown.bind(this))
        for (let key of this.keyboard) {
            key.addEventListener('click', this.click.bind(this))
        }
    }

    removeKeyEvents() {
        window.removeEventListener("keydown", this.keyDown)
        for (let key of this.keyboard) {
            key.removeEventListener('click', this.click)
        }
    }

    keyDown(event) {
        this.evaluate(event.keyCode)
    }

    click(event) {
        this.evaluate(event.target.innerHTML.toUpperCase().charCodeAt(0))
    }

    generateRandomKeys() {
        const min = 65, max = 90
        return Math.round(Math.random() * (max - min) + min)
    }

    setKeys(levels) {
        return new Array(levels).fill(0).map(this.generateRandomKeys)
    }

    play(currentLevel = 0) {
        if (currentLevel == this.levels) {
            return swal({
                title: "Good job!", 
                text: "You win", 
                icon: "success"
            })
        }
        
        swal({
            title: `Level ${currentLevel + 1}`, 
            text: "Get ready", 
            buttons: false, 
            timer: 1000
        })

        setTimeout(() => {
            for (let i = 0; i <= currentLevel; i++) {
                if (this.difficulty == "easy") {
                    const delay = 1000 * (i + 1) + 1000
                    setTimeout(() => this.activate(this.keys[i]), delay)
                }
                else if (this.difficulty == "medium") {
                    const delay = 500 * (i + 1) + 500
                    setTimeout(() => this.activate(this.keys[i]), delay)
                }
                else if (this.difficulty == "hard") {
                    const delay = 300 * (i + 1) + 300
                    setTimeout(() => this.activate(this.keys[i]), delay)
                }
            }
        }, 1000);
    
        this.i = 0
        this.currentKey = this.keys[0]
        this.currentLevel = currentLevel
    }
        
    evaluate(key) {
        if (key == this.currentKey) {
            this.activate(this.currentKey, {success: true})
            this.i++
            
            if (this.i > this.currentLevel) {
                this.removeKeyEvents()
                setTimeout(() => this.play(this.i), 1500)
            }

            this.currentKey = this.keys[this.i]
        }

        else {
            this.activate(key, {fail: true})
            this.activate(this.currentKey)
            this.removeKeyEvents()
            
            setTimeout(() => 
                swal({
                    title: "You have lost!",
                    text: "Do you want try again?",
                    buttons: {ok: "Of course"},
                    closeOnClickOutside: false
                })
            
                .then(value => {
                    this.keys = this.setKeys(this.levels)
                    location.reload()
                })
            , 1000)
        }
    }

    activate(keyCode, opts = {}) {
        const keyElement = document.querySelector(`[data-key="${keyCode}"]`)
        keyElement.classList.add("active")
        
        if (opts.success) {
            keyElement.classList.add("success")
        }
        
        else if (opts.fail) { 
            keyElement.classList.add("fail")   
        }
        
        setTimeout(() => keyElement.className = "key", 500)
    }
}

new SimonSays(15)