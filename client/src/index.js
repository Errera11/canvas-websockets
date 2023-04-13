import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import * as uuid from 'uuid';


const id = uuid.v4()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <Routes>
                <Route path={'/:id'} element={<App />}/>
                <Route path="*" element={<Navigate to={`/${id}`} />} />
            </Routes>
        </BrowserRouter>
    </>

);





