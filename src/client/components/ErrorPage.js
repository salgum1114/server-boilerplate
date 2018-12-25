const ErrorPage = ({ statusCode }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <h1>
                {statusCode} 에러!!
            </h1>
        </div>
    );
};

export default ErrorPage;
