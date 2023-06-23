import React, { useEffect, useState } from "react";
import Logo from "./assets/lad-logo.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  View,
  Image,
  useTheme,
  Text,
  Heading,
  useAuthenticator,
  Button,
} from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import Layout from "./layouts/layout";
import Home from "./pages/Home";
import ManageModules from "./pages/ManageModules";
import CreateModule from "./pages/CreateModule";
import EnrolStudents from "./pages/EnrolStudents";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsconfig);

function App() {
  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.xxl}>
          <Image alt="LAD logo" src={Logo} />
        </View>
      );
    },
    Footer() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            <footer className="w-full py-8 text-sm text-center text-gray-400">
              <div className="flex flex-row justify-center gap-5 mb-2">
                <div>Lab Assistant Device</div>
              </div>
              <div>Copyright ©2023 Produced SIT Student Software Engineers</div>
            </footer>
          </Text>
        </View>
      );
    },
    SignIn: {
      Header() {
        const { tokens } = useTheme();

        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={4}
          >
            <p className="font-normal text-gray-500">Log into your account</p>
          </Heading>
        );
      },
      Footer() {
        const { toResetPassword } = useAuthenticator();

        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toResetPassword}
              size="small"
              variation="link"
            >
              <p className="text-black cursor-pointer hover:text-black/70">
                Forgot your password?
              </p>
            </Button>
          </View>
        );
      },
    },
  };

  return (
    <Authenticator hideSignUp="true" components={components}>
      {({ signOut, user }) => (
        <div className="App">
          <Router>
            <Layout signOut={signOut}>
              <Routes>
                <Route path="/home" element={<Home user={user} />} />
                <Route path="/manage-modules" element={<ManageModules />} />
                <Route path="/manage-modules/create" element={<CreateModule />} />
                <Route
                  path="/manage-modules/enrol-students"
                  element={<EnrolStudents />}
                />
              </Routes>
            </Layout>
          </Router>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
