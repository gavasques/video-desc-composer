
import React, { lazy, Suspense } from "react";
import { ArrowLeft, User, Key, Shield, Settings as SettingsIcon, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import SettingsErrorBoundary from "./settings/SettingsErrorBoundary";

// Lazy load settings components
const AccountSettings = lazy(() => import("./settings/AccountSettings"));
const ApiSettings = lazy(() => import("./settings/ApiSettings"));
const AuthSettings = lazy(() => import("./settings/AuthSettings"));
const GeneralSettings = lazy(() => import("./settings/GeneralSettings"));
const AdvancedSettings = lazy(() => import("./settings/AdvancedSettings"));

const LoadingCard = () => (
  <Card>
    <CardContent className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </CardContent>
  </Card>
);

const SettingsManager = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="p-2 bg-blue-500 rounded-lg">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Configurações
                </h1>
                <p className="text-sm text-gray-500">
                  Gerencie suas configurações e integrações
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <SettingsErrorBoundary>
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-fit">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Conta</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                <span className="hidden sm:inline">API</span>
              </TabsTrigger>
              <TabsTrigger value="auth" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Autenticação</span>
              </TabsTrigger>
              <TabsTrigger value="general" className="flex items-center gap-2">
                <SettingsIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Geral</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Avançado</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Suspense fallback={<LoadingCard />}>
                <AccountSettings />
              </Suspense>
            </TabsContent>

            <TabsContent value="api">
              <Suspense fallback={<LoadingCard />}>
                <ApiSettings />
              </Suspense>
            </TabsContent>

            <TabsContent value="auth">
              <Suspense fallback={<LoadingCard />}>
                <AuthSettings />
              </Suspense>
            </TabsContent>

            <TabsContent value="general">
              <Suspense fallback={<LoadingCard />}>
                <GeneralSettings />
              </Suspense>
            </TabsContent>

            <TabsContent value="advanced">
              <Suspense fallback={<LoadingCard />}>
                <AdvancedSettings />
              </Suspense>
            </TabsContent>
          </Tabs>
        </SettingsErrorBoundary>
      </main>
    </div>
  );
};

export default SettingsManager;
