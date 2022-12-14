import { noise } from '../../node_modules/@chriscourses/perlin-noise/index.js'
import { randomIntFromRange, randomColor, distance } from './utils.js'

console.log(noise(10))

console.log('test')

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

// Objects
class Circle {
  constructor(x, y, radius, color, offset) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.offset = offset
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    this.x = noise(time + this.offset + 20) * canvas.width
    this.y = noise(time + this.offset) * canvas.height
  }
}

// Implementation
let circles
function init() {
  circles = []
  for (let i = 0; i < 100; i++) {
    circles.push(
      new Circle(-30, -30, 10, `hsl(${Math.random() * 255},100%,50%)`, i * 0.01)
    )
  }
}

let time = 0

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0,0,0,0.01'
  c.fillRect(0, 0, canvas.width, canvas.height)

  // circle.draw()
  // console.log(circle.y)

  circles.forEach((circle) => {
    circle.update()
  })
  time += 0.005
}

init()
animate()
