import axios from 'axios';

import Posts from '../../components/Posts';

const posts = (props) => <Posts {...props} />;

posts.getInitialProps = async ({ asPath, pathname, query }) => {
    try {
        const res = await axios.get(`/api${asPath}`);
        if (res.data.statusCode) {
            return { statusCode: res.data.statusCode > 200 ? res.data.statusCode : false };
        }
        return { posts: res.data };
    } catch (error) {
        return { statusCode: 500 };
    }
}

export default posts;
