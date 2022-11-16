// import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const gravity = 1
const friction = 0.99

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
function Ball(x, y, dy, radius, color) {
  this.x = x
  this.y = y
  this.dy = dy
  this.radius = radius
  this.color = color

  this.update = function () {
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * friction
    } else {
      this.dy += gravity
    }
    this.y += this.dy
    this.draw()
  }

  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }
}

// Implementation
var ball
var ballArray = []
function init() {
  for (var i = 0; i < 500; i++) {
    var x = randomIntFromRange(0, canvas.width)
    var y = randomIntFromRange(0, canvas.height)
    ballArray.push(new Ball(x, y, 2, 30, 'red'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas.width, canvas.height)

  for (var i = 0; i < 500; i++) {
    ballArray[i].update()
  }
}

init()
animate()

console.log('test')
