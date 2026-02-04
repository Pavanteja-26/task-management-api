const pool = require('../config/database');

class Task {
  static async create({ title, description, status = 'pending', priority = 'medium', user_id }) {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, priority, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, status, priority, user_id]
    );
    return result.rows[0];
  }

  static async findAll(userId, isAdmin) {
    let query = 'SELECT t.*, u.name as user_name, u.email as user_email FROM tasks t JOIN users u ON t.user_id = u.id';
    const params = [];

    if (!isAdmin) {
      query += ' WHERE t.user_id = $1';
      params.push(userId);
    }

    query += ' ORDER BY t.created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findById(id, userId, isAdmin) {
    let query = 'SELECT t.*, u.name as user_name, u.email as user_email FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.id = $1';
    const params = [id];

    if (!isAdmin) {
      query += ' AND t.user_id = $2';
      params.push(userId);
    }

    const result = await pool.query(query, params);
    return result.rows[0];
  }

  static async update(id, userId, isAdmin, { title, description, status, priority }) {
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(status);
    }
    if (priority !== undefined) {
      updates.push(`priority = $${paramCount++}`);
      values.push(priority);
    }

    if (updates.length === 0) return null;

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    let query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${paramCount}`;

    if (!isAdmin) {
      values.push(userId);
      query += ` AND user_id = $${paramCount + 1}`;
    }

    query += ' RETURNING *';

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id, userId, isAdmin) {
    let query = 'DELETE FROM tasks WHERE id = $1';
    const params = [id];

    if (!isAdmin) {
      query += ' AND user_id = $2';
      params.push(userId);
    }

    query += ' RETURNING id';

    const result = await pool.query(query, params);
    return result.rows[0];
  }

  static async getStats(userId, isAdmin) {
    let query = `
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed
      FROM tasks
    `;

    const params = [];
    if (!isAdmin) {
      query += ' WHERE user_id = $1';
      params.push(userId);
    }

    const result = await pool.query(query, params);
    return result.rows[0];
  }
}

module.exports = Task;
