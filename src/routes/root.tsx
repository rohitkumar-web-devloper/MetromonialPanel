import { Outlet, Params, RouteObject } from "react-router-dom";
import { AuthGuard, Main } from "@/layout";
import { LoadingCallBack } from "@/features";
import { urls } from "./urls";
import { SignInPage } from "@/pages";

export type CustomMatchesType = {
    id: string;
    pathname: string;
    params: Params<string>;
    data: unknown;
    handle?: HandleType;
}[];

export type HandleType = {
    crumb: (title?: string) => { label: string };
};

export type RoutePathDefinition = RouteObject & {
    children?: RoutePathDefinition[];
    handle?: HandleType;
};

export const root = [
    {
        path: urls.BASE_URL,
        element: <LoadingCallBack />
    },
    {
        path: urls.LOGIN,
        element: <AuthGuard url={urls.BASE_URL} requiresAuth={false}>
            <Outlet />
        </AuthGuard>,
        handle: {
            crumb: () => ({ label: "Home" }),
        },
        children: [
            {
                index: true,
                element: <SignInPage />,
            }
        ]
    },
    {
        path: urls.BASE_URL,
        element: <AuthGuard url={urls.LOGIN} requiresAuth={true}>
            <Main>
                <Outlet />
            </Main>
        </AuthGuard>,
        handle: {
            crumb: () => ({ label: "Home" }),
        },
        children: [
            {
                index: true,
                element: <>Home page</>,
            },
        ]

    }
]