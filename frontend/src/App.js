import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ChartComponent from './components/ChartComponent';

function App() {
  const [expenses, setExpenses] = useState([]);

  // Base URL for the API. Adjust if your back‑end runs on a different host/port.
  const API_BASE = 'http://localhost:5000/api';

  // Fetch all expenses from the server
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/expenses`);
      // Convert amounts to numbers in case they arrive as strings
      const data = res.data.map((e) => ({ ...e, amount: Number(e.amount) }));
      setExpenses(data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add a new expense
  const addExpense = async (expense) => {
    try {
      await axios.post(`${API_BASE}/expenses`, expense);
      fetchExpenses();
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  // Update an existing expense
  const updateExpense = async (id, updatedExpense) => {
    try {
      await axios.put(`${API_BASE}/expenses/${id}`, updatedExpense);
      fetchExpenses();
    } catch (err) {
      console.error('Error updating expense:', err);
    }
  };

  // Delete an expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_BASE}/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  // Download expenses as CSV
  const downloadCSV = async () => {
    try {
      const res = await axios.get(`${API_BASE}/expenses/csv`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error('Error downloading CSV:', err);
    }
  };

  return (
    <div className="container">
      <h1>Personal Finance Tracker</h1>
      <ExpenseForm onSave={addExpense} />
      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        onUpdate={updateExpense}
      />
      <ChartComponent expenses={expenses} />
      <button className="export" onClick={downloadCSV}>
        Export CSV
      </button>
    </div>
  );
}

export default App;