import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTransactions } from '../hooks/useTransactions';

const TransactionsScreen = () => {
    const { transactions, categories, deleteTransaction } = useTransactions();
    const [filter, setFilter] = useState('all');

    const formatCurrency = (amount) => {
        return `$${parseFloat(amount).toFixed(2)}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleDelete = (id, category) => {
        Alert.alert(
            'Eliminar Transacción',
            `¿Estás seguro de eliminar esta transacción de ${category}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => deleteTransaction(id),
                },
            ]
        );
    };

    const filteredTransactions = transactions.filter(transaction => {
        if (filter === 'all') return true;
        return transaction.type === filter;
    });

    const renderTransaction = ({ item }) => {
        const category = categories.find(c => c.name === item.category);
        const isExpense = item.type === 'expense';

        return (
            <View style={styles.transactionCard}>
                <View style={styles.transactionContent}>
                    <View style={[styles.iconContainer, { backgroundColor: category?.color + '20' }]}>
                        <Icon
                            name={category?.icon || 'cash'}
                            size={28}
                            color={category?.color || '#6b7280'}
                        />
                    </View>

                    <View style={styles.transactionInfo}>
                        <Text style={styles.transactionCategory}>{item.category}</Text>
                        <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
                        {item.note && (
                            <Text style={styles.transactionNote} numberOfLines={1}>
                                {item.note}
                            </Text>
                        )}
                    </View>

                    <View style={styles.transactionRight}>
                        <Text style={[
                            styles.transactionAmount,
                            { color: isExpense ? '#ef4444' : '#22c55e' }
                        ]}>
                            {isExpense ? '-' : '+'}{formatCurrency(item.amount)}
                        </Text>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(item.id, item.category)}
                        >
                            <Icon name="delete-outline" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        filter === 'all' && styles.filterButtonActive,
                    ]}
                    onPress={() => setFilter('all')}
                >
                    <Text style={[
                        styles.filterText,
                        filter === 'all' && styles.filterTextActive,
                    ]}>
                        Todas
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        filter === 'income' && styles.filterButtonActive,
                        filter === 'income' && { backgroundColor: '#dcfce7' },
                    ]}
                    onPress={() => setFilter('income')}
                >
                    <Text style={[
                        styles.filterText,
                        filter === 'income' && { color: '#22c55e' },
                    ]}>
                        Ingresos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        filter === 'expense' && styles.filterButtonActive,
                        filter === 'expense' && { backgroundColor: '#fee2e2' },
                    ]}
                    onPress={() => setFilter('expense')}
                >
                    <Text style={[
                        styles.filterText,
                        filter === 'expense' && { color: '#ef4444' },
                    ]}>
                        Gastos
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Transactions List */}
            {filteredTransactions.length > 0 ? (
                <FlatList
                    data={filteredTransactions}
                    renderItem={renderTransaction}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Icon name="inbox" size={80} color="#cbd5e1" />
                    <Text style={styles.emptyStateText}>
                        No hay transacciones
                    </Text>
                    <Text style={styles.emptyStateSubtext}>
                        {filter === 'all'
                            ? 'Comienza agregando una transacción'
                            : `No tienes ${filter === 'income' ? 'ingresos' : 'gastos'} registrados`
                        }
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    filterContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 8,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    filterButtonActive: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    filterTextActive: {
        color: '#ffffff',
    },
    listContent: {
        padding: 16,
        paddingTop: 0,
    },
    transactionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    transactionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionCategory: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 2,
    },
    transactionNote: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 2,
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    deleteButton: {
        padding: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#64748b',
        marginTop: 16,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#94a3b8',
        marginTop: 8,
        textAlign: 'center',
    },
});

export default TransactionsScreen;