  import React, { useState, useEffect, lazy, Suspense } from "react";

  import { Switch, Route, Redirect } from "react-router-dom";
  import { HomePage } from "./pages/HomePage";
  import { AuthPage } from "./pages/AuthPage";
  import { Header } from "./components/Header";
  import { VideoPage } from "./pages/VideoPage";
  import Profile from "./pages/Profile";
  import PrivacyPolicy from "./pages/PrivacyPolicy";
  import SearchUser from "./pages/SearchUser";
  import AboutUsPage from "./pages/AboutUsPage.js";
  import NoAuthorization from "./pages/NoAuthorization.js";
  import ProfileViewer from "./pages/ProfileViewer.js";
  import  NewsViewer  from "./pages/NewsViewer.js";
  import { Loader } from "./components/Loader.js";
  // const ProfileViewer = lazy(() => import('./pages/ProfileViewer'));
  const CallPage = lazy(() => import("./pages/CallPage"));
  const AdminPanel = lazy(() => import("./pages/AdminPanel"));
  const NewsPage = lazy(() => import("./pages/NewsPage.js"));
  export const useRoutes = (isAuthenticated) => {
    const [operator, setOperator] = useState(null);
    const data = JSON.parse(localStorage.getItem("userData"));
    useEffect(() => {
      let isMounted = true;
      switch (data && data.userEmail) {
        case "operator1@gmail.com":
          isMounted && setOperator({ operator: 1 });
          break;
        case "operator2@gmail.com":
          isMounted && setOperator({ operator: 2 });
          break;
        case "operator3@gmail.com":
          isMounted && setOperator({ operator: 3 });
          break;
        case "operator4@gmail.com":
          isMounted && setOperator({ operator: 4 });
          break;
        case "operator5@gmail.com":
          isMounted && setOperator({ operator: 5 });
          break;
        default:
          break;
      }
      return () => {
        isMounted = false;
      };
    }, [0]);

    if (isAuthenticated) {
      return (
        <>
          <Header props={operator} />
          <Switch>
            {operator ? (
              <Route path="/CallPage">
                <Suspense fallback={<Loader />}>
                  <CallPage props={operator} />
                </Suspense>
              </Route>
            ) : (
              <Route path="/CallPage">
                <Suspense fallback={<Loader />}>
                  <CallPage props={operator} />
                </Suspense>
              </Route>
            )}

            <Route path="/AdminPanel" exact>
              <Suspense fallback={<Loader />}>
                <AdminPanel />
              </Suspense>
            </Route>
            {/* <Route path="/User_viewer/?" >
              <Suspense fallback={<Loader />}>
                <ProfileViewer />
              </Suspense>
            </Route> */}
            <Route path="/User_viewer" >
              <ProfileViewer />
            </Route>
            <Route path="/PrivacyPolicy" exact>
              <PrivacyPolicy />
            </Route>
            <Route path="/User" exact>
              <Profile />
            </Route>

            <Route path="/NewsPage" exact>
              <Suspense fallback={<Loader />}>
                <NewsPage />
              </Suspense>
            </Route>
            <Route path="/News" >
              <NewsViewer />
            </Route>
            <Route path="/About_us" exact>
              <Suspense fallback={<Loader />}>
                <AboutUsPage />
              </Suspense>
            </Route>

            <Route path="/SearchUser" exact>
              <Suspense fallback={<Loader />}>
                <SearchUser />
              </Suspense>
            </Route>
            <Route path="/detailVideo/:id">
              <VideoPage />
            </Route>
            <Redirect to="/HomePage" />
          </Switch>

          <Route path="/HomePage" exact>
            <HomePage />
          </Route>
        </>
      );
    }

    return (
      <>
        <Header props={operator} />
        <Switch>
          <Route path="/HomePage" exact>
            <HomePage />
          </Route>
          <Route path="/AuthPage" exact>
            <AuthPage />
          </Route>
          <Route path="/PrivacyPolicy" exact>
            <PrivacyPolicy />
          </Route>
          <Route path="/About_us" exact>
            <Suspense fallback={<Loader />}>
              <AboutUsPage />
            </Suspense>
          </Route>
          <Route path="/SearchUser" exact>
            <Suspense fallback={<Loader />}>
              <NoAuthorization />
            </Suspense>
          </Route>
          <Route path="/NewsPage" exact>
            <Suspense fallback={<Loader />}>
              <NewsPage />
            </Suspense>
          </Route>
          <Route path="/News" >
              <NewsViewer />
            </Route>
          <Route path="/User_viewer" >
              <ProfileViewer />
            </Route>
          <Redirect to="/HomePage" />
        </Switch>
      </>
    );
  };
