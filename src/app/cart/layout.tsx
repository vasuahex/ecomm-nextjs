
import React, { ReactNode } from 'react';
import { DynamicHeader } from '../page';
interface ContextProps {
    children: ReactNode;
}
const LoginLayout = ({ children }: ContextProps) => {
    return (
        <div>
            <DynamicHeader />
            {children}
        </div>
    );
};

export default LoginLayout;
