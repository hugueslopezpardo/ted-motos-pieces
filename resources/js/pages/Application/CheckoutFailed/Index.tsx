import React from 'react';
import { PageProps } from '@/types'; // Updated import statement

const CheckoutFailedPage = ({ auth }: PageProps) => {
    return (
        <div>
            <h1>CheckoutFailed Page</h1>
            <p>This is the CheckoutFailed page content.</p>
        </div>
    );
};

export default CheckoutFailedPage;
