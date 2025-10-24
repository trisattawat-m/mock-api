import { Injectable } from '@nestjs/common';

require('dotenv').config();

@Injectable()
export class MsSQLConfig {
  host: string;

  constructor() {
    const user = process.env.MSSQL_USER || 'sa';
    const pass = process.env.MSSQL_PASSWORD || 'password';
    const host = process.env.MSSQL_HOST || 'localhost';
    const port = process.env.MSSQL_PORT || '1433';
    const db = process.env.MSSQL_DATABASE || 'wim_dev';

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
