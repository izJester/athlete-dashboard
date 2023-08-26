import DashboardPage from "@/app/dashboard/page";
import useAuth from "@/hooks/auth";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    if (user === undefined) {
        return; 
    }

    if (user) {
        return <DashboardPage></DashboardPage>
    }

    return ( <>
        { children }
    </> );
}
 
export default GuestLayout;