import React from 'react';
import { PageProps } from '@/types'; // Updated import statement

const CheckoutSuccessPage = ({ auth }: PageProps) => {
    return (
        <div>
            <h1>CheckoutSuccess Page</h1>
            <p>This is the CheckoutSuccess page content.</p>
        </div>
    );
};

export default CheckoutSuccessPage;
