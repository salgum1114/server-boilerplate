import React from 'react';

interface ErrorPageProps {
    statusCode: number,
}

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <h1>
                {props.statusCode} 에러!!
            </h1>
        </div>
    );
};

export default ErrorPage;
