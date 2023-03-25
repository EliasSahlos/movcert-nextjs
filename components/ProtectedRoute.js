import { useRouter } from "next/router";
import { UserAuth } from "@/context/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
    const { user } = UserAuth();
    let router = useRouter();

    useEffect(() => {
        async function getRouter() {
            if (!user) {
                return router.push("/");
            }
        }
        getRouter();
    }, [router, user]);

    return <>{user ? children : null}</>;
}

export default ProtectedRoute;
