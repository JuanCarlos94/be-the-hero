import React, {useEffect, useState} from 'react'
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import logoImg from '../../assets/logo.png'
import styles from './styles'
import api from '../../services/api'

export default function Incidents(){

    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const navigation = useNavigation()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetails(incident){
        navigation.navigate('Details', {incident})
    }

    async function getIncidents(){
        if(loading){
            return
        }

        if(total > 0 && incidents.length === total){
            return
        }

        setLoading(true)
        const result = await api.get('incidents', {
            params: {page}
        })
        setIncidents([...incidents, ...result.data])
        setTotal(result.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        getIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                style={styles.incidentList}
                // showsVerticalScrollIndicator={false}
                onEndReached={getIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
                        
                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat(
                                'pt-BR', 
                                {style: "currency", currency: "BRL"}
                                ).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => {navigateToDetails(incident)}}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}