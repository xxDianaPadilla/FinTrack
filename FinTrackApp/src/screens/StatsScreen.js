import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTransactions } from '../hooks/useTransactions';

const { width } = Dimensions.get('window');

const StatsScreen = () => {
    const {
        transactions,
        getTotalIncome,
        getTotalExpenses,
        getBalance,
        getTransactionsByCategory,
    } = useTransactions();

    const totalIncome = getTotalIncome();
    const totalExpenses = getTotalExpenses();
    const balance = getBalance();
    const categoryData = getTransactionsByCategory();

    const formatCurrency = (amount) => {
        return `$${parseFloat(amount).toFixed(2)}`;
    };

    const expensesByCategory = categoryData.filter(c => c.type === 'expense');
    const incomesByCategory = categoryData.filter(c => c.type === 'income');

    const renderCategoryBar = (item) => {
        const total = item.type === 'expense' ? totalExpenses : totalIncome;
        const percentage = total > 0 ? (item.total / total) * 100 : 0;

        return (
            <View key={item.name} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                    <View style={styles.categoryLeft}>
                        <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
                        <Text style={styles.categoryName}>{item.name}</Text>
                    </View>
                    <Text style={styles.categoryAmount}>{formatCurrency(item.total)}</Text>
                </View>

                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: `${percentage}%`, backgroundColor: item.color }
                        ]}
                    />
                </View>

                <View style={styles.categoryFooter}>
                    <Text style={styles.categoryCount}>{item.count} transacciones</Text>
                    <Text style={styles.categoryPercentage}>{percentage.toFixed(1)}%</Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Summary Cards */}
            <View style={styles.summaryContainer}>
                <View style={[styles.summaryCard, { backgroundColor: '#6366f1' }]}>
                    <Icon name="wallet" size={32} color="#fff" />
                    <Text style={styles.summaryLabel}>Balance</Text>
                    <Text style={styles.summaryAmount}>{formatCurrency(balance)}</Text>
                </View>

                <View style={[styles.summaryCard, { backgroundColor: '#22c55e' }]}>
                    <Icon name="arrow-down" size={32} color="#fff" />
                    <Text style={styles.summaryLabel}>Ingresos</Text>
                    <Text style={styles.summaryAmount}>{formatCurrency(totalIncome)}</Text>
                </View>

                <View style={[styles.summaryCard, { backgroundColor: '#ef4444' }]}>
                    <Icon name="arrow-up" size={32} color="#fff" />
                    <Text style={styles.summaryLabel}>Gastos</Text>
                    <Text style={styles.summaryAmount}>{formatCurrency(totalExpenses)}</Text>
                </View>
            </View>

            {/* Transaction Stats */}
            <View style={styles.statsCard}>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Icon name="receipt" size={24} color="#6366f1" />
                        <Text style={styles.statValue}>{transactions.length}</Text>
                        <Text style={styles.statLabel}>Total Transacciones</Text>
                    </View>

                    <View style={styles.statDivider} />

                    <View style={styles.statItem}>
                        <Icon name="chart-line" size={24} color="#6366f1" />
                        <Text style={styles.statValue}>
                            {transactions.length > 0
                                ? formatCurrency(totalExpenses / transactions.filter(t => t.type === 'expense').length || 0)
                                : '$0.00'
                            }
                        </Text>
                        <Text style={styles.statLabel}>Promedio Gastos</Text>
                    </View>
                </View>
            </View>

            {/* Expenses by Category */}
            {expensesByCategory.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Gastos por Categoría</Text>
                    <View style={styles.categoryList}>
                        {expensesByCategory.map(renderCategoryBar)}
                    </View>
                </View>
            )}

            {/* Income by Category */}
            {incomesByCategory.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ingresos por Categoría</Text>
                    <View style={styles.categoryList}>
                        {incomesByCategory.map(renderCategoryBar)}
                    </View>
                </View>
            )}

            {transactions.length === 0 && (
                <View style={styles.emptyState}>
                    <Icon name="chart-bar" size={80} color="#cbd5e1" />
                    <Text style={styles.emptyStateText}>No hay datos disponibles</Text>
                    <Text style={styles.emptyStateSubtext}>
                        Agrega transacciones para ver tus estadísticas
                    </Text>
                </View>
            )}

            <View style={styles.bottomPadding} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    summaryContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    summaryCard: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
    },
    summaryLabel: {
        color: '#ffffff',
        fontSize: 12,
        marginTop: 8,
        opacity: 0.9,
    },
    summaryAmount: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 4,
    },
    statsCard: {
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 20,
        borderRadius: 12,
        elevation: 2,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        height: 60,
        backgroundColor: '#e2e8f0',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 4,
        textAlign: 'center',
    },
    section: {
        marginHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 16,
    },
    categoryList: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
    },
    categoryItem: {
        marginBottom: 20,
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
    },
    categoryAmount: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1e293b',
    },
    progressBarContainer: {
        height: 0,
        backgroundColor: '#f1f5f9',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBar: {
        height: '100%',
        borderRadius: 4,
    },
    categoryFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryCount: {
        fontSize: 12,
        color: '#64748b',
    },
    categoryPercentage: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6366f1',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
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
    bottomPadding: {
        height: 20,
    },
});

export default StatsScreen;