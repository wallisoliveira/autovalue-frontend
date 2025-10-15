// src/data/veiculosData.ts (Lista de Modelos Detalhados por Versão)

export const veiculosData = {
    'Volkswagen': [
        'Gol 1.0', 'Gol 1.6', 'Polo Comfortline', 'Polo Highline', 'Virtus Comfortline', 
        'Virtus Highline', 'T-Cross Sense', 'T-Cross Comfortline', 'Nivus Comfortline', 
        'Nivus Highline', 'Amarok V6', 'Jetta Comfortline', 'Jetta GLI', 'Outro VW'
    ],
    'Fiat': [
        'Strada Endurance', 'Strada Freedom', 'Strada Volcano', 'Argo 1.0', 'Argo Trekking', 
        'Mobi Like', 'Mobi Trekking', 'Toro Endurance', 'Toro Volcano', 'Cronos Drive', 
        'Pulse Audace', 'Pulse Impetus', 'Fastback Audace', 'Fastback Impetus', 'Outro Fiat'
    ],
    'Chevrolet (GM)': [
        'Onix 1.0', 'Onix Plus LT', 'Onix Plus LTZ', 'Tracker LT', 'Tracker Premier', 
        'S10 LT', 'S10 High Country', 'Montana LTZ', 'Montana Premier', 'Outro GM'
    ],
    'Hyundai': [
        'HB20 Sense', 'HB20 Evolution', 'HB20 Platinum', 'Creta Comfort', 'Creta Platinum', 
        'Creta N Line', 'Tucson GLS', 'Outro Hyundai'
    ],
    'Toyota': [
        'Corolla GLi', 'Corolla XEi', 'Corolla Altis', 'Corolla Cross XRE', 'Corolla Cross XRX', 
        'Hilux SRX', 'Yaris XL', 'Yaris XS', 'Outro Toyota'
    ],
    'Honda': [
        'HR-V EX', 'HR-V EXL', 'City EXL', 'City Touring', 'Civic Touring', 'Outro Honda'
    ],
    'Jeep': [
        'Compass Sport', 'Compass Longitude', 'Compass Limited', 'Renegade Sport', 
        'Renegade Longitude', 'Commander Limited', 'Outro Jeep'
    ],
    'BYD': [
        'Dolphin', 'Dolphin Mini', 'Yuan Plus', 'Song Plus', 'Outro BYD'
    ],
    // Simplificando o restante para focar nas mais vendidas:
    'Audi': ['A3', 'A4', 'Q3', 'Outro Audi'],
    'BMW': ['320i', 'X1', 'X3', 'Outro BMW'],
    'Mercedes-Benz': ['C180', 'GLA 200', 'Outro Mercedes'],
    'Outra/Importada': [
        'Não listado (Digite o Modelo e Versão)'
    ]
};

// Lista de Marcas (para o primeiro select)
export const marcas = Object.keys(veiculosData);