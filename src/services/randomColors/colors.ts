function getRandomColor(): string {
    const colors = ['#b4dcd7b5', '#c8ebc3b5', '#fadc87b5', '#facdd7b5', '#aac8d7b5', '#ffaf96b5',];
    return colors[Math.floor(Math.random() * colors.length)]
}

export default getRandomColor;