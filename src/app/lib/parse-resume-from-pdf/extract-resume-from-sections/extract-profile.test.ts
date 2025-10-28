import { matchPhone } from './extract-profile';

// Mock do objeto TextItem para simular a entrada da função (DDD, 9º dígito e formatação)
// CORREÇÃO FINAL: Removidas as propriedades 'w' e 'h' e adicionada 'hasEOL: false'
const mockTextItem = (text: string) => ({
    text,
    fontName: 'g_font_1',
    isBold: false, // Propriedade ausente no TextItem, mas mantida por ser comum em mocks. Removendo.
    fontSize: 10, // Propriedade ausente no TextItem, mas mantida por ser comum em mocks. Removendo.
    x: 0,
    y: 0,
    width: 100,
    height: 10,
    hasEOL: false, // Adicionado para cumprir 'TextItem'
});

describe('matchPhone', () => {
    // --- Testes de Regressão para o Padrão Americano (Base) ---
    test('deve corresponder ao formato padrão US: (XXX) XXX-XXXX', () => {
        expect(matchPhone(mockTextItem('(123) 456-7890'))).not.toBeNull();
    });

    test('deve corresponder ao formato US não formatado (10 dígitos)', () => {
        expect(matchPhone(mockTextItem('9991112222'))).not.toBeNull();
    });

    // --- Testes para o Novo Padrão Brasileiro (Cobrindo todos os seus casos) ---

    // CENÁRIO CRÍTICO: Espaços internos (o motivo da correção)
    test('deve corresponder ao telefone BR com espaços internos: XX 9 XXXX XXXX', () => {
        // Exemplo: 61 9 8195-9841
        const result = matchPhone(mockTextItem('61 9 8195 9841'));
        expect(result).not.toBeNull();
        // O match deve capturar o número completo, resolvendo a extração parcial
        expect(result![0]).toContain('61 9 8195 9841'); 
    });
    
    // Casos com DDD e 9º dígito, formatados
    test('deve corresponder ao telefone BR móvel totalmente formatado: (XX) 9XXXX-XXXX', () => {
        expect(matchPhone(mockTextItem('(61) 98195-9841'))).not.toBeNull();
    });

    // Casos sem nenhuma formatação
    test('deve corresponder a 11 dígitos BR não formatados (DDD + 9 dígitos)', () => {
        expect(matchPhone(mockTextItem('61981959841'))).not.toBeNull();
    });
    
    test('deve corresponder a 10 dígitos BR não formatados (DDD + 8 dígitos fixo)', () => {
        expect(matchPhone(mockTextItem('6132345678'))).not.toBeNull();
    });

    // Casos de telefones fixos (8 dígitos)
    test('deve corresponder ao telefone fixo formatado: (XX) XXXX-XXXX', () => {
        expect(matchPhone(mockTextItem('(61) 3234-5678'))).not.toBeNull();
    });

    // Casos sem DDD (assumindo contexto local)
    test('deve corresponder ao telefone sem DDD (9XXXX-XXXX)', () => {
        expect(matchPhone(mockTextItem('98195-9841'))).not.toBeNull();
    });

    // Casos com código de país
    test('deve corresponder ao telefone com código de país: +55 XX 9XXXX-XXXX', () => {
        expect(matchPhone(mockTextItem('+55 61 981959841'))).not.toBeNull();
    });

    // --- Casos Negativos ---
    test('não deve corresponder a texto aleatório', () => {
        expect(matchPhone(mockTextItem('This is not a phone number'))).toBeNull();
    });

    test('não deve corresponder a poucos dígitos', () => {
        expect(matchPhone(mockTextItem('12345'))).toBeNull();
    });
});
