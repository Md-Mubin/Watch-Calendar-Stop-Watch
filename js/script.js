// ================================= Clock Document

let clock                  = document.querySelector(".clock")
let hours                  = document.querySelector(".hours")
let minutes                = document.querySelector(".min")
let seconds                = document.querySelector(".sec")

// ================================= Stop Watch Document

let swOnOffButton         = document.querySelector(".stopWatch_onOff_btn")
let swStartStopButton     = document.querySelector(".stopWatch_startStop_btn")
let swRestartButton       = document.querySelector(".stopWatch_restart_btn")

// ================================= Calander Documnet

let month                 = document.querySelector(".month")
let day                   = document.querySelector(".day")
let year                  = document.querySelector(".year")

// ================================= Clock Time Part 

setInterval(() => {

    let currentTime       = new Date()

    hours      .innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours()
    minutes    .innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes()
    seconds    .innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds()

}, 1000);

// ================================= Calendar Part

let today                 = new Date()
let Months                = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

month.innerHTML           = Months[today.getMonth()]
day.innerHTML             = today.getDate()
year.innerHTML            = today.getFullYear()

// ================================= Stop Watch Part

// ------- stop watch creat element 
let stopWatchSection      = document.createElement("div")
// ------- stop watch append child 
clock.appendChild(stopWatchSection)

// ================================= Stop Watch On/Off Start

let stopWatchOnOff = true 

swOnOffButton.addEventListener("click", () => {

    if (stopWatchOnOff) {

        let [minute, second, miliSecond] = [("0" + 0), ("0" + 0), ("0" + 0)]
        stopWatchSection             .innerHTML = minute + " : " + second + " : " + miliSecond
        swStartStopButton            .disabled = false

        // ----------- stop watch class list 
        stopWatchSection.classList.add("stopWatch_section")

        // ========================= Stop Watch Start/Stop Toggle Part
        let running = true
        let pause

        swStartStopButton.addEventListener("click", () => {

            if (running) {

                swStartStopButton       .style = "background-color: #ff0000"
                swOnOffButton           .disabled = true
                swOnOffButton           .style = "cursor: not-allowed"

                pause = setInterval(() => {

                    stopWatchSection.innerHTML = minute + " : " + second + " : " + miliSecond
                    miliSecond++
           
                    // mili-second 
                    if (miliSecond == 100) {
                        miliSecond = 0
                        
                        // second 
                        second++
                        if (second == 60) {
                            second = 0

                            // minute 
                            minute++
                            // minute < 10
                            if (minute < 10) {
                                minute = "0" + minute
                            }

                        // second < 10
                        } else if (second < 10) {
                            second = "0" + second
                        }

                    // mili-second < 10
                    } else if (miliSecond < 10) {
                        miliSecond = "0" + miliSecond
                    }

                }, 10);

                // ------------- restart button event (while running)
                swRestartButton.addEventListener("click", () => {

                    [minute, second, miliSecond] = [("0" + 0), ("0" + 0), ("0" + 0)]
                    stopWatchSection             .innerHTML = minute + " : " + second + " : " + miliSecond
                    swOnOffButton                .disabled = false
                    swOnOffButton                .style = "cursor: pointer"
                    swStartStopButton            .style = "background-color: #009900"
                    running = true
                    clearInterval(pause)
                })

            } else {

                clearInterval(pause)
                swStartStopButton        .style = "background-color: #009900"
                swOnOffButton            .disabled = false
                swOnOffButton            .style = "cursor: pointer"

                // ------------- restart button event (while stopped)
                swRestartButton.addEventListener("click", () => {
        
                    [minute, second, miliSecond] = [("0" + 0), ("0" + 0), ("0" + 0)]
                    stopWatchSection             .innerHTML = minute + " : " + second + " : " + miliSecond
                    swStartStopButton            .style = "background-color: #009900"
                    clearInterval(pause)
                })
            }

            running = !running // start stop toggle of stop watch
        })

    } else {

        stopWatchSection         .classList.remove("stopWatch_section")
        swStartStopButton        .disabled = true
        swStartStopButton        .style = "background-color: #009900"
    }

    stopWatchOnOff = !stopWatchOnOff // on off toggle of stop watch
})


