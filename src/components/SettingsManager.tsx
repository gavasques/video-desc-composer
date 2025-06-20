
import { useState } from "react";
import { ArrowLeft, User, Key, Shield, Settings as SettingsIcon, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import SettingsErrorBoundary from "./settings/SettingsErrorBoundary";
import AccountSettings from "./settings/AccountSettings";
import ApiSettings from "./settings/ApiSettings";
import AuthSettings from "./settings/AuthSettings";
import GeneralSettings from "./settings/GeneralSettings";
import AdvancedSettings from "./settings/AdvancedSettings";

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
              <AccountSettings />
            </TabsContent>

            <TabsContent value="api">
              <ApiSettings />
            </TabsContent>

            <TabsContent value="auth">
              <AuthSettings />
            </TabsContent>

            <TabsContent value="general">
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="advanced">
              <AdvancedSettings />
            </TabsContent>
          </Tabs>
        </SettingsErrorBoundary>
      </main>
    </div>
  );
};

export default SettingsManager;
