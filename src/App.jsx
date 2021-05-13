/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import AssuredForm from './components/AssuredForm';
import Assured from './components/Assured';
import logo from './assets/logo.png';

const App = () => {
    const [assuredList, setAssuredList] = useState([]);

    return (
        <div className="flex items-center justify-center customContainer">
            <div className="w-11/12 grid-cols-7 gap-8 bg-white rounded-md shadow-2xl xl:grid">
                <div className="col-span-2 p-4">
                    <img src={logo} alt="Piramide Logo" width="200" height="200" />
                    <div className="mx-auto sm:w-1/2 lg:w-full">
                        <AssuredForm setAssuredList={(coverageList) => setAssuredList(coverageList)} />
                    </div>
                </div>
                <div className="w-full col-span-5 p-4 overflow-x-auto bg-yellow-500 rounded-b">
                    <div className="w-full p-4 bg-white rounded" style={{ minWidth: 760 }}>
                        <div className="grid items-center w-full h-10 grid-cols-4 gap-0 bg-yellow-100 border rounded">
                            <span className="italic font-light text-center">Nro Identidad</span>
                            <span className="col-span-2 italic font-light text-center">Nombres y Apellidos</span>
                            <span className="italic font-light text-center">Seguro</span>
                        </div>
                        {assuredList.length !== 0 && (
                            <ul className="mt-4">
                                {assuredList.map((client, index) => (
                                    <li key={index}>
                                        <Assured {...client} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
