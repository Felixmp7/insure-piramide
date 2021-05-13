/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from '../services/api';
import transformAssuredData from '../helpers/transformAssuredData';

const fidensProvider = 'FIDENS';

const AssuredForm = ({ setAssuredList }) => {
    const [documentType, setDocumentType] = useState('');
    const [documentId, setDocumentId] = useState('');
    const [isErrors, setIsErrors] = useState(false);

    const onChangeDocumentType = (event) => {
        setDocumentType(event.target.value);
    };

    const onChangeDocumentId = (event) => {
        setDocumentId(event.target.value);
    };

    const getAssuredList = async () => {
        try {
            const response = await API.user.getProviderCode(fidensProvider);
            if (response.statusText === 'OK' && response.data.length) {
                const providerCode = response.data[0].CODPROV;
                const responseCoverage = await API.user.getUserCoverage({
                    providerCode,
                    documentType,
                    documentId: parseInt(documentId),
                });
                if (responseCoverage.statusText === 'OK' && responseCoverage.data) {
                    const assuredList = transformAssuredData(responseCoverage.data);
                    setAssuredList(assuredList);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (documentType && documentId.length >= 8) {
            setIsErrors(false);
            getAssuredList();
        } else {
            setIsErrors(true);
        }
    };

    return (
        <form onSubmit={onSubmit} className="mt-10">
            <div className="w-full mb-5">
                <FormControl className="w-full">
                    <InputLabel id="provider">Proveedor</InputLabel>
                    <Select
                        labelId="provider"
                        id="provider-select"
                        value={fidensProvider}
                        disabled
                    >
                        <MenuItem value={fidensProvider}>Fidens</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="mb-5">
                <FormControl className="w-full">
                    <InputLabel id="document-type">Tipo de documento</InputLabel>
                    <Select
                        labelId="document-type"
                        id="document-type-select"
                        value={documentType}
                        onChange={onChangeDocumentType}
                    >
                        <MenuItem value="V">V- Cédula de identidad</MenuItem>
                        <MenuItem value="E">E- Cédula de identidad (Extranjero)</MenuItem>
                        <MenuItem value="J">J- RIF</MenuItem>
                        <MenuItem value="P">V- Número de pasaporte</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl className="w-full">
                    <TextField
                        id="document-id"
                        label="Número de documento"
                        type="number"
                        onChange={onChangeDocumentId}
                        value={documentId}
                    />
                </FormControl>
            </div>
            {isErrors && (
                <span className="block mt-4 text-sm leading-none text-red-500">*Debe seleccionar un tipo de documento e ingresar un número de identificación válido.</span>
            )}
            <div className="my-5">
                <Button variant="outlined" color="primary" type="submit">
                    Buscar
                </Button>
            </div>
        </form>
    );
};

AssuredForm.propTypes = {
    setAssuredList: PropTypes.func.isRequired,
};

export default AssuredForm;
