import React, { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions debe usarse dentro de TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories] = useState([
    { id: 1, name: 'Comida', icon: 'food', color: '#ef4444', type: 'expense' },
    { id: 2, name: 'Transporte', icon: 'car', color: '#f59e0b', type: 'expense' },
    { id: 3, name: 'Entretenimiento', icon: 'movie', color: '#8b5cf6', type: 'expense' },
    { id: 4, name: 'Salud', icon: 'hospital', color: '#ec4899', type: 'expense' },
    { id: 5, name: 'Compras', icon: 'shopping', color: '#06b6d4', type: 'expense' },
    { id: 6, name: 'Educación', icon: 'school', color: '#10b981', type: 'expense' },
    { id: 7, name: 'Hogar', icon: 'home', color: '#64748b', type: 'expense' },
    { id: 8, name: 'Otros Gastos', icon: 'dots-horizontal', color: '#6b7280', type: 'expense' },
    { id: 9, name: 'Salario', icon: 'cash', color: '#22c55e', type: 'income' },
    { id: 10, name: 'Bono', icon: 'gift', color: '#10b981', type: 'income' },
    { id: 11, name: 'Freelance', icon: 'briefcase', color: '#14b8a6', type: 'income' },
    { id: 12, name: 'Otros Ingresos', icon: 'plus-circle', color: '#84cc16', type: 'income' },
  ]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updatedData } : t)
    );
  };

  const getBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' 
        ? acc + parseFloat(transaction.amount)
        : acc - parseFloat(transaction.amount);
    }, 0);
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
  };

  const getTransactionsByCategory = () => {
    const categoryMap = {};
    
    transactions.forEach(transaction => {
      const categoryName = transaction.category;
      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = {
          name: categoryName,
          total: 0,
          count: 0,
          type: transaction.type,
          color: categories.find(c => c.name === categoryName)?.color || '#6b7280',
        };
      }
      categoryMap[categoryName].total += parseFloat(transaction.amount);
      categoryMap[categoryName].count += 1;
    });

    return Object.values(categoryMap).sort((a, b) => b.total - a.total);
  };

  const getRecentTransactions = (limit = 5) => {
    return transactions.slice(0, limit);
  };

  const value = {
    transactions,
    categories,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getBalance,
    getTotalIncome,
    getTotalExpenses,
    getTransactionsByCategory,
    getRecentTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};