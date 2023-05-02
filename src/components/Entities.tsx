export interface LoginDTO {
    Username: string,
    Password: string,
}
export interface Employee {
    id: string,
    userName: string,
    fullName: string,
    gender: string,
    phoneNumber: string,
    email: string,
    isActive: number,
}
export interface NewEmployee {
    firstName: string,
    lastName: string,
    userName: string,
    phoneNumber: string,
    email: string,
    password: string,
    gender: string,
}
