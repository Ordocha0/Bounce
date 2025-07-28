/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => 
  {
    pgm.createTable("patients", {
      id: {
        type: "serial",
        notNull: true,
        primaryKey: true,
      },
      name: {
        type: "text",
        notNull: true,
      },
      email: {
        type: "varchar",
        notNull: true,
        unique: true,
      },
      password: {
        type: "varchar",
        notNull: true,
      },
      reset_code: {
        type: "varchar",
        notNull: false,
      },
      code_expires_at: {
        type: "timestamp",
        notNull: false,
      },
      phone: {
        type: "varchar",
        notNull: false,
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      updated_at: {
        type: "timestamp",
        notNull: false,
        default: pgm.func("current_timestamp"),
      },
      gender: {
        type: "varchar",
        notNull: false,
      },
      dob: {
        type: "date",
        notNull: false,
      },
      address: {
        type: "varchar",
        notNull: false,
      },
      emergency_contact: {
        type: "jsonb",
        notNull: false,
      },
      blood_group: {
        type: "varchar",
        notNull: false,
      },
      allergies: {
        type: "varchar",
        notNull: false,
      },
      chronic_conditions: {
        type: "varchar",
        notNull: false,
      },
      current_medications: {
        type: "varchar",
        notNull: false,
      },
      profile_photo: {
        type: "varchar",
        notNull: false,
      }
    });
  };

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("patients");
};
