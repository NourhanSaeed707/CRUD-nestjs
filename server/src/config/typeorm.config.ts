import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Department } from "src/department/entities/department.entity";
import { Employee } from "src/employee/entities/employee.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'task',
        entities: [
            Employee,
            Department
        ],
        synchronize: true,
}