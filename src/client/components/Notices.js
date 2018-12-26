import React, { Component } from 'react';
import { Button } from 'antd';

const styles = {
    container: { margin: '24px 48px' },
    writeButton: { position: 'absolute', bottom: '24px', right: '24px' },
    noticeSummary: { cursor: 'pointer' },
};

class Notices extends Component {
    render() {
        return (
            <div style={styles.container}>
                <Button
                    style={styles.writeButton}
                    size="large"
                    icon="edit"
                    type="primary"
                    shape="circle-outline"
                />
            </div>
        );
    }
}

export default Notices;