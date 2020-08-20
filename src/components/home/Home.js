import React from 'react';
import ButtonLink from "../common/ButtonLink";
import Box from "../common/Box";

class Home extends React.Component {
    render() {
        return (
            <section>
                <Box image={{url: "https://cdn.searchenginejournal.com/wp-content/uploads/2020/04/38a24f34-a84f-466c-8fbd-e56bda008889-5e9edefdb9b16-760x400.jpeg", alt: "People putting poll forms into virtual poll box inside a computer"}}>
                    <h1>Polls Are Fun!</h1>
                    <hr/>
                    <p>If you hate polls, you are clearly a <strong>psychopath!</strong> and shall be removed from society</p>
                    <p><strong>Why?</strong><br/>Got bored...</p>
                    <br/>
                    <ButtonLink to="create" name="Create Poll"/>
                </Box>
                <div className="box-grid">
                    <Box>
                        <h1>Based on Strawpoll?</h1>
                        <hr/>
                        <p>Yep. I wanted to have ago at react so I decided to create my own Poll application like StrawPoll. Its obviously not nearly as polished as theirs.</p>
                    </Box>
                    <Box>
                        <h1>Why Polls?</h1>
                        <hr/>
                        <p>Polls are fun, You can organise a lot based on their outcomes and they are a relatively easy first project for someone hwo is unfamiliar with React</p>
                    </Box>
                    <Box>
                        <h1>More of me</h1>
                        <hr/>
                        <p><a href="https://noahdhollowell.co.uk" className="link" rel="noreferrer noopener" target="_blank">My Site</a><br/>
                            <a href="https://github.com/NoahNok" className="link" rel="noreferrer noopener" target="_blank">GitHub</a><br/>
                            <a href="https://jukehost.co.uk" className="link" rel="noreferrer noopener" target="_blank">JukeHost</a></p>
                    </Box>

                </div>
            </section>
        );
    }
}

export default Home;