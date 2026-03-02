import * as migration_20260302_224946_migration from './20260302_224946_migration';

export const migrations = [
  {
    up: migration_20260302_224946_migration.up,
    down: migration_20260302_224946_migration.down,
    name: '20260302_224946_migration'
  },
];
