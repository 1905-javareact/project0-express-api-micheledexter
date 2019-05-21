import { Role } from '../models/role';
import { RoleDTO } from '../dto/role.dto';
import { UserDTO } from '../dto/user.dto';
import { getRoleByIdService } from '../service/role.service';
import { User } from '../models/user';
import { ReimbursementDTO } from '../dto/reimbursement.dto';
import { Reimbursement } from '../models/reimbursement';

export function sqlRoleToJsRole(sqlRole:RoleDTO): Role {
    return new Role(sqlRole.id, sqlRole.user_role);
}

export function sqlReimbursementToJsReimbursement(sqlReimbursement: ReimbursementDTO): Reimbursement {
    let submitted: number = sqlReimbursement.date_submitted.getTime();
    let resolved: number = sqlReimbursement.date_resolved ? sqlReimbursement.date_resolved.getTime() : -1;
    return new Reimbursement(sqlReimbursement.id, sqlReimbursement.author_id, sqlReimbursement.amount, submitted, resolved, sqlReimbursement.description, sqlReimbursement.resolver_id, sqlReimbursement.status_id, sqlReimbursement.type_id);
}

export async function sqlUserToJsUserSupport(role_id): Promise<Role> {
    let role: Role = await getRoleByIdService(role_id);
    return role;
}

export async function sqlUserToJsUser(sqlUser:UserDTO): Promise<User> {
    let role = await sqlUserToJsUserSupport(sqlUser.role_id);
    return new User(sqlUser.id, sqlUser.username, sqlUser.user_pass, sqlUser.first_name, sqlUser.last_name, sqlUser.email, role);
}

export function epochDateToStringDate(date: number): string {
    let fullDate = new Date(date);
    return (fullDate.getMonth()+1) + '/' + fullDate.getDate() + '/' + fullDate.getFullYear();
}

export function stringDateToEpochDate(date: string): number {
    return new Date(date).getTime();
}

export function jsReimbursementToSqlParams(reimbursement: Reimbursement, includeId: boolean): any[] {
    let params: any[] = [];
    params.push(reimbursement.author);
    params.push(reimbursement.amount);
    params.push(epochDateToStringDate(reimbursement.dateSubmitted));
    params.push(epochDateToStringDate(reimbursement.dateResolved));
    params.push(reimbursement.description);
    params.push(reimbursement.resolver);
    params.push(reimbursement.status);
    params.push(reimbursement.type);
    if (includeId) params.push(reimbursement.reimbursementId);
    return params;
}