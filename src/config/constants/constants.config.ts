import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import variables from 'src/settings';
import { IDatabaseVariable } from 'src/shared/types/system.types';

export const dbOptions = (database: IDatabaseVariable): DataSourceOptions => ({
  port: database.DB_PORT,
  host: database.DB_HOST,
  database: database.DB_NAME,
  username: database.DB_USERNAME,
  password: database.DB_PASSWORD,
  extra: {
    idleTimeoutMillis: 20000,
  },
  poolSize: 20,
  type: database.DB_TYPE,
  installExtensions: true,
});

export const HTTPS: boolean = variables.SSL;

export const environment: string = process.env.NODE_ENV;

export const defaultLanguage: string = 'pt';

export const typeOrmModuleOptions = (database: IDatabaseVariable): TypeOrmModuleOptions => ({
  ...dbOptions(database),
  retryAttempts: 3,
  retryDelay: 5000,
  synchronize: database.SINCRONIZE && environment === 'development',
  entities: [join(__dirname, '..', '..', 'entities', database.FOLDER_NAME, '*.entity.js')],
  migrations: [join(__dirname, '..', '..', 'migrations', database.FOLDER_NAME, '*.migration.js')],
});

export const typeormErrors: string[] = [
  'CannotReflectMethodParameterTypeError',
  'AlreadyHasActiveConnectionError',
  'SubjectWithoutIdentifierError',
  'CannotConnectAlreadyConnectedError',
  'LockNotSupportedOnGivenDriverError',
  'ConnectionIsNotSetError',
  'CannotCreateEntityIdMapError',
  'MetadataAlreadyExistsError',
  'CannotDetermineEntityError',
  'UpdateValuesMissingError',
  'TreeRepositoryNotSupportedError',
  'CustomRepositoryNotFoundError',
  'TransactionNotStartedError',
  'TransactionAlreadyStartedError',
  'EntityNotFoundError',
  'EntityMetadataNotFoundError',
  'MustBeEntityError',
  'OptimisticLockVersionMismatchError',
  'LimitOnUpdateNotSupportedError',
  'PrimaryColumnCannotBeNullableError',
  'CustomRepositoryCannotInheritRepositoryError',
  'QueryRunnerProviderAlreadyReleasedError',
  'CannotAttachTreeChildrenEntityError',
  'CustomRepositoryDoesNotHaveEntityError',
  'MissingDeleteDateColumnError',
  'NoConnectionForRepositoryError',
  'CircularRelationsError',
  'ReturningStatementNotSupportedError',
  'UsingJoinTableIsNotAllowedError',
  'MissingJoinColumnError',
  'MissingPrimaryColumnError',
  'EntityPropertyNotFoundError',
  'MissingDriverError',
  'DriverPackageNotInstalledError',
  'CannotGetEntityManagerNotConnectedError',
  'ConnectionNotFoundError',
  'NoVersionOrUpdateDateColumnError',
  'InsertValuesMissingError',
  'OptimisticLockCanNotBeUsedError',
  'MetadataWithSuchNameAlreadyExistsError',
  'DriverOptionNotSetError',
  'FindRelationsNotFoundError',
  'NamingStrategyNotFoundError',
  'PessimisticLockTransactionRequiredError',
  'RepositoryNotTreeError',
  'DataTypeNotSupportedError',
  'InitializedRelationError',
  'MissingJoinTableError',
  'QueryFailedError',
  'NoNeedToReleaseEntityManagerError',
  'UsingJoinColumnOnlyOnOneSideAllowedError',
  'UsingJoinTableOnlyOnOneSideAllowedError',
  'SubjectRemovedAndUpdatedError',
  'PersistedEntityNotFoundError',
  'UsingJoinColumnIsNotAllowedError',
  'ColumnTypeUndefinedError',
  'QueryRunnerAlreadyReleasedError',
  'OffsetWithoutLimitNotSupportedError',
  'CannotExecuteNotConnectedError',
  'NoConnectionOptionError',
  'TypeORMError',
  'ForbiddenTransactionModeOverrideError',
];
