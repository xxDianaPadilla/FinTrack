import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTransactions } from '../hooks/useTransactions';

const HomeScreen = ({ navigation }) => {
  const {
    getBalance,
    getTotalIncome,
    getTotalExpenses,
    getRecentTransactions,
    categories,
  } = useTransactions();

  const balance = getBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const recentTransactions = getRecentTransactions();

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  };

  const renderTransaction = ({ item }) => {
    const category = categories.find(c => c.name === item.category);
    const isExpense = item.type === 'expense';

    return (
      <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: category?.color + '20' }]}>
          <Icon
            name={category?.icon || 'cash'}
            size={24}
            color={category?.color || '#6b7280'}
          />
        </View>

        <View style={styles.transactionInfo}>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
          {item.note && <Text style={styles.transactionNote}>{item.note}</Text>}
        </View>

        <Text style={[
          styles.transactionAmount,
          { color: isExpense ? '#ef4444' : '#22c55e' }
        ]}>
          {isExpense ? '-' : '+'}{formatCurrency(item.amount)}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Balance Total</Text>
        <Text style={[
          styles.balanceAmount,
          { color: balance >= 0 ? '#22c55e' : '#ef4444' }
        ]}>
          {formatCurrency(balance)}
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: '#dcfce7' }]}>
              <Icon name="arrow-down" size={20} color="#22c55e" />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Ingresos</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(income)}</Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: '#fee2e2' }]}>
              <Icon name="arrow-up" size={20} color="#ef4444" />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Gastos</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(expenses)}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Add Transaction Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Icon name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Nueva Transacción</Text>
      </TouchableOpacity>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transacciones Recientes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Transacciones')}>
            <Text style={styles.seeAllText}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.length > 0 ? (
          <FlatList
            data={recentTransactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Icon name="inbox" size={64} color="#cbd5e1" />
            <Text style={styles.emptyStateText}>No hay transacciones aún</Text>
            <Text style={styles.emptyStateSubtext}>
              Comienza agregando tu primera transacción
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  balanceCard: {
    backgroundColor: '#6366f1',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  balanceLabel: {
    color: '#e0e7ff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  summaryLabel: {
    color: '#e0e7ff',
    fontSize: 12,
    marginBottom: 4,
  },
  summaryAmount: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: '#6366f1',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  seeAllText: {
    color: '#6336f1',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#94a3b8'
  },
  transactionNote: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
  },
});

export default HomeScreen;