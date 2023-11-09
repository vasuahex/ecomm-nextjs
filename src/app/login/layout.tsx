
import React, { ReactNode } from 'react';
interface ContextProps {
    children: ReactNode;
}
const LoginLayout = ({ children }: ContextProps) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default LoginLayout;
