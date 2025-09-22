import React from 'react';

function ExpenseList({ expenses, onDelete, onUpdate }) {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(id);
    }
  };

  const handleEdit = (expense) => {
    const description = prompt('Edit description', expense.description);
    if (description === null) return;
    const amountStr = prompt('Edit amount', expense.amount);
    if (amountStr === null) return;
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
      alert('Invalid amount');
      return;
    }
    const category = prompt('Edit category', expense.category);
    if (category === null) return;
    const date = prompt('Edit date (YYYY-MM-DD)', expense.date);
    if (date === null) return;
    onUpdate(expense.id, {
      description,
      amount,
      category,
      date,
    });
  };

  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.date}</td>
                <td>{exp.description}</td>
                <td>${exp.amount.toFixed(2)}</td>
                <td>{exp.category}</td>
                <td>
                  <button
                    className="action edit"
                    onClick={() => handleEdit(exp)}
                  >
                    Edit
                  </button>
                  <button
                    className="action delete"
                    onClick={() => handleDelete(exp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;