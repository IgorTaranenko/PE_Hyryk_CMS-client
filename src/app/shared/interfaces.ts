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
export interface Position {
    _id?: string,
    category?: string,
    name: string,
    cost: number,
    units: string,
    user?: string
}