import './bootstrap';
import '../css/app.css';
import '@radix-ui/themes/styles.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {Theme} from "@radix-ui/themes";
import {Toaster} from "@/components/ui/toaster";
import {TooltipProvider} from "@/components/ui/tooltip";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Theme appearance={'light'}>
                <TooltipProvider>
                    <App {...props} />
                </TooltipProvider>
                <Toaster />
            </Theme>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
