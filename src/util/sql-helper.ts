export function schema(): string {
    if (process.env.RDS_USE === 'true') {
        return process.env.RDS_SCHEMA;
    } else {
        return process.env.DEVEL_SCHEMA;
    }
}