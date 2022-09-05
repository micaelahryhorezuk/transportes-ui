import './App.css';
import { Route, BrowserRouter, Routes, Navigate, useParams, useNavigate } from 'react-router-dom';
import ContactoPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import StaffPage from './pages/StaffPage';
import NoveltyPage from './pages/NoveltyPage';
import ServicePage from './pages/ServicePage';
import ApplicationBar from './components/layout/ApplicationBar';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { theme } from './utils/constants';
import { closeDialog, useDialog } from './redux/hooks/dialog';
import { useLoading } from './redux/hooks/loading';
import { closeToaster, useToaster } from './redux/hooks/toaster';
import Dialog from './components/Dialog';
import Loading from './components/Loading';
import Toaster from './components/Toaster';
import { Suspense, useEffect, useRef, useState } from 'react';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Custom>
          <ApplicationBar/>
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/home"/>}/>
            <Route path="/home"  element={ <WithParams component={HomePage}/> } />
            <Route path="/novelty"  element={ <WithParams component={NoveltyPage}/> } />
            <Route path="/service"  element={ <WithParams component={ServicePage}/> } />
            <Route path="/staff"  element={ <WithParams component={StaffPage}/> } />
            <Route path="/contact"  element={ <WithParams component={ContactoPage}/> } />
          </Routes>
        </Custom>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const useCustomStyle = makeStyles((_theme) => ({
	loadingPaper: {
		zIndex: 9999999,
	},	
}));

function Custom(props) {
  const classes = useCustomStyle();

  const dialogInfo = useDialog();
  const loadingInfo = useLoading();
  const toasterInfo = useToaster();

  const showDialog = () => {
    if (dialogInfo) return true;
    return false;
  }

  const showLoading = () => {
    if (loadingInfo?.message) return true;
    return false;
  }

  const showToaster = () => {
    if (toasterInfo) return true;
    return false;
  }
  
  return (
    <>
      {props.children}

      <Dialog 
        {...dialogInfo}
        buttonSubmit={dialogInfo?.buttonSubmit && {
          ...dialogInfo.buttonSubmit,
          onClick: () => {
            closeDialog();
            dialogInfo.buttonSubmit &&
            dialogInfo.buttonSubmit.onClick();
          }
        }}
        open={showDialog()}
        buttonCancel={{
          onClick: () => {
            if (dialogInfo?.onCancelClick) {
              dialogInfo?.onCancelClick();
            }
            closeDialog();
          },
          caption: dialogInfo?.cancelText || "Cancelar"
        }}
      />

      <Loading
        classes={{
          backdrop: classes.loadingPaper
        }}
        open={showLoading()}
        message={loadingInfo?.message || ""}
      />

      <Toaster
        open={showToaster()}
        message={toasterInfo?.message || ""}
        type={toasterInfo?.type}
        onClose={() => closeToaster()}
      />
    </>
  )
}

function WithParams(props) {
  const [loaded, setLoaded] = useState();
  const params = useParams();
  const history = useNavigate();
  const lastUrl = useRef("");
  
  useEffect(() => {    
    if (lastUrl.current === window.location.pathname) return;
    lastUrl.current = window.location.pathname;
    setLoaded(false);
  }, [props.component, params, history])

  useEffect(() => {
    if (typeof loaded === "boolean" && !loaded) {
      setLoaded(true);
    }
  }, [loaded])

  return (
    <Suspense fallback={<Loading open message="Cargando información..." />}>
    {
      loaded && props.component && lastUrl.current === window.location.pathname &&
      <props.component {...params} {...props.params} />// user={getUserInfo()} />        
    }
    </Suspense>    
  )
}

export default App;
