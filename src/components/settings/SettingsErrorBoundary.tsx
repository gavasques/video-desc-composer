
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class SettingsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Settings Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              Erro nas Configurações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-red-700">
              Ocorreu um erro ao carregar as configurações. Tente recarregar a página.
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Recarregar Página
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default SettingsErrorBoundary;
