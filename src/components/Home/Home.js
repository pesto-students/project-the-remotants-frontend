import React, { Component, Fragment } from 'react';
import {
  Button,
  Icon,
  Carousel,
  Card,
} from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import routes from '../../config/routes';


const TestimonialText = styled.div`
  font-size: 1.9em;
`;

const ResponsiveTestimonialCard = styled(Card)`
  @media (max-width: 480) {
    width: 100%;
  }
  @media (min-width: 481px) {
    width: 450px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TestimonialCard = ({ children }) => (
  <ResponsiveTestimonialCard>
    <TestimonialText>
      { children }
    </TestimonialText>
  </ResponsiveTestimonialCard>
);

TestimonialCard.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

const CustomizedCarousel = styled(Carousel)`
  .slick-dots li button {
    color: #000;
    background: #000;
  }

  .slick-dots li.slick-active button {
    color: #000;
    background: #000;
  }
`;


class Home extends Component {
  getStarted = () => {
    this.props.history.push(routes.Auth);
  }
  render() {
    return (
      <Fragment>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ marginBottom: '0' }}>
            The Remotants
          </h1>
          <h4 style={{ color: '#777' }}>
            Transforming the way you perceive remote work
          </h4>

          <div style={{ marginTop: '50px' }}>
            <p style={{ fontSize: '1.2em', fontWeight: '600' }}>As quoted by the authors of the best seller &quot;REMOTE&quot;</p>
            <CustomizedCarousel autoplay dots>
              <div>
                <TestimonialCard>
                  <span>
                    <blockquote>
                      &quot;The most talented people in the world
                      don&apos;t all live in one place.&quot;
                    </blockquote>
                  </span>
                </TestimonialCard>
              </div>
              <div>
                <TestimonialCard>
                  <span>
                    <blockquote>
                      &quot;The best place to live depends on who
                      you are and what you like.&quot;
                    </blockquote>
                  </span>
                </TestimonialCard>
              </div>
              <div>
                <TestimonialCard>
                  <span>
                    <blockquote>
                      &quot;The modern office has become an
                      interruption factory.&quot;
                    </blockquote>
                  </span>
                </TestimonialCard>
              </div>
              <div>
                <TestimonialCard>
                  <span>
                    <blockquote>
                      &quot;Going remote allows the most talented people to
                      produce the best work.&quot;
                    </blockquote>
                  </span>
                </TestimonialCard>
              </div>
            </CustomizedCarousel>
          </div>
        </div>

        <h3 style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ textTransform: 'uppercase' }}>
            Can&apos;t wait to hop in?
          </p>
          <Button type="primary" onClick={this.getStarted}>
            GET ON BOARD<Icon type="right" />
          </Button>
        </h3>
      </Fragment>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
