import {PropsWithChildren} from "react";
import {User} from "@/types";
import {Head} from "@inertiajs/react";
import ApplicationHeader from "@/components/app/Layouts/ApplicationHeader";
import ApplicationFooter from "@/components/app/Layouts/ApplicationFooter";

export default function ApplicationLayout({ auth, title, children }: PropsWithChildren<{ auth: { user: User }, title: string }>) {
    return (
        <>
            <Head title={title} />
            <ApplicationHeader auth={auth} />
            <main>
                {children}
            </main>
            <ApplicationFooter />
        </>
    );
}
