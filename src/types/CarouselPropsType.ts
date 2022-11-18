export type CarouselProps = {
    title?: string
    maxWidth?: string
    isDataFetching?: boolean
    options?: CarouselOptions
    children?: any
}

export type CarouselOptions = {
    animationSpeed?: string
    maxItemsPerSlide?: number
    minGap?: number
    mode?: string
}