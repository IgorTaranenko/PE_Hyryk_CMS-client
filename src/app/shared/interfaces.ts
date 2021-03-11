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
    categoryID?: string,
    cost: number,
    units: string,
    user?: string
}