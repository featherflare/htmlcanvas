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

function resolveCollision(x1, y1, x2, y2, size1, size2) {
  if (
    x2 + size2 >= x1 &&
    x2 <= x1 + size1 &&
    y2 + size2 >= y1 &&
    y2 <= y1 + size1
  ) {
    return true
  }
}

// Objects
function Rect(x, y, size, color) {
  this.x = x
  this.y = y
  this.size = size
  this.color = color

  this.draw = function () {
    c.beginPath()
    c.fillRect(this.x, this.y, this.size, this.size)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  this.update = function () {
    this.draw()
  }
}

// Implementation
let rect1
let rect2
function init() {
  rect1 = new Rect(300, 300, 100, 'black')
  rect2 = new Rect(undefined, undefined, 100, 'red')

  // for (let i = 0; i < 400; i++) {
  //   // objects.push()
  // }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  rect1.update()
  rect2.x = mouse.x
  rect2.y = mouse.y
  rect2.update()

  if (
    resolveCollision(rect1.x, rect1.y, rect2.x, rect2.y, rect1.size, rect2.size)
  ) {
    rect1.color = 'red'
  } else {
    rect1.color = 'black'
  }
  console.log(
    resolveCollision(rect1.x, rect1.y, rect2.x, rect2.y, rect1.size, rect2.size)
  )
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
