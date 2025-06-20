let secondsLeft = 25*60
let interval = null
let breakCounter = 0
var isWorkSession = true

const workTime = 25*60
const shortBreak = 5*60
const longBreak = 15*60

const time = document.getElementById("time")
const header = document.getElementById("header")  
const work = document.getElementById("work")
const cycle = document.getElementById("cycle")

function padStart(value) {
    return String(value).padStart(2,"0")
}

function setTime(){
    const minutes = Math.floor(secondsLeft/60)
    const seconds = secondsLeft % 60
    time.innerHTML = `${padStart(minutes)}:${padStart(seconds)}`
}

function timer(){
    secondsLeft--
    setTime()

    if (secondsLeft <= 0){
        pauseTimer()
        playSound()
        isWorkSession = !isWorkSession
        if (isWorkSession){
        secondsLeft = workTime
        work.innerHTML = "Time to work!"
        cycle.innerHTML = "Cycle #"+(breakCounter+1)
        } else {
            breakCounter++
            if (breakCounter%4 === 0 && breakCounter > 0){
                secondsLeft = longBreak
                work.innerHTML = "Time for a long break!"
                
            } else {
                secondsLeft = shortBreak
                work.innerHTML = "Time to rest!"
            }
        }
    }
}

function startTimer(){
    if (interval) pauseTimer() 
    interval = setInterval(timer,1000)
}

function pauseTimer(){
    clearInterval(interval)
    interval = null
}

function playSound(){
    var alarm = new Audio("./alarm.mp3");
    alarm.play();
}



document.getElementById("start").addEventListener("click", startTimer)
document.getElementById("pause").addEventListener("click", pauseTimer)

work.innerHTML = "Time to work"
cycle.innerHTML = "Cycle #"+(breakCounter+1)

setTime();