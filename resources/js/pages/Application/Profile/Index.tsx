import ApplicationLayout from "@/layouts/ApplicationLayout";
import {PageProps, User} from "@/types";
import ProfileCardShowOrders from "@/pages/Application/Profile/Partials/ProfileCardShowOrders";
import ProfileCardUpdatePasswordForm from "@/pages/Application/Profile/Partials/ProfileCardUpdatePasswordForm";
import ProfileCardUpdateInformationForm from "@/pages/Application/Profile/Partials/ProfileCardUpdateInformationForm";
import ProfileCardDeleteUserForm from "@/pages/Application/Profile/Partials/ProfileCardDeleteUserForm";

const ProfilePage = ({ auth, mustVerifyEmail, status, regions, departments }: PageProps<{ auth: { user: User, details: any }, mustVerifyEmail: boolean, status?: string, regions: any, departments: any }>) => {
    return (
        <ApplicationLayout
            auth={auth}
            title={'Profile'}
        >
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-gray-50 shadow sm:rounded-sm">
                        <ProfileCardShowOrders className="max-w-xl"/>
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-50 shadow sm:rounded-sm">
                        <ProfileCardUpdateInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                            regions={regions}
                            departments={departments}
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-50 shadow sm:rounded-sm">
                        <ProfileCardUpdatePasswordForm className="max-w-xl"/>
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-50 shadow sm:rounded-sm">
                        <ProfileCardDeleteUserForm className="max-w-xl"/>
                    </div>
                </div>
            </div>
        </ApplicationLayout>
    );
}

export default ProfilePage;
