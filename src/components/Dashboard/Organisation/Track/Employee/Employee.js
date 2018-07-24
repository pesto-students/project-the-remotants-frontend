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

const Employee = ({ currentOrganisation, customMenu, setCurrentEmployeeID }) => (
  <Row gutter={24} type="flex" >
    {
      (currentOrganisation && currentOrganisation.length) &&
          currentOrganisation[0].employee.map(employee => (
            <Col key={employee.id} span={8}>
              <Card
                actions={[
                  <Dropdown id={employee.id} overlay={customMenu} trigger={['click']}>
                    <Icon type="ellipsis" onClick={() => { setCurrentEmployeeID(employee.id); }} />
                  </Dropdown>,
                ]}
              >
                <Meta
                  style={{ display: 'flex', alignItems: 'center' }}
                  avatar={
                    <Avatar style={{ backgroundColor: '#FF0039', verticalAlign: 'middle' }} size="large">
                      {employee.name && employee.name.split('')[0]}
                    </Avatar>
                  }
                  title={employee.name}
                  description={employee.email}
                />
              </Card>
            </Col>
          ))
    }
  </Row>
);

Employee.propTypes = {
  currentOrganisation: PropTypes.arrayOf(PropTypes.shape({})),
  customMenu: PropTypes.shape({}).isRequired,
  setCurrentEmployeeID: PropTypes.func.isRequired,
};

Employee.defaultProps = {
  currentOrganisation: [],
};

export default Employee;
