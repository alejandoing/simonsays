// const levels = 15
// const generateKeys = (levels) => new Array(levels).fill(0).map(generateRandomKeys)
// let keys = generateKeys(levels)

class SimonSays {
    constructor(levels) {
        this.levels = levels
        this.keys = this.setKeys(levels)
        this.keyDown = this.keyDown.bind(this)
        this.play()
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
    
        for (let i = 0; i <= currentLevel; i++) {
            const delay = 1000 * (i + 1) + 1000
            setTimeout(() => this.activate(this.keys[i]), delay)
        }
    
        this.i = 0
        this.currentKey = this.keys[0]
        this.currentLevel = currentLevel
        
        window.addEventListener("keydown", this.keyDown)
    }
        
    keyDown(event) {
        if (event.keyCode == this.currentKey) {
            this.activate(this.currentKey, {success: true})
            this.i++
            
            if (this.i > this.currentLevel) {
                window.removeEventListener("keydown", this.keyDown)
                setTimeout(() => this.play(this.i), 1500)
            }

            this.currentKey = this.keys[this.i]
        }

        else {
            this.activate(event.keyCode, {fail: true})
            this.activate(this.currentKey)
            window.removeEventListener("keydown", this.keyDown)
            
            setTimeout(() => 
                swal({
                    title: "You lost!",
                    text: "Do you want try again?",
                    buttons: {ok: "Yes", cancel: "Not"}
                })
            
                .then(value => {
                    if (value == "ok") {
                        this.keys = this.setKeys(this.levels)
                        this.play()
                    }
                })
            , 1000)
        }
    }

    activate(keyCode, opts = {}) {
        const el = document.querySelector(`[data-key="${keyCode}"]`)
        el.classList.add("active")
        
        if (opts.success) el.classList.add("success")

        else if (opts.fail) el.classList.add("fail")

        setTimeout(() => el.className = "key", 500)
    }
}

simonSays = new SimonSays(15)

// function nextLevel(currentLevel) {
//     if (currentLevel == levels) {
//         return swal({
//             title: "Good job!", 
//             text: "You win", 
//             icon: "success"
//         })
//     }
    
//     swal({
//         title: `Level ${currentLevel + 1}`, 
//         text: "Get ready", 
//         buttons: false, 
//         timer: 1000
//     })

//     for (let i = 0; i <= currentLevel; i++) {
//         let delay = 1000 * (i + 1) + 1000
//         setTimeout(() => activate(keys[i]), delay)
//     }

//     let i = 0
//     let currentKey = keys[i]
//     window.addEventListener("keydown", onkeydown)

//     function onkeydown(event) {
//         if (event.keyCode == currentKey) {
//             activate(currentKey, {success: true})
//             i++
//             if (i > currentLevel) {
//                 window.removeEventListener("keydown", onkeydown)
//                 setTimeout(() => nextLevel(i), 1500)
//             }
//             currentKey = keys[i]
//         }
//         else {
//           activate(event.keyCode, {fail: true})
//           activate(currentKey, {})
//           window.removeEventListener("keydown", onkeydown)
//           setTimeout(() => swal({
//               title: "You lost!",
//               text: "Do you want try again?",
//               buttons: {ok: "Yes", cancel: "Not"}
//           })
//           .then((value) => {
//               if (value == "ok") {
//                   keys = generateKeys(levels)
//                   nextLevel(0)
//               }
//           }), 1000)
//         }
//     }
// }

// function generateRandomKeys() {
//     const min = 65
//     const max = 90
//     return Math.round(Math.random() * (max - min) + min)
//   }
  
//   function activate(keyCode, opts = {}) {
//     const el = document.querySelector(`[data-key="${keyCode}"]`)
//     el.classList.add("active")
//     if (opts.success) {
//         el.classList.add("success")
//     }
//     else if (opts.fail) {
//         el.classList.add("fail")
//     }
//     setTimeout(() => desactivate(el), 500)
//   }
  
//   function desactivate(el) {
//     el.className = "key"
//   }

// nextLevel(0)