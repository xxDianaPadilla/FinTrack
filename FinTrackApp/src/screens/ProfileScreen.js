import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTransactions } from '../hooks/useTransactions';

const ProfileScreen = () => {
    const { transactions } = useTransactions();

    const handleExportData = () => {
        Alert.alert(
            'Exportar Datos',
            'Esta función permitirá exportar tus datos en formato CSV',
            [{ text: 'OK' }]
        );
    };

    const handleBackup = () => {
        Alert.alert(
            'Respaldo',
            'Tus datps están guardados localemente en el dispositivo',
            [{ text: 'OK' }]
        );
    };

    const handleAbout = () => {
        Alert.alert(
            'Acerca de FinTrack',
            'FinTrack v1.0\n\nAplicación de control de gastos e ingresos personales.\n\nDesarrollado con React Native',
            [{ text: 'OK' }]
        );
    };

    const handleClearData = () => {
        Alert.alert(
            'Eliminar Todos los Datos',
            '¿Estás seguro? Esta acción no se puede deshacer.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        Alert.alert('Información', 'Función en desarrollo');
                    },
                },
            ]
        );
    };

    const MenuButton = ({ icon, title, subtitle, onPress, color = '#1e293b', danger }) => (
        <TouchableOpacity
            style={styles.menuButton}
            onPress={onPress}
        >
            <View style={[styles.menuIcon, { backgroundColor: danger ? '#fee2e2' : '#f1f5f9' }]}>
                <Icon
                    name={icon}
                    size={24}
                    color={danger ? '#ef4444' : color}
                />
            </View>
            <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, danger && { color: '#ef4444' }]}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={styles.menuSubtitle}>{subtitle}</Text>
                )}
            </View>
            <Icon name="chevron-right" size={24} color="#cbd5e1" />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Icon name="account" size={48} color="#fff" />
                </View>
                <Text style={styles.userName}>Usuario FinTrack</Text>
                <Text style={styles.userEmail}>Gestiona tus finanzas</Text>
            </View>

            {/* Stats Summary */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{transactions.length}</Text>
                    <Text style={styles.statLabel}>Transacciones</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>
                        {new Set(transactions.map(t => t.category)).size}
                    </Text>
                    <Text style={styles.statLabel}>Categorías</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>
                        {transactions.length > 0
                            ? Math.ceil((Date.now() - new Date(transactions[transactions.length - 1]?.date).getTime()) / (1000 * 60 * 60 * 24))
                            : 0
                        }
                    </Text>
                    <Text style={styles.statLabel}>Días activo</Text>
                </View>
            </View>

            {/* Menu Sections */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Datos</Text>
                <View style={styles.menuContainer}>
                    <MenuButton
                        icon="download"
                        title="Exportar Datos"
                        subtitle="Descarga tus datos en CSV"
                        onPress={handleExportData}
                        color="#6366f1"
                    />
                    <MenuButton
                        icon="cloud-upload"
                        title="Respaldo"
                        subtitle="Guarda tus datos en la nube"
                        onPress={handleBackup}
                        color="#6366f1"
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Configuración</Text>
                <View style={styles.menuContainer}>
                    <MenuButton
                        icon="bell"
                        title="Notificaciones"
                        subtitle="Gestiona tus alertas"
                        onPress={() => Alert.alert('Info', 'Función en desarrollo')}
                        color="#6366f1"
                    />
                    <MenuButton
                        icon="palette"
                        title="Tema"
                        subtitle="Personaliza la apariencia"
                        onPress={() => Alert.alert('Info', 'Función en desarrollo')}
                        color="#6366f1"
                    />
                    <MenuButton
                        icon="currency-usd"
                        title="Moneda"
                        subtitle="USD - Dólar"
                        onPress={() => Alert.alert('Info', 'Función en desarrollo')}
                        color="#6366f1"
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Soporte</Text>
                <View style={styles.menuContainer}>
                    <MenuButton
                        icon="help-circle"
                        title="Ayuda"
                        subtitle="Preguntas frecuentes"
                        onPress={() => Alert.alert('Info', 'Función en desarrollo')}
                        color="#6366f1"
                    />
                    <MenuButton
                        icon="information"
                        title="Acerca de"
                        subtitle="Versión 1.0"
                        onPress={handleAbout}
                        color="#6366f1"
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Zona de Peligro</Text>
                <View style={styles.menuContainer}>
                    <MenuButton
                        icon="delete-alert"
                        title="Eliminar Todos los Datos"
                        subtitle="Esta acción no se puede deshacer"
                        onPress={handleClearData}
                        danger
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>FinTrack v1.0</Text>
                <Text style={styles.footerSubtext}>
                    Hecho con ❤️ para gestionar tus finanzas
                </Text>
            </View>

            <View style={styles.bottomPadding} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        backgroundColor: '#6466f1',
        paddingVertical: 32,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#818cf8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#e0e7ff',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginTop: -24,
        borderRadius: 12,
        padding: 20,
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#e2e8f0',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#64748b',
        textAlign: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: '#64748b',
        textAlign: 'center',
    },
    section: {
        marginTop: 24,
        marginHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
        marginLeft: 4,
    },
    menuContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 1,
    },
    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBlockEndColor: '#f1f5f9',
    },
    menuIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#64748b',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94a3b8',
        marginBottom: 4,
    },
    footerSubtext: {
        fontSize: 12,
        color: '#94a3b8',
    },
    bottomPadding: {
        height: 1,
    },
});

export default ProfileScreen;