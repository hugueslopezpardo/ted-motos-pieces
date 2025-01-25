import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout";
import AboutSection from "@/components/app/Pages/About/AboutSection"; // Updated import statement

const AboutPage = ({ auth }: PageProps) => {
    return (
        <ApplicationLayout auth={auth} title={'À propos'}>
            <AboutSection />
        </ApplicationLayout>
    );
};

export default AboutPage;
