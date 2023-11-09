
import React, { ReactNode } from 'react';
import { DynamicHeader } from '../page';
interface Children {
    children: ReactNode;
}
const LoginLayout = ({ children }: Children) => {
    return (
        <div>
            <DynamicHeader />
            {children}
        </div>
    );
};

export default LoginLayout;
