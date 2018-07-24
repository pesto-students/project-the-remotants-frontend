import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Button,
  Card,
  Icon,
  Avatar,
  Dropdown,
  Menu,
} from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { errorNotify } from '../../../../helpers/messageNotify';
import { organisationRoutes } from '../../../../config/routes';
import LoadingCard from '../../../LoadingCard';


const { Content } = Layout;
const { Meta } = Card;

const FlexRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const ColWithBottomMargin = styled(Col)`
  margin-bottom: 16px;
`;

class View extends Component {
  state = {
    isPageLoading: true,
    currentOrganisationID: undefined,
  }
  componentDidMount = async () => {
    const { success, errors } = await this.props.viewCurrentUserOrganisations();
    this.setState({
      isPageLoading: false,
    });
    if (success === false) {
      errorNotify(errors.name);
    }
  }
  onCustomMenuClickHandler = ({ key }) => {
    const { currentOrganisationID } = this.state;
    if (currentOrganisationID === undefined) {
      errorNotify('There is some error in selecting the organisation!');
    } else {
      this.props.history.push(`${organisationRoutes.Organisation}/${currentOrganisationID}/${key}`);
    }
  };
  setCurrentOrganisationID = (id) => {
    this.setState({
      currentOrganisationID: id,
    });
  }
  CustomMenu = (
    <Menu onClick={this.onCustomMenuClickHandler}>
      <Menu.Item key="add-members">
        Add Members
      </Menu.Item>
      <Menu.Item key="track-members">
        Track Members
      </Menu.Item>
    </Menu>
  )
  render() {
    const { organisations } = this.props;
    const { isPageLoading } = this.state;
    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Organisation</Breadcrumb.Item>
          <Breadcrumb.Item>View</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
            textAlign: 'center',
          }}
        >
          <LoadingCard loading={isPageLoading}>
            <h1>ORGANISATIONS</h1>
            <FlexRow gutter={16}>
              {
                organisations && organisations.map(organisation => (
                  <ColWithBottomMargin span={8} key={organisation.id}>
                    <Card
                      actions={
                        [
                          <Dropdown id={organisation.id} overlay={this.CustomMenu} trigger={['click']}>
                            <Icon type="ellipsis" onClick={() => { this.setCurrentOrganisationID(organisation.id); }} />
                          </Dropdown>,
                        ]
                      }
                    >
                      <Meta
                        avatar={<Avatar src={organisation.wakatime.photo} />}
                        title={organisation.name}
                        description={organisation.description}
                      />
                    </Card>
                  </ColWithBottomMargin>
                ))
              }
            </FlexRow>
            <hr />
            <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Col span={24}>
                <Button>
                  <Link to={organisationRoutes.OrganisationCreate}>
                    Create a New Organisation
                  </Link>
                </Button>
              </Col>
            </Row>
          </LoadingCard>
        </Content>
      </Fragment>
    );
  }
}

View.propTypes = {
  viewCurrentUserOrganisations: PropTypes.func.isRequired,
  organisations: PropTypes.arrayOf(PropTypes.shape({})),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


View.defaultProps = {
  organisations: [],
};
export default View;

