/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("doctors", {
    id: {
      type: "serial",
      primaryKey: true,
      notNull: true,
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
    gender: {
      type: "varchar",
      notNull: false,
    },
    address: {
      type: "varchar",
      notNull: false,
    },
    ratings: {
      type: "float",
      notNull: false,
    },
    patients: {
      type: "integer",
      notNull: false,
    },
    dob: {
      type: "date",
      notNull: false,
    },
    specialization: {
      type: "varchar",
      notNull: false,
    },
    license_number: {
      type: "varchar",
      notNull: false,
      unique: true,
    },
    license_issuer: {
      type: "varchar",
      notNull: false,
    },
    license_expiry: {
      type: "date",
      notNull: false,
    },
    practice_address: {
      type: "varchar",
      notNull: false,
    },
    available_days: {
      type: "varchar",
      notNull: false,
    },
    available_times: {
      type: "varchar",
      notNull: false,
    },
    years_of_experience: {
      type: "integer",
      notNull: false,
    },
    education: {
      type: "jsonb", 
      notNull: false,
    },
    documents: {
      type: "jsonb",
      notNull: false,
    },
    profile_photo: {
      type: "varchar",
      notNull: false,
    },
    reports: {
      type: "jsonb",
      notNull: false,
    },
    bio: {
      type: "text",
      notNull: false,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("doctors");
};
