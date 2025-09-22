import React, { useState } from 'react';

// Predefined categories. You can customise this list to suit your needs.
const categories = [
  'Food',
  'Rent',
  'Transport',
  'Utilities',
  'Entertainment',
  'Others',
];

function ExpenseForm({ onSave }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      alert('Please fill in all required fields');
      return;
    }
    onSave({
      description,
      amount: parseFloat(amount),
      category,
      date,
    });
    // Clear form
    setDescription('');
    setAmount('');
    setDate('');
    setCategory(categories[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        aria-label="Description"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        step="0.01"
        aria-label="Amount"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Category"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        aria-label="Date"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;