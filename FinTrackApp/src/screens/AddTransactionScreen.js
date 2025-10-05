import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTransactions } from '../hooks/useTransactions';

const AddTransactionScreen = ({ navigation }) => {
    const { addTransaction, categories } = useTransactions();

    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');

    const filteredCategories = categories.filter(c => c.type === type);

    const handleSubmit = () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Por favor ingresa un monto válido');
            return;
        }

        if (!selectedCategory) {
            Alert.alert('Error', 'Por favor selecciona una categoría');
            return;
        }

        const transaction = {
            type,
            amount: parseFloat(amount),
            category: selectedCategory.name,
            date,
            note: note.trim(),
        };

        addTransaction(transaction);

        Alert.alert(
            'Éxito',
            'Transacción agregada correctamente',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]
        );
    };

    const renderCategoryButton = (category) => {
        const isSelected = selectedCategory?.id === category.id;

        return (
            <TouchableOpacity
                key={category.id}
                style={[
                    styles.categoryButton,
                    isSelected && {
                        backgroundColor: category.color + '20',
                        borderColor: category.color,
                        borderWidth: 2,
                    },
                ]}
                onPress={() => setSelectedCategory(category)}
            >
                <View style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color + '20' }
                ]}>
                    <Icon name={category.icon} size={24} color={category.color} />
                </View>
                <Text style={[
                    styles.categoryName,
                    isSelected && { color: category.color, fontWeight: '600' }
                ]}>
                    {category.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Type Selector */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tipo de Transacción</Text>
                <View style={styles.typeSelector}>
                    <TouchableOpacity
                        style={[
                            styles.typeButton,
                            type === 'expense' && styles.typeButtonActive,
                            type === 'expense' && { backgroundColor: '#fee2e2' },
                        ]}
                        onPress={() => {
                            setType('expense');
                            setSelectedCategory(null);
                        }}
                    >
                        <Icon
                            name="arrow-up"
                            size={24}
                            color={type === 'expense' ? '#ef4444' : '#64748b'}
                        />
                        <Text style={[
                            styles.typeButtonText,
                            type === 'expense' && { color: '#ef4444', fontWeight: '600' }
                        ]}>
                            Gasto
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.typeButton,
                            type === 'income' && styles.typeButtonActive,
                            type === 'income' && { backgroundColor: '#dcfce7' },
                        ]}
                        onPress={() => {
                            setType('income');
                            setSelectedCategory(null);
                        }}
                    >
                        <Icon
                            name="arrow-down"
                            size={24}
                            color={type === 'income' ? '#22c55e' : '#64748b'}
                        />
                        <Text style={[
                            styles.typeButtonText,
                            type === 'income' && { color: '#22c55e', fontWeight: '600' }
                        ]}>
                            Ingreso
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Amount Input */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Monto</Text>
                <View style={styles.amountInputContainer}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        value={amount}
                        onChangeText={setAmount}
                        placeholderTextColor="#cbd5e1"
                    />
                </View>
            </View>

            {/* Category Selection */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categoría</Text>
                <View style={styles.categoriesGrid}>
                    {filteredCategories.map(renderCategoryButton)}
                </View>
            </View>

            {/* Date Input */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Fecha</Text>
                <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#cbd5e1"
                />
            </View>

            {/* Note Input */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Nota (Opcional)</Text>
                <TextInput
                    style={[styles.input, styles.noteInput]}
                    placeholder="Agrega una descripción..."
                    value={note}
                    onChangeText={setNote}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    placeholderTextColor="#cbd5e1"
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                style={[
                    styles.submitButton,
                    { backgroundColor: type === 'expense' ? '#ef4444' : '#22c55e' }
                ]}
                onPress={handleSubmit}
            >
                <Icon name="check" size={24} color="#fff" />
                <Text style={styles.submitButtonText}>
                    Agregar {type === 'expense' ? 'Gasto' : 'Ingreso'}
                </Text>
            </TouchableOpacity>

            <View style={styles.bottomPadding} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    section: {
        marginHorizontal: 16,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 12,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 12,
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        gap: 8,
    },
    typeButtonActive: {
        borderWidth: 2,
    },
    typeButtonText: {
        fontSize: 16,
        color: '#64748b',
    },
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    currencySymbol: {
        fontSize: 32,
        fontWeight: '700',
        color: '#6366f1',
        marginRight: 8,
    },
    amountInput: {
        flex: 1,
        fontSize: 32,
        fontWeight: '700',
        color: '#1e293b',
        padding: 16,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryButton: {
        width: '31%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        gap: 8,
    },
    categoryIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        gap: 8,
    },
    categoryName: {
        fontSize: 12,
        color: '#64748b',
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1e293b',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    noteInput: {
        height: 100,
    },
    submitButton: {
        marginHorizontal: 16,
        marginTop: 32,
        padding: 18,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        elevation: 4,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
    bottomPadding: {
        height: 45,
    },
})

export default AddTransactionScreen;