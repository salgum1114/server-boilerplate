const styles = {
    empty: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#868e96',
        fontSize: 30,
        height: '100%',
    },
};

const EmptyPage = () => (
    <div style={styles.empty}>
        {'첫 번째 게시글을 작성해주세요!!'}
    </div>
);

export default EmptyPage;
