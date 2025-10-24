import { Injectable } from '@nestjs/common';

require('dotenv').config();

@Injectable()
export class DatabaseConfig {
  host: string;

  constructor() {
    const user = process.env.DATABASE_USER || 'sa';
    const pass = process.env.DATABASE_PASSWORD || 'password';
    const host = process.env.DATABASE_HOST || 'localhost';
    const port = process.env.DATABASE_PORT || '1433';
    const db = process.env.DATABASE_NAME || 'wim_dev';

    this.host = `mssql://${user}:${pass}@${host}:${port}/${db}`;
  }
}

@Injectable()
export class EcmWimConfig {
  host: string;

  constructor() {
    this.host = process.env.ECM_HOST || 'localhost';
  }
}
