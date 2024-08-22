import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access passed state

const Success = () => {
    const location = useLocation(); // Access the location object
    const { state } = location; // Extract state from the location object

    useEffect(() => {
        if (state) {
            console.log("Data received on success page:", state.name);
        }
    }, [state]);

    return (
        <div className="container mt-4">
            <h2>Payment Successful!</h2>
            <p>Thank you for your payment. Your transaction was successful.</p>
            <p>Name: {state?.name}</p>
        </div>
    );
};

export default Success;
