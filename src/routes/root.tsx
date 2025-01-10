import { Outlet, Params, RouteObject } from 'react-router-dom'
import { AuthGuard, Main } from '@/layout'
import { LoadingCallBack } from '@/features'
import { urls } from './urls'
import {
  CategoryPage,
  CityPage,
  CustomerDetails,
  CustomerPage,
  DashboardPage,
  PackagesPage,
  SignInPage,
  SlotsPage,
  StateCityPage,
  UsersPage
} from '@/pages'

export type CustomMatchesType = {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle?: HandleType
}[]

export type HandleType = {
  crumb: (title?: string) => { label: string }
}

export type RoutePathDefinition = RouteObject & {
  children?: RoutePathDefinition[]
  handle?: HandleType
}

export const root = [
  {
    path: urls.BASE_URL,
    element: <LoadingCallBack />
  },
  {
    path: urls.LOGIN,
    element: (
      <AuthGuard url={urls.BASE_URL} requiresAuth={false}>
        <Outlet />
      </AuthGuard>
    ),
    handle: {
      crumb: () => ({ label: 'Dashboard' })
    },
    children: [
      {
        index: true,
        element: <SignInPage />
      }
    ]
  },
  {
    path: urls.BASE_URL,
    element: (
      <AuthGuard url={urls.LOGIN} requiresAuth={true}>
        <Main>
          <Outlet />
        </Main>
      </AuthGuard>
    ),
    handle: {
      crumb: () => ({ label: 'Dashboard' })
    },
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: urls.CATERGORY,
        element: <CategoryPage />,
        handle: {
          crumb: () => ({ label: 'Category List' })
        }
      },
      {
        path: urls.USERS,
        element: <UsersPage />,
        handle: {
          crumb: () => ({ label: 'Users List' })
        }
      },
      {
        path: urls.CUSTOMERS,
        handle: {
          crumb: () => ({ label: 'Customers List' })
        },
        children: [
          {
            index: true,
            element: <CustomerPage />
          },
          {
            path: urls.CUSTOMER_DETAILS,
            element: <CustomerDetails />,
            handle: {
              crumb: () => ({ label: 'Customer Details' })
            }
          }
        ]
      },
      {
        path: urls.Packages,
        element: <PackagesPage />,
        handle: {
          crumb: () => ({ label: 'Package List' })
        }
      },
      {
        path: urls.SLOTS,
        element: <SlotsPage />,
        handle: {
          crumb: () => ({ label: 'Slots List' })
        }
      },
      {
        path: urls.STATE,
        handle: {
          crumb: () => ({ label: 'State List' })
        },
        children: [
          {
            index: true,
            element: <StateCityPage />
          },
          {
            path: urls.CITIES,
            element: <CityPage />,
            handle: {
              crumb: () => ({ label: 'Cities List' })
            }
          }
        ]
      }
      // {
      //     path: urls.CITIES,
      //     element: <CityPage />,
      //     handle: {
      //         crumb: () => ({ label: "Cities List" }),
      //     },
      // },
    ]
  }
]
