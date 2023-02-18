import React from 'react';
import styled from 'styled-components';
import "../App.css";
const CommunityGuidelines = (props) => {
    const handleClick=(e)=>{
        props.handleClick(e);
    }
    
    return (
        
        <>
            {
                props.showModel === "open" && (
                <Container onClick={(e)=>handleClick(e)}>
                    <Header>
                    <Title>
                    <span>Idea</span><span class="lastName" style={{color:"white",fontWeight:"bold"}}>Lab</span> Community Guidelines
                    </Title>
                    </Header>
                    <Content>
                        <p>By outlining what we think a safe, welcoming, and productive community looks like at <span style={{fontWeight:"bold",fontColor:"#6667AB"}}>Idea Lab</span>,
                            we hope to help you understand how best to interact and collaborate on our platform in line with our Terms of Service and Acceptable Use Policies. We encourage our community members to communicate expectations clearly, moderate their projects where possible, and report any content that may violate our policies.</p>
                        <p>The primary purpose of the <span style={{fontWeight:"bold",fontColor:"#6667AB"}}>Idea Lab</span> community is to collaborate on software projects. We are committed to maintaining a community
                             where users are free to express themselves and challenge one another's ideas. we encourage our community members to look to these guidelines to inform how they interact on our platform. </p>
                        <Title style={{fontSize:"30px"}}>
                            What do our Community Guidelines cover?
                        </Title>
                        <ul>
                            <li>
                                <h3>Be Welcoming and Open-minded</h3>
                                <p>New users join our community each day. Some are well-established developers, while others are just beginning. Be open to other ideas and experience levels.
                                     Make room for opinions other than your own and be welcoming to new collaborators and those just getting started. </p>
                            </li>
                            <li>
                                <h3>Be Respectful</h3>
                                <p>Working in a collaborative environment means disagreements may happen. But remember to criticize ideas, not people. Share thoughtful, constructive criticism and be courteous to those you interact with.
                                     If you’re unable to engage respectfully, consider taking a step back or using some of our moderation tools to deescalate a tense situation. </p>
                            </li>
                            <li>
                                <h3>Connect with people you know</h3>
                                <p>Before accepting an invitation ,take a moment to make sure you recognize the owner.
                                     If anyone joins the class or group by mistake they can leave the class or group at anytime. </p>
                            </li>
                            <li>
                                <h3>Send useful and relevant information</h3>
                                <p>While every community is different each message you send should be valuable for your participants in your community. </p>
                            </li>
                            <li>
                                <h3>Uses outside the educational space</h3>
                                <p>communication should be used to support learning and features are intended for educational uses only.
                                     Accounts with inappropriate content may be deactivated, closed, or reported to the appropriate law enforcement agencies. </p>
                            </li>
                            <li>
                                <h3>Pretending to be someone else</h3>
                                <p>use real name and select appropriate role. Misinterpreting yourself or impersonating other people is not allowed. </p>
                            </li>
                            <li>
                                <h3>Adding or inviting people without permission</h3>
                                <p>It's important to get permission from participants before adding them to classes. If we find these type of accounts they are deleted. </p>
                            </li>
                            <li>
                                <h3>Harassment and bulling</h3>
                                <p>Information or messages meant to harass ,bully or speak maliciously about other people are unacceptable. Here these type of accounts are blocked and reported. </p>
                            </li>
                            <li>
                                <h3>
                                Spamming participants
                                </h3>
                                <p>Remind prohibits sending multiple messages a day without regard for your participants or messages with irrelevant content are detected to be spam and account is deleted.</p>
                            </li>
                        </ul>
                        <Close>
                        <button onClick={(e)=>handleClick(e)}>Close</button>
                    </Close>
                    </Content>
                    
                </Container>
                )
            }
        </>
        );
};
const Container = styled.div`
    font-family:-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    z-index: 9999;
    height:70%;
    background-color: white;
    animation: fadeIn 0.3s;
    width:70%;
    margin:0 auto;
    padding:20px;
    margin-top: 50px;
    overflow-x: scroll;
    margin-bottom: 50px;
`;
const Title = styled.h1`
    color: #1c1e21;
    background-color: rgba(0, 0, 0, 0);
    font-size: 52.152px;
    line-height: 63.15px;
    vertical-align: baseline;
    letter-spacing: normal;
    word-spacing: 0px;
    font-weight: 400;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    text-decoration: rgb(28, 30, 33);
    text-align: center;
    text-indent: 0px;
    margin:20px 0;
`;
const Header = styled.div`
    background-color: #6667AB;
    width:100%;
    padding:20px 0;
`;
const Content = styled.div`
    width: 100%;
    max-width:752px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
    padding:20px;
    font-size: 18px;
    line-height: 2;
    color: rgba(0,0,0,0.6);
    p{
        text-justify: inter-word;
    }
    `;
const Close = styled.div`
    width: 100%;
    max-width:752px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    margin: 0 auto;
    padding:20px;
    font-size: 18px;
    line-height: 2;
    color: rgba(0,0,0,0.6);
    button{
        width: 100%;
        background-color: #6667AB;
        color: white;
        padding: 10px;
        border-radius: 5px;
        border: none;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
    }
`;
    

export default CommunityGuidelines;