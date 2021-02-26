export interface User {
    email: string,
    password: string
}
export interface Category {
    _id?: string,
    name: string,
    imgSrc?: string,
    user?: string
}