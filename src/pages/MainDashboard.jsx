import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider }  from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Email, Logout, Task } from '@mui/icons-material';
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import api from '../axiosConfig';
import { useEffect } from 'react';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Management tasks',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    children: [
      {
        segment: 'review',
        title: 'Review Tasks',
        icon: <GradingOutlinedIcon />,
      },
      {
        segment: 'tasks',
        title: 'Management Tasks',
        icon: <Task />,
      },
    ]
  }
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent({ handleLoading }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Outlet context={{ handleLoading }} />
  );
}

function DashboardLayoutBasic() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [loading, setLoading] = React.useState(false);
  const [session, setSession] = React.useState({
    user: {
      name: '',
      email: '',
      id: '',
      image: '',
    },
  });

  useEffect(() => {
    authentication.signIn();
  }, []);

  const authentication = React.useMemo(() => {
    return {
      signIn: async () => {
        const response = await api.get('users/get_me');
        if (response.status === 200) {
          console.log(response.data.me);
          const userData = {
            ...response.data.me,
            image: response.data.me.image || 'https://avatars.githubusercontent.com/u/19550456',
          };
          setSession({ user: userData });
        }
      },
      signOut: () => {
        setSession(
          localStorage.clear(),
          navigate('/')
        );
      },
    };
  }, []);

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={{ pathname: pathname, navigate }}
      theme={demoTheme}
      authentication={authentication}
      session={session}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'D-Task Manager',
      }}
    >
      <DashboardLayout>
        { loading && <LinearProgress />}
        <PageContent  handleLoading={handleLoading} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;