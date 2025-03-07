# typeorm-plugin

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build typeorm-plugin` to build the library.

## Usage

### Generator

Add required configurations/files on target project:

```sh
npx nx generate @ecommerce-platform/typeorm-plugin:migration --project={{name}}
```

Once command ran, you will verify following file changes on your project directory:

```sh
# output
./packages/{{name}}/
├── project.json          # Add target `migration using typeorm-plugin:migration executor
├── src/
│   ├── config/
│   │   ├── datasource.ts # Add file typeorm datasource instance
```

Please update `datasource.ts` properties based on your database settings

```ts
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: '', // Add your database's name
  entities: [], // Add your entities files
  migrations: [], // Add your migrations files
  migrationsTableName: 'migrations',
});
```

Please update `project.json` properties based on your settings

```jsonC
// project.json
{
  "targets": {
    "migration": {
      "executor": "@yumi-reports/typeorm-plugin:migration",
      "options": {
        "tsConfig": "libs/{{project}}/tsconfig.lib.json",
        "datasource": "libs/{{project}}/src/config/datasource.ts",
        "migrations": "to/migration/directory/path"
      }
    }
  }
}
```

### Executor

Once all required configurations & files are properly setup, you could run a migration command, so this command could:

1. Generate a migration files based on your Entity Changes
2. Generate a migration empty file
3. Otherwise, it will throw an error

```sh
npx nx run datasource:migration --name={{FileMigrationName}}
```

## Running unit tests

Run `nx test typeorm-plugin` to execute the unit tests via [Jest](https://jestjs.io).
