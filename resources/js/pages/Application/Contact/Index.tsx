import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout"; // Updated import statement

const ContactPage = ({ auth }: PageProps) => {
    return (
        <>
            <ApplicationLayout auth={auth} title={'Nous contacter'}>
                {/* Nothing to see here because the footer already contains the contact form. */}
            </ApplicationLayout>
        </>
    );
};

export default ContactPage;
