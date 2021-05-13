import network from './network';

export default {
    user: {
        getProviderCode: async (providerCode) => network.post('/ObtieneCodProv', { cProveedor: providerCode }),
        getUserCoverage: async ({ providerCode, documentType, documentId }) => network.post('/ConsultaAsegurabilidad', {
            cCodProv: providerCode,
            cTipoId: documentType,
            nNumId: documentId,
            cDvId: '0',
        }),
    },
};
