export class Role {
    
    roleId: number;
    role: string;

    constructor(roleId: number, role: string) {
        this.roleId = roleId; // primary key
        this.role = role; // not null, unique
    }
}