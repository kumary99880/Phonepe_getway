import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './Payment';
import Success from './Success';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Payment />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </Router>
    );
};

export default App;
