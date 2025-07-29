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
  pgm.createTable("appointments", {
    id: {
      type: "serial",
      notNull: true,
      primaryKey: true,
    },
    patient_id: {
      type: "integer",
      notNull: true,
      references: "patients",
      onDelete: "cascade",
    },
    doctor_id: {
      type: "integer",
      notNull: true,
      references: "doctors",
      onDelete: "cascade",
    },
    date_time: {
      type: "timestamp",
      notNull: true,
    },
    status: {
      type: "varchar",
      notNull: true,
      default: "pending",
    },
    visting_reason: {
      type: "text",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: "now()",
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: "now()",
    }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
