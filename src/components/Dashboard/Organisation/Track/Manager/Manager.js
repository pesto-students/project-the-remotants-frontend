import React from 'react';
import {
  Row,
  Col,
  Card,
  Dropdown,
  Icon,
  Avatar,
} from 'antd';
import PropTypes from 'prop-types';


const { Meta } = Card;

const Manager = ({ currentOrganisation, customMenu, setCurrentManagerID }) => (
  <Row gutter={24} type="flex" >
    {
      (currentOrganisation && currentOrganisation.length) &&
      currentOrganisation[0].manager.map(manager => (
        <Col key={manager.id} span={8}>
          <Card
            actions={[
              <Dropdown id={manager.id} overlay={customMenu} trigger={['click']}>
                <Icon type="ellipsis" onClick={() => { setCurrentManagerID(manager.id); }} />
              </Dropdown>,
            ]}
          >
            <Meta
              style={{ display: 'flex', alignItems: 'center' }}
              avatar={
                <Avatar style={{ backgroundColor: '#FF0039', verticalAlign: 'middle' }} size="large">
                  {manager.name && manager.name.split('')[0]}
                </Avatar>
              }
              title={manager.name}
              description={manager.email}
            />
          </Card>
        </Col>
      ))
    }
  </Row>
);

Manager.propTypes = {
  currentOrganisation: PropTypes.arrayOf(PropTypes.shape({})),
  customMenu: PropTypes.shape({}).isRequired,
  setCurrentManagerID: PropTypes.func.isRequired,
};

Manager.defaultProps = {
  currentOrganisation: [],
};

export default Manager;
