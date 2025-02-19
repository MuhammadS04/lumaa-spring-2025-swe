const pool = require("../db");

class Task {
  static async createTask(title, description, userId) {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, userId]
    );
    return result.rows[0];
  }

  static async getTasksByUser(userId) {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
    return result.rows;
  }

  static async updateTask(id, updates) {
    const { title, description, isComplete } = updates;
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 RETURNING *",
      [title, description, isComplete, id]
    );
    return result.rows[0];
  }

  static async deleteTask(id) {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  }
}

module.exports = Task;
