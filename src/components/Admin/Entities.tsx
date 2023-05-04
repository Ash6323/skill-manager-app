export interface Employee {
    id: string,
    userName: string,
    fullName: string,
    gender: string,
    phoneNumber: string,
    email: string,
    isActive: number,
    address: string,
    zipcode: string,
    dateOfBirth: Date,
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
    address: string,
    zipcode: string,
    dateOfBirth: string,
    previousOrganisation: string,
    previousDesignation: string,
}
export interface Skill {
    id: number,
    skillName: string,
}
export interface SkillExpertise {
    id: number,
    skillName: string,
    expertise: string,
}
export interface EmployeeSkills {
    employeeId: string,
    employeeName: string,
    employeeSkills: SkillExpertise[],
}
export interface EmployeeSkillMap {
    employeeId: string,
    skillId: number,
    expertise: string,
}

