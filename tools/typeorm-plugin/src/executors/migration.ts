import { PromiseExecutor } from '@nx/devkit';
import { MigrationExecutorSchema } from './schema';
import { promisify } from 'util';
import { exec } from 'child_process';

function toMigrationCommand(action: string, options: MigrationExecutorSchema) {
  const command = `./node_modules/typeorm/cli-ts-node-esm migration:${action} ${options.migrations}/${options.name}`;

  switch (action) {
    case 'create':
      return command;
    case 'generate':
      return `${command} --dataSource ${options.datasource}`;
    default:
      throw new Error(`Unsupported typeorm migration action: ${action}`);
  }
}

async function toExecute(command: string) {
  const { stdout, stderr } = await promisify(exec)(command);

  return { stdout, stderr };
}

const runExecutor: PromiseExecutor<MigrationExecutorSchema> = async (
  options
) => {
  console.log('Executor ran for Migration', options);
  const ts = `ts-node --project ${options.tsConfig} -r tsconfig-paths/register`;

  try {
    const generate = toMigrationCommand('generate', options);
    await toExecute(`${ts} ${generate}`);

    return { success: true };
  } catch (error: any) {
    console.error(error?.message);
  }

  try {
    const create = toMigrationCommand('create', options);
    await toExecute(`${ts} ${create}`);

    return { success: true };
  } catch (error: any) {
    console.error(error?.message);
  }

  return {
    success: true,
  };
};

export default runExecutor;
