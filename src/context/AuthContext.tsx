import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * Estado de conta e plano (mock para o esqueleto).
 * Em produção: Amazon Cognito + status de assinatura via gateway de pagamento (PRD §9).
 *
 * `isSupporter` (doou para ao menos um projeto) e `isPremium` (assinante) são
 * INTENCIONALMENTE separados — doação ≠ assinatura (PRD §5). Ambos liberam o
 * "acesso antecipado"; só o premium libera tonalidade/stems/conteúdo exclusivo.
 */
type AuthState = {
  isLoggedIn: boolean;
  isPremium: boolean;
  isSupporter: boolean;
  /** Conveniência: doador OU assinante têm acesso antecipado. */
  hasEarlyAccess: boolean;
  login: () => void;
  logout: () => void;
  togglePremium: () => void;
  markSupporter: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(true); // simplificado no esqueleto
  const [isPremium, setPremium] = useState(false);
  const [isSupporter, setSupporter] = useState(false);

  const value = useMemo<AuthState>(
    () => ({
      isLoggedIn,
      isPremium,
      isSupporter,
      hasEarlyAccess: isPremium || isSupporter,
      login: () => setLoggedIn(true),
      logout: () => setLoggedIn(false),
      togglePremium: () => setPremium((v) => !v),
      markSupporter: () => setSupporter(true),
    }),
    [isLoggedIn, isPremium, isSupporter],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
