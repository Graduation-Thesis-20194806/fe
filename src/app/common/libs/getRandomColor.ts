const getRandomColor = () => {
  const red = Math.floor(Math.random() * 156)
  const green = Math.floor(Math.random() * 156) + 10
  const blue = Math.floor(Math.random() * 156) + 100

  return `rgb(${red},${green},${blue})`
}

export default getRandomColor
