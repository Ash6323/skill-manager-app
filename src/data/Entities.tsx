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
    street: string,
    town: string,
    city: string,
    zipcode: string,
    dateOfBirth: string,
    previousOrganisation: string,
    previousDesignation: string,
}
export interface NewEmployee {
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    email: string,
    password: string,
    gender: string,
    street: string,
    town: string,
    city: string,
    zipcode: string,
    dateOfBirth: string,
    previousOrganisation: string,
    previousDesignation: string,
}
export interface User {
    id: string,
    userName: string,
    fullName: string,
    gender: string,
    phoneNumber: string,
    email: string,
    profilePictureUrl: string,
    isActive: number,
    street: string,
    town: string,
    city: string,
    zipcode: string,
    dateOfBirth: string,
    previousOrganisation: string,
    previousDesignation: string,
}
export interface Skill {
    id: number,
    skillName: string,
    description: string,
}
export interface SkillExpertise {
    id: number,
    skillName: string,
    expertise: number,
}
export interface EmployeeSkills {
    employeeId: string,
    employeeName: string,
    employeeSkills: SkillExpertise[],
}
export interface EmployeeSkillMap {
    employeeId: string,
    skillId: number,
    expertise: number,
}
export interface UpdateEmployee {
    firstName: string,
    lastName: string,
    gender: string,
    phoneNumber: string,
    email: string,
    profilePictureUrl: string,
    street: string,
    town: string,
    city: string,
    zipcode: string,
    dateOfBirth: string,
}
export interface UpdateAdmin {
    userName: string,
    firstName: string,
    lastName: string,
    gender: string,
    phoneNumber: string,
    email: string,
    profilePictureUrl: string,
    street: string,
    town: string,
    city: string,
    zipcode: string,
    dateOfBirth: string,
}

