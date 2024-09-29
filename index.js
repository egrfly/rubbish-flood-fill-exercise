let mouseDown = false
let editMode = null

document.addEventListener("mousedown", () => {
  mouseDown = true
})

document.addEventListener("mouseup", () => {
  mouseDown = false
})

const canvas = document.getElementById("canvas")
const canvasSize = 40

const getSquareAtPosition = (rowIndex, colIndex) => {
  return canvas.querySelector(`[data-row="${rowIndex}"][data-col="${colIndex}"]`)
}

const fill = (square) => {
  square.classList.add("filled")
}

const isFilled = (square) => {
  return square.classList.contains("filled")
}

const floodFill = (rowIndex, colIndex) => {
  const square = getSquareAtPosition(rowIndex, colIndex)
  // Fill this in
}

const rows = Array
  .from({ length: canvasSize }, (_, index) => index)
  .map((rowIndex) => {
    const row = document.createElement("div")
    row.classList.add("row")
    const cols = Array
      .from({ length: canvasSize }, (_, index) => index)
      .map((colIndex) => {
        const col = document.createElement("div")
        col.classList.add("col")
        col.setAttribute("data-row", rowIndex)
        col.setAttribute("data-col", colIndex)
        col.addEventListener("mouseover", () => {
          if (mouseDown && editMode === "pen") {
            fill(col)
          }
        })
        col.addEventListener("click", () => {
          if (editMode === "bucket") {
            floodFill(rowIndex, colIndex)
          }
        })
        return col
      })
    cols.forEach((col) => row.appendChild(col))
    return row
  })
rows.forEach((row) => canvas.appendChild(row))

const pen = document.getElementById("pen")
const bucket = document.getElementById("bucket")

pen.addEventListener("click", () => {
  if (pen.classList.contains("active")) {
    pen.classList.remove("active")
    editMode = null
  } else {
    pen.classList.add("active")
    bucket.classList.remove("active")
    editMode = "pen"
  }
})

bucket.addEventListener("click", () => {
  if (bucket.classList.contains("active")) {
    bucket.classList.remove("active")
    editMode = null
  } else {
    bucket.classList.add("active")
    pen.classList.remove("active")
    editMode = "bucket"
  }
})
