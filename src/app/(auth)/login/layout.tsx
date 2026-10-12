const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      {children}
    </div>
  );
};

export default LoginLayout;
