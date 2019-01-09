import Login from '@/components/Login';
import PasswordReset1 from '@/components/PasswordReset1';
import PasswordReset2 from '@/components/PasswordReset2';

import AdminRoot from '@/components/Admin/Root';
import AdminAnalysis from '@/components/Admin/Analysis';
import AdminManagement from '@/components/Admin/Management';
import AdminManualPairings from '@/components/Admin/ManualPairings';

import CommunityList from '@/components/CommunityList';

import Community from '@/components/Community/Root';
import CommunityCreation from '@/components/CommunityCreation';

import Connections from '@/components/Community/Connections';
import InviteEdit from '@/components/Community/InviteEdit';
import Members from '@/components/Community/Members';
import Settings from '@/components/Community/Settings';

import Feedback from '@/components/Feedback';

import Join from '@/components/Join';

import Verify from '@/components/Verify';

import NotFound from '@/components/NotFound';

const communityPage = {
    component: Community,
    meta: {
        depth: 2,
    },
    children: [
        {
            path: '',
            redirect: 'connections',
        },
        {
            path: 'connections',
            component: Connections,
        },
        {
            path: 'invitation',
            component: InviteEdit,
        },
        {
            path: 'members',
            component: Members,
        },
        {
            path: 'settings',
            component: Settings,
        },
    ],
};

const AdminRoutes = [
    {
        path: '/server-admin',
        component: AdminRoot,
        children: [
            {
                path: '',
                redirect: '/server-admin/manage',
            },
            {
                path: 'manage',
                component: AdminManagement,
                meta: {
                    title: 'Admin Management',
                },
                children: [
                    {
                        path: ':identifier',
                        ...communityPage,
                    },
                ],
            },
            {
                path: 'manual-pairings',
                component: AdminManualPairings,
                meta: {
                    title: 'Manual Pairings',
                },
            },
            {
                path: 'analysis',
                component: AdminAnalysis,
                meta: {
                    title: 'Analysis',
                },
            },
        ],
    },
];

const LoginRoutes = [
    {
        path: '/login',
        component: Login,
        meta: {
            depth: 0,
            isLoginPage: true,
            title: 'Organizer Login',
        },
    },
    {
        path: '/login/admin',
        component: Login,
        props: { isAdminLogin: true },
        meta: {
            depth: 0,
            isLoginPage: true,
            title: 'Admin Login',
        },
    },
    {
        path: '/login/password-reset',
        component: PasswordReset1,
        meta: {
            depth: 1,
            isLoginPage: true,
            title: 'Password Reset',
        },
    },
    {
        path: '/login/password-reset/:token',
        component: PasswordReset2,
        meta: {
            depth: 1,
            isLoginPage: true,
            title: 'Password Reset',
        },
        props: true,
    },
];

const MemberRoutes = [
    {
        path: '/:identifier',
        component: Join,
        meta: {
            isPublic: true,
            worldTitle: 'worldId',
        },
        props: true,
    },
    {
        path: '/verify/:token',
        component: Verify,
        meta: {
            isPublic: true,
            title: 'Verification',
        },
        props: true,
    },
    {
        path: '/feedback/:pairId',
        component: Feedback,
        meta: {
            isPublic: true,
            header: 'Thank you!',
            title: 'Feedback',
        },
        props: (route) => ({
            pairId: route.params.pairId,
            response: route.query.response,
        }),
    },
];

const OrganizerRoutes = [
    {
        path: '/your-communities',
        component: CommunityList,
        meta: {
            depth: 1,
            title: 'Organizer Console',
        },
    },
    {
        path: '/your-communities/create',
        component: CommunityCreation,
        meta: {
            depth: 2,
            title: 'Organizer Console',
        },
    },
    {
        path: '/:identifier/manage',
        ...communityPage,
    },
];

const Redirects = [
    {
        path: '/join/',
        redirect: (to) => {
            return {
                path: '/' + to.query.invite,
                query: {},
            };
        },
    },
    {
        path: '/join/verify/',
        redirect: (to) => {
            return {
                path: '/verify/' + to.query.token,
                query: {},
            };
        },
    },
    {
        path: '/join/feedback/',
        redirect: (to) => {
            let possible = Object.keys(to.query).filter((k) => k != 'token');

            let response;
            if (possible.length == 1) {
                response = possible[0];
            } else {
                response = 3;
            }

            return {
                path: '/feedback/' + to.query.token,
                query: { response: response },
            };
        },
    },
];

export default [
    ...LoginRoutes,
    ...AdminRoutes,
    ...OrganizerRoutes,
    ...Redirects,
    ...MemberRoutes,
    {
        path: '*',
        component: NotFound,
        meta: {
            isPublic: true,
            title: 'Not Found',
        },
    },
];
