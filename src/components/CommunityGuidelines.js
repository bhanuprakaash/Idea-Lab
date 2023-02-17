import React from 'react';
import styled from 'styled-components';
const CommunityGuidelines = (props) => {
    return (
        <>
            {
                props.showModel === "open" && (
                    <Container>
                    <h1>Community Guidelines</h1>
                    <p>
                        We want to create a safe and positive environment for everyone.
                        We have a few guidelines to help us achieve this goal.
                    </p>
                    <h2>Be respectful</h2>
                    <p>
                        We want to create a safe and positive environment for everyone.
                        We have a few guidelines to help us achieve this goal.
                    </p>
                    <h2>Be respectful</h2>
                    <p>
                        We want to create a safe and positive environment for everyone.
                        We have a few guidelines to help us achieve this goal.
                    </p>
                </Container>
                )
            }
        </>
        );
};
const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    z-index: 9999;
    color:black;
    background-color: rgba(0,0,0,0.8);
    animation: fadeIn 0.3s;
`;
export default CommunityGuidelines;