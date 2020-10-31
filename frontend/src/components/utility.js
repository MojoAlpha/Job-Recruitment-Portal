export const getImageName = (url = '') => {
    if (url.split('\\').length > 1)
        return url.split('\\').pop()
    return url.split('/').pop()

}