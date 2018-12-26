import axios from 'axios';

import ErrorPage from '../../components/ErrorPage';
import Post from '../../components/posts/Post';

const post = (props) => {
    if(props.pageProps.statusCode) {
        return <ErrorPage statusCode={props.pageProps.statusCode} />
    }
    return <Post {...props} />;
}

post.getInitialProps = async ({ asPath, pathname, query }) => {
    try {
        const res = await axios(`/api${asPath}`);
        if (res.data.statusCode) {
            return { statusCode: res.data.statusCode > 200 ? res.data.statusCode : false };
        }
        return { post: res.data };
    } catch (error) {
        return { statusCode: 500 };
    }
}

export default post;