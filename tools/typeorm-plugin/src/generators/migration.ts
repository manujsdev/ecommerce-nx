import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  readJson,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit';
import * as path from 'path';
import { MigrationGeneratorSchema } from './schema';

async function initMigrationTarget(
  tree: Tree,
  options: MigrationGeneratorSchema
): Promise<void> {
  const project = readProjectConfiguration(tree, options.name);
  console.log('project', project);

  // Check if the project already has a migration target
  if (!project?.targets) {
    project.targets = {};
  }

  if (!project.sourceRoot) {
    throw new Error(`Project ${options.name} does not have a source root.`);
  }
  project.targets['migration'] = {
    executor: '@ecommerce-nx/typeorm-plugin:migration',
    options: {
      tsConfig: path.join(project.root, 'tsconfig.lib.json'),
      datasource: path.join(project.sourceRoot, 'config/datasource.ts'),
      migrations: '',
    },
  };

  updateProjectConfiguration(tree, options.name, project);
}

export async function migrationGenerator(
  tree: Tree,
  options: MigrationGeneratorSchema
) {
  // const projectRoot = `libs/${options.name}`;
  // addProjectConfiguration(tree, options.name, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {},
  // });
  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  // await formatFiles(tree);
  const packageJson = readJson(tree, 'package.json');
  console.log('packageJson: ', packageJson);
  const project = readProjectConfiguration(tree, options.name);
  // console.log('project: ', project);
  generateFiles(tree, path.join(__dirname, 'files'), project.root, options);

  await initMigrationTarget(tree, options);
}

export default migrationGenerator;
