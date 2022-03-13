const getPaginationIndex = (currentPage: string | null | undefined|number, limit: string | null | undefined|number, index: number): number => {
    return (Number(currentPage) - 1) * Number(limit) + (index + 1)
}

export default getPaginationIndex;