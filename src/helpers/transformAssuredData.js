const transformAssuredData = (coverageList) => {
    const {
        Asegurados_cur: currentAssured,
        Aseg_coberturas_cur: assuredCoverage,
    } = coverageList;

    const assuredList = currentAssured.map((client) => ({
        documentId: client.CEDULA_ASEGURADO,
        name: client.NOMASEG,
        assured: client.TOMADOR,
        owner: client.CEDULA_TITULAR === client.CEDULA_ASEGURADO,
        assureCoverage: assuredCoverage.map((coverage) => {
            if (coverage.CEDULA_ASEGURADO === client.CEDULA_ASEGURADO) {
                return coverage.DESCCOBERT;
            }
            return null;
        }).filter((item) => item),
    }));

    return assuredList;
};

export default transformAssuredData;
