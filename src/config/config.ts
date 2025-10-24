import { Injectable } from '@nestjs/common';

require('dotenv').config();

@Injectable()
export class DatabaseConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  db_name: string;

  constructor() {
    const user = process.env.DATABASE_USER || 'sa';
    const pass = process.env.DATABASE_PASSWORD || 'password';
    const host = process.env.DATABASE_HOST || 'localhost';
    const port = process.env.DATABASE_PORT || '1433';
    const db = process.env.DATABASE_NAME || 'master';

    this.host = host;
    this.port = port;
    this.username = user;
    this.password = pass;
    this.db_name = db;
  }
}

@Injectable()
export class EcmWimConfig {
  host: string;

  constructor() {
    this.host = process.env.ECM_HOST || 'localhost';
  }
}
